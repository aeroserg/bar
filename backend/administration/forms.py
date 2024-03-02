from django import forms
from django.contrib.admin.widgets import RelatedFieldWidgetWrapper
from django.contrib.admin import site as admin_site

from .models import WorkTime, WorkDay


class WorkTimeForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(WorkTimeForm, self).__init__(*args, **kwargs)
        self.add_related_field_wrapper(self, 'monday')
        self.add_related_field_wrapper(self, 'tuesday')
        self.add_related_field_wrapper(self, 'wednesday')
        self.add_related_field_wrapper(self, 'thursday')
        self.add_related_field_wrapper(self, 'friday')
        self.add_related_field_wrapper(self, 'saturday')
        self.add_related_field_wrapper(self, 'sunday')

    monday = forms.ModelChoiceField(queryset=WorkDay.objects.all(), widget=forms.Select(attrs={'class': 'custom-select'}))
    tuesday = forms.ModelChoiceField(queryset=WorkDay.objects.all(), widget=forms.Select(attrs={'class': 'custom-select'}))
    wednesday = forms.ModelChoiceField(queryset=WorkDay.objects.all(), widget=forms.Select(attrs={'class': 'custom-select'}))
    thursday = forms.ModelChoiceField(queryset=WorkDay.objects.all(), widget=forms.Select(attrs={'class': 'custom-select'}))
    friday = forms.ModelChoiceField(queryset=WorkDay.objects.all(), widget=forms.Select(attrs={'class': 'custom-select'}))
    saturday = forms.ModelChoiceField(queryset=WorkDay.objects.all(), widget=forms.Select(attrs={'class': 'custom-select'}))
    sunday = forms.ModelChoiceField(queryset=WorkDay.objects.all(), widget=forms.Select(attrs={'class': 'custom-select'}))

    def add_related_field_wrapper(self, form, col_name):
        rel_model = form.Meta.model
        rel = rel_model._meta.get_field(col_name).remote_field
        form.fields[col_name].widget = RelatedFieldWidgetWrapper(
            form.fields[col_name].widget,
            rel,
            admin_site,
            can_change_related=True,
            can_add_related=True
        )

    class Meta:
        model = WorkTime
        fields = '__all__'
