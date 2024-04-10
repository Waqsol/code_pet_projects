# Generated by Django 4.2.5 on 2024-02-15 04:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_message', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tickets',
            name='title',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='tickets',
            name='status',
            field=models.CharField(choices=[('Создан', 'Создан'), ('В работе', 'В работе'), ('Закрыт', 'Закрыт')], default='создан', max_length=20),
        ),
    ]