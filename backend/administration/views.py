from django.forms import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (SendEmailSettings, About, Interior, InteriorImage, Menu, Contact,
                     WorkTime, Reservation, Days)
from .send_mail import SendMail


class GetAboutView(APIView):
    def get(self, request):
        about_content = About.objects.all()[0]
        return Response(
            {"about":
                {
                    "description": about_content.description,
                    "photo": about_content.photo.file.name.replace('/app', '')
                }
        }
        )


class GetInteriorView(APIView):
    def get(self, request):
        interior_imgs = []
        interior_content = Interior.objects.all()[0]

        interior_imgs_content = InteriorImage.objects.all()

        for interior_img_content in interior_imgs_content:
            interior_imgs.append(
                {
                    "photo": interior_img_content.photo.path.replace('/app', ''),
                    "photo_description": interior_img_content.description
                }
            )

        return Response(
            {
                "interior":
                {

                    "description": interior_content.description,
                    "interior_imgs": interior_imgs
                }
            }
        )


class MenuView(APIView):
    def get(self, request):
        menu_content = Menu.objects.all()

        menu = []

        for content in menu_content:
            menu.append(
                {
                    "photo": content.photo.file.name.replace('/app', ''),
                    "price": content.price,
                    "name": content.name,
                    "description": content.description,
                    "is_promo": content.is_promo
                }
            )

        return Response({"menu": menu})


class ContactView(APIView):
    def get(self, request):
        contact_content = Contact.objects.all()[0]

        return Response(
            {
                "contacts":
                    {
                        "phone": contact_content.phone,
                        "address": contact_content.address,
                        "work_time": contact_content.work_time
                    }
            }
        )


class WorkingHoursView(APIView):
    def get(self, request):
        working_hours = WorkTime.objects.all()[0]

        return Response(
            {
                "working_hours":
                    {
                        "monday":
                             {
                                 "start": working_hours.monday.start_time,
                                 "end": working_hours.monday.end_time,
                                 "is_vacation": working_hours.monday.is_vacation
                             },
                        "tuesday":
                            {
                                "start": working_hours.tuesday.start_time,
                                "end": working_hours.tuesday.end_time,
                                "is_vacation": working_hours.tuesday.is_vacation
                            },
                        "wednesday":
                            {
                                "start": working_hours.wednesday.start_time,
                                "end": working_hours.wednesday.end_time,
                                "is_vacation": working_hours.wednesday.is_vacation
                            },
                        "thursday":
                            {
                                "start": working_hours.thursday.start_time,
                                "end": working_hours.thursday.end_time,
                                "is_vacation": working_hours.thursday.is_vacation
                            },
                        "friday":
                            {
                                "start": working_hours.friday.start_time,
                                "end": working_hours.friday.end_time,
                                "is_vacation": working_hours.friday.is_vacation
                            },
                        "saturday":
                            {
                                "start": working_hours.saturday.start_time,
                                "end": working_hours.saturday.end_time,
                                "is_vacation": working_hours.saturday.is_vacation
                            },
                        "sunday":
                            {
                                "start": working_hours.sunday.start_time,
                                "end": working_hours.sunday.end_time,
                                "is_vacation": working_hours.sunday.is_vacation
                            }
                        }
                    }
                )


class GetReservationView(APIView):
    def get(self, request):

        response = {'dates': []}
        reservation = Reservation.objects.all()

        i = 0
        for reserv in reservation:
            days = Days.objects.filter(month=reserv.id)
            for day in days:
                response['dates'].append({'date': day.date, 'time_ranges': []})
                for hour in range(12, 24):
                    for minute in range(0, 60, 30):
                        time_str = f"{hour:02d}:{minute:02d}"
                        response['dates'][i]['time_ranges'].append({time_str: getattr(day, time_str)})
                i += 1
        return Response(response)


class AddReservationView(APIView):
    def post(self, request):
        date = request.data['date']
        time = request.data['time']

        date_reservation = Days.objects.filter(date=date)
        setattr(date_reservation, time, True)

        return Response({'d': 'd'})


class EmailMessageView(APIView):
    @csrf_exempt
    def post(self, request):
        queryset_email_cred = SendEmailSettings.objects.all()
        email_creds = model_to_dict(queryset_email_cred[0])

        message = request.data['message']
        subject = request.data['subject']

        send_mail = SendMail(host=email_creds['host'],
                             port=email_creds['port'],
                             email_address_from=email_creds['email_address_from'],
                             email_password=email_creds['email_password'],
                             email_address_to=email_creds['email_address_to'],
                             message=message,
                             subject=subject)

        return Response({"Send email success": send_mail.send_email()})
