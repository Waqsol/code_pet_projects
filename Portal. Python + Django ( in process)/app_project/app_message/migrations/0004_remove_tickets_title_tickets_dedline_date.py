# Generated by Django 4.2.5 on 2024-02-16 01:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_message', '0003_tickets_title_alter_tickets_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tickets',
            name='title',
        ),
        migrations.AddField(
            model_name='tickets',
            name='dedline_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
