# Generated by Django 4.2.5 on 2024-02-19 06:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_message', '0007_alter_message_dialog_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message_dialog',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='app_message/static/app_message/img'),
        ),
    ]