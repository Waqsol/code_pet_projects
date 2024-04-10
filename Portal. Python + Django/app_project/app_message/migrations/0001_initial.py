# Generated by Django 4.2.5 on 2024-02-14 08:37

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Dialogs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'verbose_name': 'Диалог',
                'verbose_name_plural': 'Диалоги',
            },
        ),
        migrations.CreateModel(
            name='Message_dialog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
            ],
            options={
                'verbose_name': 'Сообщение',
                'verbose_name_plural': 'Сообщения',
            },
        ),
        migrations.CreateModel(
            name='Message_ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Tickets',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('theme', models.CharField(choices=[('Дедлайн', 'Дедлайн'), ('Простой вопрос', 'Простой вопрос'), ('Конкретный вопрос', 'Конкретный вопрос')], max_length=50)),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('status', models.CharField(choices=[('Создан', 'Создан'), ('В работе', 'В работе'), ('Закрыт', 'Закрыт')], default='created', max_length=20)),
            ],
            options={
                'verbose_name': 'Тикет',
                'verbose_name_plural': 'Тикеты',
            },
        ),
    ]