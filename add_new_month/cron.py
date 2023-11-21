from send_mail import SendMail
import schedule
import time


def generate_month_orders():
    send_mail = SendMail(host="smtp.gmail.com",
                         port="587",
                         email_address_from="klosepsergey123@gmail.com",
                         email_password="suiaxmcwrrauypic",
                         email_address_to="1308267@gmail.com",
                         message="test",
                         subject="test")
    send_mail.send_email()


def schedule_task():
    # Запуск задачи каждый месяц первого числа в полночь
    schedule.every(1).minutes.do(generate_month_orders)

    while True:
        schedule.run_pending()
        time.sleep(1)


if __name__ == '__main__':
    schedule_task()