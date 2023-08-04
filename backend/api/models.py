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
    price = models.IntegerField(max_length=12)
    arrival_time = models.DateField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-arrival_time']
    
