from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import *

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(ModelSerializer):
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
    

