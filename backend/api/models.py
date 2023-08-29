from django.db import models
from django.contrib.auth.models import User


ORDER_STATUS = (
    ("HANDLING", "Đang xử lý"),
    ("PACKING", "Đang đóng gói"),
    ("SHIPPING", "Đang gửi"),
    ("COMPLETED", "Đã nhận hàng"),
    ("CANCELLED", "Đã hủy"),
)

PAYMENT_METHOD = (
    ("BANKING", "Thanh toán bằng tài khoản ngân hàng"),
    ("COD", "Thanh toán khi nhận hàng"),
)

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
    

class Product(models.Model):
    name = models.CharField(max_length=100)
    image_url = models.CharField(max_length=256)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.TextField(null=True, blank=True)
    price = models.IntegerField()
    arrival_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    id = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    fullname = models.CharField(max_length=50, null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    address = models.TextField(null=True, blank=True)


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


class Order(models.Model):
    order_code = models.CharField(max_length=100)
    user = models.ForeignKey(User, related_name='orders', on_delete=models.CASCADE)
    shipping_fee = models.IntegerField()
    grand_total = models.IntegerField()
    receiver_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20)
    address = models.TextField()
    note = models.TextField(null=True, blank=True)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD, default="COD")
    order_date = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=ORDER_STATUS, default="HANDLING")

    def __str__(self):
        return str(self.order_code)

    class Meta:
        ordering = ['-order_date']


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    total = models.IntegerField()

    def __str__(self):
        return str(self.order)

    class Meta:
        ordering = ['-id']


class Payment(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='payments', on_delete=models.CASCADE)
    amount = models.IntegerField()
    bank_code = models.CharField(max_length=20)
    bank_trans = models.CharField(max_length=256)
    pay_date = models.CharField(max_length=14)
    order_info = models.CharField(max_length=256)
    vnp_trans = models.CharField(max_length=15)
    vnp_TxnRef = models.CharField(max_length=100)

    def __str__(self):
        return str(self.order)

    class Meta:
        ordering = ['-pay_date']