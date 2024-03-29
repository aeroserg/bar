from django.urls import path
from . import views


urlpatterns = [
    path('main_page/', views.MainPageView.as_view()),
    path('why_us/', views.WhyUsView.as_view()),
    path('send_email/', views.EmailMessageView.as_view()),
    path('about/', views.GetAboutView.as_view()),
    path('interior/', views.GetInteriorView.as_view()),
    path('menu/', views.MenuView.as_view()),
    path('download_menu/', views.GetMenuPDFView.as_view()),
    path('contacts/', views.ContactView.as_view()),
    path('working_hours/', views.WorkingHoursView.as_view()),
    path('get_reservation/', views.GetReservationView.as_view()),
    path('add_reservation/', views.AddReservationView.as_view()),
    path('init_reservation/', views.GenInitReservationView.as_view()),
    path('add_new_month/', views.AddNewMonth.as_view())
]
