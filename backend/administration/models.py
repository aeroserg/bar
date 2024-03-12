from django.db import models


class MainPage(models.Model):
    title = models.TextField(verbose_name='Заголовок')
    description = models.TextField(verbose_name='Описание')
    photo = models.FileField(upload_to='main_page/', verbose_name='Фото', default=None, null=True)

    def __str__(self):
        name_object = 'Главная страница'
        return name_object

    class Meta:
        verbose_name_plural = 'Главная страница'


class About(models.Model):
    photo = models.FileField(upload_to='about/', verbose_name='Фото')
    description = models.TextField(verbose_name='Описание')
    inscription = models.TextField(default=None, verbose_name='Подпись', null=True)

    def __str__(self):
        name_object = f'О нас'
        return name_object

    class Meta:
        verbose_name_plural = 'О нас'


class WhyUs(models.Model):
    description1 = models.TextField(verbose_name='Описание 1')
    description2 = models.TextField(verbose_name='Описание 2')
    description3 = models.TextField(verbose_name='Описание 3')
    description4 = models.TextField(verbose_name='Описание 4')

    def __str__(self):
        name_object = f'Почему мы'
        return name_object

    class Meta:
        verbose_name_plural = 'Почему мы'


class Interior(models.Model):
    title = models.TextField(default=None, verbose_name='Заголовок')
    description = models.TextField(verbose_name='Описание')

    def __str__(self):
        name_object = f'Интерьер'
        return name_object

    class Meta:
        verbose_name_plural = 'Интерьер'


class InteriorImage(models.Model):
    interior = models.ForeignKey(Interior, default=None, on_delete=models.CASCADE)
    photo = models.FileField(upload_to='interior/', verbose_name='Фото')
    description = models.TextField(verbose_name='Описание')


class CategorySection(models.Model):
    category = models.CharField(max_length=255, verbose_name='Название')

    def __str__(self):
        name_object = self.category
        return name_object


class Menu(models.Model):
    photo = models.FileField(verbose_name='Фото')
    price = models.CharField(max_length=255, verbose_name='Цена')
    name = models.CharField(max_length=255, verbose_name='Название')
    description = models.TextField(verbose_name='Описание')
    is_promo = models.BooleanField()
    category = models.ForeignKey(CategorySection, on_delete=models.CASCADE, null=True, verbose_name='Категория')

    def __str__(self):
        name_object = self.name
        return name_object

    class Meta:
        verbose_name_plural = 'Меню'


class Contact(models.Model):
    phone = models.CharField(max_length=255, verbose_name='Телефон')
    address = models.TextField(verbose_name='Адрес')
    work_time = models.CharField(max_length=255, verbose_name='Рабочие часы')

    def __str__(self):
        name_object = f'Контакты'
        return name_object

    class Meta:
        verbose_name_plural = 'Контакты'


class WorkDay(models.Model):
    start_time = models.TimeField(default=None, verbose_name='Начало рабочего дня')
    end_time = models.TimeField(default=None, verbose_name='Конец рабочего дня')
    is_vacation = models.BooleanField(verbose_name='Выходной')

    def __str__(self):
        name_object = f'{self.start_time} - {self.end_time}'
        return name_object


class WorkTime(models.Model):
    monday = models.OneToOneField(WorkDay, on_delete=models.CASCADE, related_name="monday", verbose_name='Понедельник')
    tuesday = models.OneToOneField(WorkDay, on_delete=models.CASCADE, related_name="tuesday", verbose_name='Вторник')
    wednesday = models.OneToOneField(WorkDay, on_delete=models.CASCADE, related_name="wednesday", verbose_name='Среда')
    thursday = models.OneToOneField(WorkDay, on_delete=models.CASCADE, related_name="thursday", verbose_name='Четверг')
    friday = models.OneToOneField(WorkDay, on_delete=models.CASCADE, related_name="friday", verbose_name='Пятница')
    saturday = models.OneToOneField(WorkDay, on_delete=models.CASCADE, related_name="saturday", verbose_name='Суббота')
    sunday = models.OneToOneField(WorkDay, on_delete=models.CASCADE, related_name="sunday", verbose_name='Воскресенье')
    photo = models.FileField(upload_to='work_time/', default=None, verbose_name='Фото')

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


class Order(models.Model):
    date = models.DateField(verbose_name="Дата")
    time = models.CharField(max_length=15, verbose_name="Время")
    guests_quantity = models.IntegerField(blank=True, null=True, verbose_name="Количество гостей")
    name = models.CharField(max_length=400, blank=True, null=True, verbose_name="Имя")
    phone_number = models.CharField(max_length=20, blank=True, null=True, verbose_name="Номер телефона")

    def __str__(self):
        name_object = f"Дата: {self.date}, Время: {self.time}, Имя: {self.name}"
        return name_object

    class Meta:
        verbose_name_plural = 'Заявки на бронирование'


class DayContent(models.Model):
    for hour in range(12, 24):
        for minute in range(0, 60, 30):
            time_str = f"{hour:02d}:{minute:02d}"
            locals()[time_str] = models.BooleanField(verbose_name="Все места заняты")
            locals()[f'{time_str}_available_seats'] = models.IntegerField(default=25, verbose_name="Свободные места")


class Days(models.Model):
    month = models.ForeignKey(Reservation, default=None, on_delete=models.CASCADE, verbose_name="Месяц")
    date = models.DateField(default=None, verbose_name="Дата")
    day_content = models.ForeignKey(DayContent, on_delete=models.CASCADE, verbose_name="Время")
    all_day_is_reserved = models.BooleanField(default=False, verbose_name="Весь день Забронирован")


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


class ReservationTexts(models.Model):
    title = models.TextField(default=None, verbose_name='Заголовок')
    description = models.TextField(verbose_name='Описание')
    inscription = models.TextField(default=None, verbose_name='Подпись')

    def __str__(self):
        name_object = 'Текст на странице бронирования'
        return name_object

    class Meta:
        verbose_name_plural = 'Текст на странице бронирования'


class PrivacyPolicy(models.Model):
    privacy_policy = models.FileField(upload_to='privacy_policy/')

    def __str__(self):
        name_object = 'Политика конфиденциальности'
        return name_object

    class Meta:
        verbose_name_plural = 'Политика конфиденциальности'
