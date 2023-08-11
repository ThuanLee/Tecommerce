from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
    

class Product(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    description = models.TextField(null=True, blank=True)
    price = models.IntegerField()
    quantity_in_stock = models.IntegerField()
    arrival_time = models.DateField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-arrival_time']

class User(models.Model):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=100)
    fullname = models.CharField(max_length=50, null=True)
    email = models.EmailField(max_length=100)
    phone_number = models.CharField(max_length=20, null=True)
    address = models.CharField(max_length=150, null=True)

    def __str__(self):
        return self.username

    class Meta:
        ordering =  ['username']
