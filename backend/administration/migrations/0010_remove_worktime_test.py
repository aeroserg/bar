# Generated by Django 4.2.6 on 2024-03-01 19:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('administration', '0009_worktime_test'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='worktime',
            name='test',
        ),
    ]
