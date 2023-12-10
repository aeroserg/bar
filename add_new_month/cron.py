import schedule
import time
import requests
from datetime import date


def my_monthly_function():
    if date.today().day != 1:
        return
    r = requests.get('http://backend:3001/api/add_new_month/')
    print(r.text)


def run_monthly_job():
    schedule.every().day.at('00:00').do(my_monthly_function)


def main():
    run_monthly_job()
    while True:
        schedule.run_pending()
        time.sleep(40)


if __name__ == "__main__":
    main()
