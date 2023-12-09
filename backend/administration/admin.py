from django.contrib import admin

from .models import *


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    def has_add_permission(self, *args, **kwargs):
        return not About.objects.exists()


class InteriorImageAdmin(admin.StackedInline):
    model = InteriorImage


@admin.register(Interior)
class InteriorAdmin(admin.ModelAdmin):
    inlines = [InteriorImageAdmin]

    class Meta:
        model = Interior

    def has_add_permission(self, *args, **kwargs):
        return not Interior.objects.exists()


@admin.register(InteriorImage)
class InteriorImage(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    pass


@admin.register(MenuPDF)
class MenuPDFAdmin(admin.ModelAdmin):
    def has_add_permission(self, *args, **kwargs):
        return not MenuPDF.objects.exists()


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    def has_add_permission(self, *args, **kwargs):
        return not Contact.objects.exists()


@admin.register(WorkDay)
class WorkDayAdmin(admin.ModelAdmin):
    pass


@admin.register(WorkTime)
class WorkTimeAdmin(admin.ModelAdmin):
    def has_add_permission(self, *args, **kwargs):
        return not WorkTime.objects.exists()


class DaysAdmin(admin.StackedInline):
    model = Days


@admin.register(Days)
class Days(admin.ModelAdmin):
    extra = 1  # Количество пустых форм для Days в админке

    class Meta:
        model = Days

    def get_model_perms(self, request):
        return {}


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    inlines = [DaysAdmin]

    class Meta:
        model = Reservation


@admin.register(SendEmailSettings)
class SendEmailSettingsAdmin(admin.ModelAdmin):
    def has_add_permission(self, *args, **kwargs):
        return not SendEmailSettings.objects.exists()


@admin.register(EmailMessage)
class EmailMessageAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}
