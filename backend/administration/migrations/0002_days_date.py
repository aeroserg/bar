# Generated by Django 4.2.6 on 2023-11-19 13:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administration', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='days',
            name='date',
            field=models.DateField(default=None),
        ),
    ]