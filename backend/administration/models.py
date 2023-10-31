from django.db import models


class Menu(models.Model):
    photo = models.FileField()
    price = models.CharField()
    name = models.CharField()


class Contact(models.Model):
    phone = models.CharField()
    address = models.TextField()


class
