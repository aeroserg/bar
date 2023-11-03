# Generated by Django 4.2.6 on 2023-11-03 18:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='About',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.FileField(upload_to='about/')),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone', models.CharField(max_length=255)),
                ('address', models.TextField()),
                ('work_time', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='DayReservation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day_name', models.CharField(max_length=255)),
                ('date', models.DateField()),
                ('is_reserved', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='EmailMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Interior',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.FileField(upload_to='')),
                ('price', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('is_promo', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='MonthReservation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='SendEmailSettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('host', models.CharField(max_length=255)),
                ('port', models.CharField(max_length=255)),
                ('email_address_from', models.CharField(max_length=255)),
                ('email_password', models.CharField(max_length=255)),
                ('email_address_to', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name_plural': 'Email settings',
            },
        ),
        migrations.CreateModel(
            name='Tables',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='WorkDay',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('is_vacation', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='WorkTime',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('friday', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='friday', to='administration.workday')),
                ('monday', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='monday', to='administration.workday')),
                ('saturday', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='saturday', to='administration.workday')),
                ('sunday', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='sunday', to='administration.workday')),
                ('thursday', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='thursday', to='administration.workday')),
                ('tuesday', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='tuesday', to='administration.workday')),
                ('wednesday', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='wednesday', to='administration.workday')),
            ],
        ),
        migrations.CreateModel(
            name='TimeGapReservation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('is_reserved', models.BooleanField()),
                ('people', models.IntegerField()),
                ('phone_number', models.CharField(max_length=15)),
                ('name', models.CharField(max_length=255)),
                ('day', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='administration.dayreservation')),
            ],
        ),
        migrations.CreateModel(
            name='Table',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField()),
                ('tables', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='administration.tables')),
                ('time_gap_reservation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='administration.timegapreservation')),
            ],
        ),
        migrations.CreateModel(
            name='InteriorImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.FileField(upload_to='interior/')),
                ('description', models.TextField()),
                ('interior', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='administration.interior')),
            ],
        ),
        migrations.AddField(
            model_name='dayreservation',
            name='month',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='administration.monthreservation'),
        ),
    ]
