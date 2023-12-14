from django.db import models


class About(models.Model):
    photo = models.FileField(upload_to='about/')
    description = models.TextField()

    def __str__(self):
        name_object = f'О нас'
        return name_object

    class Meta:
        verbose_name_plural = 'О нас'


class Interior(models.Model):
    description = models.TextField()

    def __str__(self):
        name_object = f'Интерьер'
        return name_object

    class Meta:
        verbose_name_plural = 'Интерьер'


class InteriorImage(models.Model):
    interior = models.ForeignKey(Interior, default=None, on_delete=models.CASCADE)
    photo = models.FileField(upload_to='interior/')
    description = models.TextField()


class CategorySection(models.Model):
    category = models.CharField(max_length=255)

    def __str__(self):
        name_object = self.category
        return name_object


class Menu(models.Model):
    photo = models.FileField()
    price = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    description = models.TextField()
    is_promo = models.BooleanField()
    category = models.ForeignKey(CategorySection, on_delete=models.CASCADE, null=True)

    def __str__(self):
        name_object = self.name
        return name_object

    class Meta:
        verbose_name_plural = 'Меню'


class Contact(models.Model):
    phone = models.CharField(max_length=255)
    address = models.TextField()
    work_time = models.CharField(max_length=255)

    def __str__(self):
        name_object = f'Контакты'
        return name_object

    class Meta:
        verbose_name_plural = 'Контакты'


class WorkDay(models.Model):
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_vacation = models.BooleanField()

    def __str__(self):
        name_object = f'{self.start_time} - {self.end_time}'
        return name_object


class WorkTime(models.Model):
    monday = models.OneToOneField(WorkDay, on_delete=models.CASCADE, related_name="monday")
    tuesday = models.OneToOneField(WorkDay, on_delete=models.CASCADE, related_name="tuesday")
    wednesday = models.OneToOneField(WorkDay, on_delete=models.CASCADE, related_name="wednesday")
    thursday = models.OneToOneField(WorkDay, on_delete=models.CASCADE, related_name="thursday")
    friday = models.OneToOneField(WorkDay, on_delete=models.CASCADE, related_name="friday")
    saturday = models.OneToOneField(WorkDay, on_delete=models.CASCADE, related_name="saturday")
    sunday = models.OneToOneField(WorkDay, on_delete=models.CASCADE, related_name="sunday")

    def __str__(self):
        name_object = f'Рабочие часы'
        return name_object

    class Meta:
        verbose_name_plural = 'Рабочие часы'


class Reservation(models.Model):
    MONTH_CHOICES = (
        ('January', 'Январь'),
        ('February', 'Февраль'),
        ('March', 'Март'),
        ('April', 'Апрель'),
        ('May', 'Май'),
        ('June', 'Июнь'),
        ('July', 'Июль'),
        ('August', 'Август'),
        ('September', 'Сентябрь'),
        ('October', 'Октябрь'),
        ('November', 'Ноябрь'),
        ('December', 'Декабрь'),
    )

    month = models.CharField(max_length=9, choices=MONTH_CHOICES, default='January')

    def __str__(self):
        name_object = self.month
        return name_object

    class Meta:
        verbose_name_plural = 'Бронирование'


class DayContent(models.Model):
    for hour in range(12, 24):
        for minute in range(0, 60, 30):
            time_str = f"{hour:02d}:{minute:02d}"
            locals()[time_str] = models.BooleanField()
            locals()[f'{time_str}_guests_quantity'] = models.IntegerField(blank=True, null=True)
            locals()[f'{time_str}_name'] = models.CharField(max_length=400, blank=True, null=True)
            locals()[f'{time_str}_phone_number'] = models.CharField(max_length=20, blank=True, null=True)


class Days(models.Model):
    month = models.ForeignKey(Reservation, default=None, on_delete=models.CASCADE)
    date = models.DateField(default=None)
    day_content = models.ForeignKey(DayContent, on_delete=models.CASCADE)


class SendEmailSettings(models.Model):
    host = models.CharField(max_length=255)
    port = models.CharField(max_length=255)
    email_address_from = models.CharField(max_length=255)
    email_password = models.CharField(max_length=255)
    email_address_to = models.CharField(max_length=255)

    def __str__(self):
        name_object = 'Настройки эл. почты'
        return name_object

    class Meta:
        verbose_name_plural = 'Настройки эл. почты'


class EmailMessage(models.Model):
    message = models.TextField()


class MenuPDF(models.Model):
    menu = models.FileField(upload_to='menu_pdf/')

    def __str__(self):
        name_object = 'Меню в pdf'
        return name_object

    class Meta:
        verbose_name_plural = 'Меню в pdf'
