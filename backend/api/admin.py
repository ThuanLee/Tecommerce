from django.contrib import admin
from .models import *

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'image_url', 'description', 'price', 'quantity_in_stock']
    list_editable = ['name', 'image_url', 'description', 'price', 'quantity_in_stock']

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['id', 'fullname', 'phone_number', 'address']

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['id', 'quantity_in_cart', 'grand_total']

    def get_quantity_in_cart(self, obj):
        return obj.quantity_in_cart()

    def get_grand_total(self, obj):
        return obj.grand_total()

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'cart', 'product', 'quantity', 'total']

    def get_total(self, obj):
        return obj.total()

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_code', 'receiver_name', 'grand_total', 'shipping_fee', 'phone_number', 'address', 'note', 'payment_method', 'order_date', 'status']

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'product', 'quantity', 'total']