from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import *

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(ModelSerializer):
    arrival_time = SerializerMethodField()

    def get_arrival_time(self, obj):
        return obj.arrival_time.strftime("%Y%m%d%H%M%S")

    class Meta:
        model = Product
        fields = '__all__'


class UserProfileSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'


class CartSerializer(ModelSerializer):
    grand_total = SerializerMethodField()
    quantity_in_cart = SerializerMethodField()

    def get_grand_total(self, obj):
        return obj.grand_total()

    def get_quantity_in_cart(self, obj):
        return obj.quantity_in_cart()

    class Meta:
        model = Cart
        fields = '__all__'


class CartItemSerializer(ModelSerializer):
    total = SerializerMethodField()
    product = ProductSerializer()

    def get_total(self, obj):
        return obj.total()

    class Meta:
        model = CartItem
        fields = '__all__'


class OrderSerializer(ModelSerializer):
    order_date = SerializerMethodField()
    payment_method = SerializerMethodField()
    status = SerializerMethodField()
    
    def get_order_date(self, obj):
        return obj.order_date.strftime("%H:%M %d/%m/%Y")

    def get_payment_method(self, obj):
        return obj.get_payment_method_display()

    def get_status(self, obj):
            return obj.get_status_display()

    class Meta:
        model = Order
        fields = '__all__'


class OrderItemSerializer(ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = '__all__'  


class PaymentSerializer(ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

