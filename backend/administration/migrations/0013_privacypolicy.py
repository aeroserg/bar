# Generated by Django 4.2.6 on 2024-03-03 14:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administration', '0012_alter_order_options_alter_about_inscription'),
    ]

    operations = [
        migrations.CreateModel(
            name='PrivacyPolicy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('privacy_policy', models.FileField(upload_to='privacy_policy/')),
            ],
            options={
                'verbose_name_plural': 'Политика конфиденциальности',
            },
        ),
    ]
