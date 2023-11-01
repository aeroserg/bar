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


@admin.register(MonthReservation)
class MonthReservationAdmin(admin.ModelAdmin):
    pass


@admin.register(DayReservation)
class DayReservationAdmin(admin.ModelAdmin):
    pass


@admin.register(TimeGapReservation)
class TimeGapReservationAdmin(admin.ModelAdmin):
    pass


class TableAdmin(admin.StackedInline):
    model = Table


@admin.register(Tables)
class TablesAdmin(admin.ModelAdmin):
    inlines = [TableAdmin]

    class Meta:
        model = Tables

    def has_add_permission(self, *args, **kwargs):
        return not Tables.objects.exists()


@admin.register(Table)
class Table(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


@admin.register(SendEmailSettings)
class SendEmailSettingsAdmin(admin.ModelAdmin):
    pass


@admin.register(EmailMessage)
class EmailMessageAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}