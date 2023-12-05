import schedule
import time
import requests


def generate_month_orders():
    r = requests.get('http://localhost:8000/api/init_reservation/')
    print(r.text)


# def schedule_task():
#     # Запуск задачи каждый месяц первого числа в полночь
#     schedule.every(1).minutes.do(generate_month_orders)
#
#     while True:
#         schedule.run_pending()
#         time.sleep(1)
#
#
# if __name__ == '__main__':
#     schedule_task()

generate_month_orders()
