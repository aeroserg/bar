from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import *
from .forms import WorkTimeForm


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    pass


@admin.register(MainPage)
class MainPageAdmin(admin.ModelAdmin):
    def has_add_permission(self, *args, **kwargs):
        return not MainPage.objects.exists()


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    def has_add_permission(self, *args, **kwargs):
        return not About.objects.exists()


@admin.register(WhyUs)
class WhyUsAdmin(admin.ModelAdmin):
    def has_add_permission(self, *args, **kwargs):
        return not WhyUs.objects.exists()


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


@admin.register(CategorySection)
class CategorySection(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    readonly_fields = ["preview"]

    def preview(self, obj):
        try:
            return mark_safe(f'<img src="http://barmayak.ru/{obj.photo.path.replace("/app", "")}">')
        except:
            return "Preview!"


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
    def get_model_perms(self, request):
        return {}


@admin.register(WorkTime)
class WorkTimeAdmin(admin.ModelAdmin):
    form = WorkTimeForm
    readonly_fields = ["preview"]

    def has_add_permission(self, *args, **kwargs):
        return not WorkTime.objects.exists()

    def preview(self, obj):
        try:
            return mark_safe(f'<img src="http://barmayak.ru/{obj.photo.path.replace("/app", "")}">')
        except:
            return "Preview!"


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


@admin.register(DayContent)
class DayContentAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


@admin.register(SendEmailSettings)
class SendEmailSettingsAdmin(admin.ModelAdmin):
    def has_add_permission(self, *args, **kwargs):
        return not SendEmailSettings.objects.exists()


@admin.register(EmailMessage)
class EmailMessageAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


@admin.register(ReservationTexts)
class ReservationTextsAdmin(admin.ModelAdmin):
    def has_add_permission(self, *args, **kwargs):
        return not ReservationTexts.objects.exists()


@admin.register(PrivacyPolicy)
class PrivacyPolicyAdmin(admin.ModelAdmin):
    def has_add_permission(self, *args, **kwargs):
        return not PrivacyPolicy.objects.exists()
