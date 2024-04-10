from django.db import models
from django.utils import timezone
from app_users.models import Users

########################
########################
########################
##### Работа с тикетами
########################
########################
########################
class Tickets(models.Model):
    SENDER_CHOICES = (
        ('Создан', 'Создан'),
        ('В работе', 'В работе'),
        ('Закрыт', 'Закрыт'),
    )

    THEME_CHOICES = (
        ('Дедлайн', 'Дедлайн'),
        ('Простой вопрос', 'Простой вопрос'),
        ('Конкретный вопрос', 'Конкретный вопрос'),
    )

    sender = models.ForeignKey(Users, related_name='sent_tickets', on_delete=models.CASCADE)
    receiver = models.ForeignKey(Users, related_name='received_tickets', on_delete=models.CASCADE)
    theme = models.CharField(max_length=50, choices=THEME_CHOICES)
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=SENDER_CHOICES, default='создан')
    dedline_date = models.DateField(blank=True, null=True)
    def __str__(self):
        return f'Ticket #{self.id} - Theme: {self.theme}, Sender: {self.sender.first_name} {self.sender.last_name}, Receiver: {self.receiver.first_name} {self.receiver.last_name}, Status: {self.get_status_display()}'

    def update_status(self):
        if self.messages.exists():
            self.status = 'В работе'
            self.save()

    def close_ticket(self):
        self.status = 'Закрыт'
        self.save()

    class Meta:
        verbose_name = 'Тикет'
        verbose_name_plural = 'Тикеты'

class Message_ticket(models.Model):
    ticket = models.ForeignKey(Tickets, related_name='messages', on_delete=models.CASCADE)
    sender = models.ForeignKey(Users, related_name='sent_messages', on_delete=models.CASCADE)
    content = models.TextField()
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'Message #{self.id} - Ticket: {self.ticket.id}, Sender: {self.sender.first_name} {self.sender.last_name}, Content: {self.content}'

########################
########################
########################
##### Работа с диалогами
########################
########################
########################

class Dialogs(models.Model):
    first_owner=models.ForeignKey(Users, related_name='first_owner', on_delete=models.CASCADE)
    second_owner=models.ForeignKey(Users, related_name='second_owner', on_delete=models.CASCADE)

    def __str__(self):
        return f'Dialog #{self.id}, first_owner: {self.first_owner.first_name} {self.first_owner.last_name},' \
               f' second_owner: {self.second_owner.first_name} {self.second_owner.last_name}'


    class Meta:
        verbose_name = 'Диалог'
        verbose_name_plural = 'Диалоги'

class Message_dialog(models.Model):
    dialog = models.ForeignKey(Dialogs, related_name='dialog', on_delete=models.CASCADE)
    sender = models.ForeignKey(Users, related_name='sender', on_delete=models.CASCADE)
    content = models.TextField()
    image = models.ImageField(upload_to='img/',default=None, blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Dialog #{self.id}, ' \
               f'Sender: {self.sender.first_name} {self.sender.last_name}, ' \
               f'Content: {self.content}'

    class Meta:
        verbose_name = 'Сообщение'
        verbose_name_plural = 'Сообщения'


########################
########################
########################
##### Работа с беседами
########################
########################
########################
class Chat(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Беседа'
        verbose_name_plural = 'Беседы'
class ChatUser(models.Model):
    user = models.ForeignKey(Users, related_name='chats', on_delete=models.CASCADE)
    chat = models.ForeignKey(Chat, related_name='users', on_delete=models.CASCADE)

    def __str__(self):
        return f'chat: {self.chat}, user: {self.user}'
    class Meta:
        unique_together = ['user', 'chat']

class ChatMessage(models.Model):
    chat = models.ForeignKey(Chat, related_name='messages', on_delete=models.CASCADE)
    sender = models.ForeignKey(Users, related_name='chat_messages', on_delete=models.CASCADE)
    content = models.TextField()
    image = models.ImageField(upload_to='img/', null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Message #{self.id} - Chat: {self.chat.title}, Sender: {self.sender.first_name} {self.sender.last_name}, Content: {self.content}'

    class Meta:
        verbose_name = 'Сообщение из беседы'
        verbose_name_plural = 'Сообщения из бесед'