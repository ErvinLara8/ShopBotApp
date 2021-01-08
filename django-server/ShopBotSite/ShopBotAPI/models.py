# from django.db import models
# from django import forms
from djongo import models


# Create your models here.

class Products(models.Model):

    productID = models.IntegerField()
    productName = models.CharField(max_length=100)
    productPrice = models.DecimalField(max_digits=6, decimal_places=2)
    productQuantity = models.IntegerField()
    class Meta:
        abstract = True

class Employees(models.Model):

    employeeID = models.IntegerField()
    employeeFirstName = models.CharField(max_length=100)
    employeeLastName = models.CharField(max_length=100)
    employeePass = models.CharField(max_length=100)

    class Meta:
        abstract = True

class Orders(models.Model):

    orderID = models.IntegerField()
    userID = models.IntegerField()
    orderDate = models.DateTimeField(auto_now_add=True, blank=True)
    userFirstName = models.CharField(max_length=100)
    userLastName = models.CharField(max_length=100)
    listOfProducts = models.ArrayField(
        model_container = Products
    )

    class Meta:
        abstract = True

class ShopBotUsers(models.Model):

    userID = models.IntegerField()
    userFirstName = models.CharField(max_length=100)
    userLastName = models.CharField(max_length=100)
    userEmail = models.EmailField()
    userPassword = models.CharField(max_length=100)

    userOrder = models.ArrayField(
        model_container = Orders
    )


class GroceryStore(models.Model):

    storeID = models.IntegerField()
    storeName = models.CharField(max_length=100)
    storeAddress = models.CharField(max_length=100)
    storePassword = models.CharField(max_length=100)
    storeProducts = models.ArrayField(
        model_container = Products
    )

    storeOrders = models.ArrayField(
        model_container = Orders
    )

    storeEmployees = models.ArrayField(
        model_container = Employees
    )


