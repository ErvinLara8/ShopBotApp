from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# WE ARE USING AUTH USER

class GroceryStore(models.Model):

    store_ID = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    street = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=100)
    password = models.CharField(max_length=100)


class Categories(models.Model):

    category_ID = models.AutoField(primary_key=True)
    categoryName = models.CharField(max_length=100)

class ProductDetails(models.Model):

    product_ID = models.AutoField(primary_key=True)
    category_ID = models.ForeignKey(Categories, related_name='category', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100, blank=True)

class StoreListings(models.Model):

    listing_ID = models.AutoField(primary_key=True)
    product_ID = models.ForeignKey(ProductDetails,  related_name='product_details', on_delete=models.PROTECT)
    storeID = models.ForeignKey(GroceryStore, on_delete=models.PROTECT)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    quantity = models.IntegerField()


class Orders(models.Model):

    order_ID = models.AutoField(primary_key=True)
    user_ID = models.ForeignKey(User,  related_name='user_details', on_delete=models.PROTECT)
    store_ID = models.ForeignKey(GroceryStore,  related_name='store_details', on_delete=models.PROTECT)
    date = models.DateTimeField()
    item_count = models.IntegerField()
    total = models.DecimalField(max_digits=6 ,decimal_places=2)
    completed = models.BooleanField(default=False)

class OrderDetails(models.Model):

    detail_ID = models.AutoField(primary_key=True)
    order_ID = models.ForeignKey(Orders , related_name='order_list', on_delete=models.PROTECT)
    listing_ID = models.ForeignKey(StoreListings, related_name='listing_details', on_delete=models.PROTECT)
    wanted_num = models.IntegerField()

class Employees(models.Model):

    employee_ID = models.AutoField(primary_key=True)
    store_ID = models.ForeignKey(GroceryStore,  related_name='employed_store', on_delete=models.PROTECT)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)