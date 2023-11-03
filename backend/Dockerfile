FROM python:3.8-bullseye

WORKDIR /app
COPY . .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt


CMD ["python", "-u", "manage.py", "runserver", "0:8000", "--insecure"]
#CMD ["gunicorn", "handmade_by_semion.wsgi:application", "--bind", "0.0.0.0:8000" ]