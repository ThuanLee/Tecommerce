from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
    

class Product(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.TextField(null=True, blank=True)
    price = models.IntegerField()
    quantity_in_stock = models.IntegerField()

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    id = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    fullname = models.CharField(max_length=50, null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    address = models.CharField(max_length=150, null=True, blank=True)


class Cart(models.Model):
    id = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    def grand_total(self):
        grandTotal = 0
        for item in self.items.all():
            grandTotal += item.total()
        return grandTotal

    def quantity_in_cart(self):
        return self.items.all().count()

    def __str__(self):
        return str(self.id)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def total(self):
        return self.product.price * self.quantity

    def __str__(self):
        return str(self.cart)

    class Meta:
        ordering = ['-id']