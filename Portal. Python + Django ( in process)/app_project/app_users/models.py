from django.contrib.auth.models import AbstractUser
from django.db import models


class Users(AbstractUser):
    role = models.CharField(max_length=30)
    number = models.CharField(max_length=15, blank=True, null=True,verbose_name='Номер телефона')
    birth_date = models.CharField(max_length=20, blank=True, null=True,verbose_name='Дата рождения')
    group = models.ForeignKey('group.Group', on_delete=models.SET_NULL, null=True, blank=True)



    def __str__(self):
        return f'Ваши инициалы : {self.first_name} {self.last_name}'

    class Meta:
        verbose_name = 'Пользователя'
        verbose_name_plural = 'Пользователи'
        db_table = 'Users'

    def get_absolute_url(self):
        return f'/users/{self.id}'

    def save(self, *args, **kwargs):
        if self.role == "Преподаватель":
            self.group = None
        super().save(*args, **kwargs)
