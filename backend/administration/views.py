from django.forms import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.views import APIView
import datetime
from calendar import monthrange

from .models import (SendEmailSettings, About, Interior, InteriorImage, Menu, Contact,
                     WorkTime, Reservation, Days, MenuPDF, DayContent, MainPage, WhyUs, ReservationTexts, Order,
                     PrivacyPolicy)
from .send_mail import SendMail


class MainPageView(APIView):
    def get(self, request):
        main_page_content = MainPage.objects.all()[0]
        return Response(
            {"main_page":
                 {
                     "title": main_page_content.title,
                     "description": main_page_content.description,
                     "photo": main_page_content.photo.file.name.replace('/app', '')
                 }
            }
        )


class GetAboutView(APIView):
    def get(self, request):
        about_content = About.objects.all()[0]
        return Response(
            {"about":
                {
                    "inscription": about_content.inscription,
                    "description": about_content.description,
                    "photo": about_content.photo.file.name.replace('/app', '')
                }
            }
        )


class WhyUsView(APIView):
    def get(self, request):
        why_us_content = WhyUs.objects.all()[0]
        return Response(
            {"why_us":
                 {
                     "description1": why_us_content.description1,
                     "description2": why_us_content.description2,
                     "description3": why_us_content.description3,
                     "description4": why_us_content.description4
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
                    "title": interior_content.title,
                    "description": interior_content.description,
                    "interior_imgs": interior_imgs
                }
            }
        )


class MenuView(APIView):
    def get(self, request):
        menu_content = Menu.objects.all().order_by('category')
        init_category = menu_content[0].category.category

        response = {"menu": [
            {
                'category_name': 'first',
                'dishes': [
                    {
                        "photo": menu_content[i].photo.file.name.replace('/app', ''),
                        "price": menu_content[i].price,
                        "name": menu_content[i].name,
                        "description": menu_content[i].description,
                        "is_promo": menu_content[i].is_promo
                    }
                    for i in range(4) if i < len(menu_content)
                ]
            }
        ]}

        c = {'category_name': init_category, 'dishes': []}

        for content in menu_content:
            if content.category.category != init_category:
                response['menu'].append(c.copy())
                init_category = content.category.category
                c['category_name'] = init_category
                c['dishes'] = []

            c['dishes'].append(
                {
                    "photo": content.photo.file.name.replace('/app', ''),
                    "price": content.price,
                    "name": content.name,
                    "description": content.description,
                    "is_promo": content.is_promo
                }
            )
        response['menu'].append(c.copy())

        return Response(response)


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
                "photo": working_hours.photo.file.name.replace('/app', ''),
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

        reservation = Reservation.objects.all().order_by('id')
        reservation_text = ReservationTexts.objects.all()[0]
        privacy_policy = PrivacyPolicy.objects.all()[0]

        response = {
            "title": reservation_text.title,
            "description": reservation_text.description,
            "inscription": reservation_text.inscription,
            "policy_link": privacy_policy.privacy_policy.path.replace('/app', ''),
            'dates': []
        }

        j = 0
        for reserv in reservation:
            is_vacant = False
            i = 0
            days = Days.objects.filter(month=reserv.id).order_by('id')
            response['dates'].append({'month': days[0].date.month, "days": []})
            for day in days:
                time_reservation = DayContent.objects.get(id=day.day_content.id)
                response['dates'][j]['days'].append({'is_vacant': is_vacant, 'date': day.date, 'time_ranges': []})
                for hour in range(12, 24):
                    for minute in range(0, 60, 30):
                        time_str = f"{hour:02d}:{minute:02d}"
                        response['dates'][j]['days'][i]['time_ranges'].append(
                            {
                                "time": time_str,
                                "is_available": getattr(time_reservation, time_str)
                            }
                        )
                        if not getattr(time_reservation, time_str):
                            is_vacant = True

                response['dates'][j]['days'][i]['is_vacant'] = is_vacant
                i += 1
            j += 1
        return Response(response)


class AddReservationView(APIView):
    def post(self, request):
        date = request.data['date']
        time = request.data['time']
        name = request.data['name']
        phone = request.data['phone']
        guest_quantity = int(request.data['guest_quantity'])

        day_reservation = Days.objects.get(date=date)
        time_reservation = DayContent.objects.get(id=day_reservation.day_content.id)

        if day_reservation.all_day_is_reserved:
            return Response({'success': False})

        if getattr(time_reservation, time):
            return Response({'success': False})

        available_seats = getattr(time_reservation, f'{time}_available_seats')

        if guest_quantity > available_seats:
            return Response(
                {
                    'success': False,
                    'available_seats': getattr(time_reservation, f'{time}_available_seats')
                }
            )

        new_order = Order(date=date, time=time, name=name, phone_number=phone, guests_quantity=guest_quantity)
        new_order.save()

        setattr(time_reservation, f'{time}_available_seats', available_seats - guest_quantity)

        if available_seats - guest_quantity == 0:
            setattr(time_reservation, time, True)

        time_reservation.save()

        queryset_email_cred = SendEmailSettings.objects.all()
        email_creds = model_to_dict(queryset_email_cred[0])

        send_mail = SendMail(host=email_creds['host'],
                 port=email_creds['port'],
                 email_address_from=email_creds['email_address_from'],
                 email_password=email_creds['email_password'],
                 email_address_to=email_creds['email_address_to'],
                 message=f"""
                 Имя: {name}
                 Количество гостей: {guest_quantity}
                 Номер телефона: {phone}
                 Дата: {date}
                 Время: {time}
                 """,
                 subject=f'Новое бронирование {date} {time}')
        send_mail.send_email()

        return Response({'success': True})


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
        print(send_mail)

        return Response({"Send email success": send_mail.send_email()})


class GenInitReservationView(APIView):
    def get(self, request):
        month_names = {}
        current_date = datetime.datetime.today()
        first_month_name = current_date.strftime('%B')
        month_names[first_month_name] = current_date

        second_month_date = current_date.month % 12 + 1
        second_year_date = current_date.year
        if second_month_date < current_date.month:
            second_year_date += 1
        second_month = datetime.date(second_year_date, second_month_date, 1)
        second_month_name = second_month.strftime('%B')
        month_names[second_month_name] = second_month

        third_month_date = second_month.month % 12 + 1
        third_year_date = second_month.year
        if third_month_date < second_month.month:
            third_year_date += 1
        third_month = datetime.date(third_year_date, third_month_date, 1)
        third_month_name = third_month.strftime('%B')
        month_names[third_month_name] = third_month
        for key, value in month_names.items():
            r = Reservation(month=key)
            r.save()
            days_in_month = monthrange(value.year, value.month)[1]

            for i in range(days_in_month):
                day_content = DayContent()
                for hour in range(12, 24):
                    for minute in range(0, 60, 30):
                        time_str = f"{hour:02d}:{minute:02d}"
                        setattr(day_content, time_str, False)
                day_content.save()
                d = Days(month=r, date=datetime.date(value.year, value.month, i + 1), day_content=day_content)
                d.save()

        return Response({"Success": True})


class GetMenuPDFView(APIView):
    def get(self, request):
        menu_pdf = MenuPDF.objects.first()
        return Response({"menu_pdf_path": menu_pdf.menu.path.replace('/app', '')})


class AddNewMonth(APIView):
    def get(self, request):
        reservation = Reservation.objects.all().order_by('id')
        reservation[0].delete()
        current_date = datetime.datetime.today()
        second_month_date = current_date.month % 12 + 2
        second_year_date = current_date.year

        if second_month_date < current_date.month:
            second_year_date += 1

        second_month = datetime.date(second_year_date, second_month_date, 1)
        month_name = second_month.strftime('%B')

        r = Reservation(month=month_name)
        r.save()
        days_in_month = monthrange(second_year_date, second_month_date)[1]

        for i in range(days_in_month):
            day_content = DayContent()
            for hour in range(12, 24):
                for minute in range(0, 60, 30):
                    time_str = f"{hour:02d}:{minute:02d}"
                    setattr(day_content, time_str, False)
            day_content.save()
            d = Days(month=r, date=datetime.date(second_year_date, second_month_date, i + 1), day_content=day_content)
            d.save()

        return Response({"Success": True})
