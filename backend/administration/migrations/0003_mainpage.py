# Generated by Django 4.2.6 on 2024-02-28 20:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administration', '0002_categorysection_alter_about_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='MainPage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
                ('description', models.TextField()),
            ],
            options={
                'verbose_name_plural': 'Информация на главной странице',
            },
        ),
    ]