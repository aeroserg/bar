from django.urls import include, path
from . import views


urlpatterns = [
    path('send_email/', views.EmailMessageView.as_view()),
    path('about/', views.GetAboutView.as_view()),
    path('interior/', views.GetInteriorView.as_view()),
    path('menu/', views.MenuView.as_view()),
    path('contacts/', views.ContactView.as_view()),
    path('working_hours/', views.WorkingHoursView.as_view()),
    path('get_reservation/', views.ReservationView.as_view())
]
