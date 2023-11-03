from django.db import models


class About(models.Model):
    photo = models.FileField(upload_to='about/')
    description = models.TextField()


class Interior(models.Model):
    description = models.TextField()


class InteriorImage(models.Model):
    interior = models.ForeignKey(Interior, default=None, on_delete=models.CASCADE)
    photo = models.FileField(upload_to='interior/')
    description = models.TextField()


class Menu(models.Model):
    photo = models.FileField()
    price = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    description = models.TextField()
    is_promo = models.BooleanField()


class Contact(models.Model):
    phone = models.CharField(max_length=255)
    address = models.TextField()
    work_time = models.CharField(max_length=255)


class WorkDay(models.Model):
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_vacation = models.BooleanField()


class WorkTime(models.Model):
    monday = models.OneToOneField(WorkDay, on_delete=models.CASCADE, related_name="monday")
    tuesday = models.OneToOneField(WorkDay, on_delete=models.CASCADE, related_name="tuesday")
    wednesday = models.OneToOneField(WorkDay, on_delete=models.CASCADE, related_name="wednesday")
    thursday = models.OneToOneField(WorkDay, on_delete=models.CASCADE, related_name="thursday")
    friday = models.OneToOneField(WorkDay, on_delete=models.CASCADE, related_name="friday")
    saturday = models.OneToOneField(WorkDay, on_delete=models.CASCADE, related_name="saturday")
    sunday = models.OneToOneField(WorkDay, on_delete=models.CASCADE, related_name="sunday")


class MonthReservation(models.Model):
    name = models.CharField(max_length=255)


class DayReservation(models.Model):
    month = models.ForeignKey(MonthReservation, on_delete=models.CASCADE)
    day_name = models.CharField(max_length=255)
    date = models.DateField()
    is_reserved = models.BooleanField()


class TimeGapReservation(models.Model):
    day = models.ForeignKey(DayReservation, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    is_reserved = models.BooleanField()
    people = models.IntegerField()
    phone_number = models.CharField(max_length=15)
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"Reservation for {self.day} at {self.start_time}"


class Tables(models.Model):
    pass


class Table(models.Model):
    tables = models.ForeignKey(Tables, default=None, on_delete=models.CASCADE)
    number = models.IntegerField()
    time_gap_reservation = models.ForeignKey(TimeGapReservation, on_delete=models.CASCADE)


class SendEmailSettings(models.Model):
    host = models.CharField(max_length=255)
    port = models.CharField(max_length=255)
    email_address_from = models.CharField(max_length=255)
    email_password = models.CharField(max_length=255)
    email_address_to = models.CharField(max_length=255)

    def __str__(self):
        name_object = 'Email settings'
        return name_object

    class Meta:
        verbose_name_plural = 'Email settings'


class EmailMessage(models.Model):
    message = models.TextField()
