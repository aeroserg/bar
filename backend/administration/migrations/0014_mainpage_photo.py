# Generated by Django 4.2.6 on 2024-03-12 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administration', '0013_privacypolicy'),
    ]

    operations = [
        migrations.AddField(
            model_name='mainpage',
            name='photo',
            field=models.FileField(default=None, null=True, upload_to='main_page/', verbose_name='Фото'),
        ),
    ]
