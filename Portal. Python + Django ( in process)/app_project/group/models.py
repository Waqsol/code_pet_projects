from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from app_users.models import Users


class Group(models.Model):
    name = models.CharField(max_length=75)
    captain = models.OneToOneField(Users, on_delete=models.SET_NULL, null=True,blank=True,
                                   related_name='group_captain', limit_choices_to={'role': 'Студент'})

    def __str__(self):
        return f'Группа: {self.name}'

    class Meta:
        verbose_name = 'Группа'
        verbose_name_plural = 'Группы'
    def get_absolute_url(self):
        return f'/group/{self.id}'

@receiver(post_save, sender=Group)
def add_captain_to_group(sender, instance, created, **kwargs):
    if created and instance.captain:
        other_group_with_captain = Group.objects.exclude(pk=instance.pk).filter(captain=instance.captain).first()
        other_group_with_members = Users.objects.filter(group=instance).exclude(pk=instance.captain.pk).exists()
        instance.captain.group = instance

        if other_group_with_captain or other_group_with_members:
            instance.captain = None
        instance.save()
