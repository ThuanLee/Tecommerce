from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializer import *
from django.db.models import Q
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from uuid import uuid4
from .vnpay import vnpay
from unidecode import unidecode
from .pagination import ProductPagination


# from api.load_data import load_data
# @api_view(['GET'])
# def importData(request):
#     load_data()
#     return Response("Import data successfully")

pagination = ProductPagination()

@api_view(['GET'])
def getProductList(request):
    products = Product.objects.all()
    products = pagination.paginate_queryset(products, request)
    serializer = ProductSerializer(products, many=True)
    return pagination.get_paginated_response(serializer.data)

@api_view(['GET'])
def getProduct(request, productId):
    serializer = ProductSerializer(Product.objects.get(pk=productId), many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getProductByCategory(request, categoryId):
    products = Product.objects.filter(category=categoryId)
    products = pagination.paginate_queryset(products, request)
    serializer = ProductSerializer(products, many=True)
    return pagination.get_paginated_response(serializer.data)

@api_view(['GET'])
def getCategoryList(request):
    serializer = CategorySerializer(Category.objects.all(), many=True)
    return Response(serializer.data)

@api_view(['POST'])
def searchProduct(request):
    query = request.data.get('query')

    # Remove accents and lowercase string
    query = unidecode(query).lower()
    products = Product.objects.all()
    searchResult = []
    for product in products:
        query_arr = query.split(' ')
        for key_word in query_arr:
            if key_word in unidecode(str(product)).lower() or query in unidecode(str(product.category)).lower():
                searchResult.append(product)

    searchResult = pagination.paginate_queryset(searchResult, request)
    serializer = ProductSerializer(searchResult, many=True)
    return pagination.get_paginated_response(serializer.data)

@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if (User.objects.filter(username=username)):
        return Response("username exists")
    
    if (User.objects.filter(email=email)):
        return Response("email exists")

    user = User.objects.create_user(username=username, password=password, email=email)
    UserProfile.objects.create(pk=user.id)
    Cart.objects.create(pk=user.id)
    
    return Response("signup success")
    

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if (User.objects.filter(username=username)):
        user = User.objects.get(username=username)
        if (user.check_password(password)):
            refresh = RefreshToken.for_user(user)
            token = {
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }
            return Response(token)
        else:
            return Response("password not match")
    else:
        return Response("username not match")


@permission_classes([IsAuthenticated])
class ProfileView(APIView):
    
    def get(self, request):
        userId = request.user.id
        user = User.objects.get(pk=userId)
        userProfile = UserProfile.objects.get(pk=userId)
        serializer = UserProfileSerializer(userProfile, many=False)
        
        # Add email field to return dict
        data = {
            "email": user.email,
            "username": user.username
        }
        data.update(serializer.data)

        return Response(data)

    def put(self, request):
        userId = request.user.id
        newFullname = request.data.get("fullname")
        newEmail = request.data.get("email")
        newPhoneNumber = request.data.get("phone_number")
        newAddress = request.data.get("address")

        user = User.objects.get(pk=userId)
        userProfile = UserProfile.objects.get(pk=userId)

        # Change email
        if (user.email != newEmail):
            if (User.objects.filter(email=newEmail)):
                return Response("email exists")
            else:
                user.email = newEmail
                user.save()

        # Change profile
        userProfile.fullname = newFullname
        userProfile.phone_number = newPhoneNumber
        userProfile.address = newAddress
        userProfile.save()

        serializer = UserProfileSerializer(userProfile, many=False)
        data = {
            "email": user.email,
            "username": user.username
        }
        data.update(serializer.data)

        return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCart(request):
    userId = request.user.id
    cart = Cart.objects.get(pk=userId)
    serializer = CartSerializer(cart, many=False)
    return Response(serializer.data)


@permission_classes([IsAuthenticated])
class CartItemView(APIView):
    
    def get(self, request):
        userId = request.user.id
        cart = Cart.objects.get(pk=userId)
        cartItems = cart.items.all()
        serializer = CartItemSerializer(cartItems, many=True)
        return Response(serializer.data)

    def post(self, request):
        userId = request.user.id
        productId = request.data.get("productId")
        quantity = request.data.get("quantity")
        
        try:
            cart = Cart.objects.get(pk=userId)
            cartItem = cart.items.get(product=productId)
            cartItem.quantity += quantity
            cartItem.save()
        except:
            CartItem.objects.create(cart_id=userId, product_id=productId, quantity=quantity)

        serializer = CartSerializer(cart, many=False)
        return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteCartItem(request, cartItemId):
    cartItem = CartItem.objects.get(pk=cartItemId)
    userId = cartItem.cart.id
    cartItem.delete()
    cart = Cart.objects.get(pk=userId)
    cartItems = cart.items.all()
    cartSerializer = CartSerializer(cart, many=False)
    cartItemSerializer = CartItemSerializer(cartItems, many=True)
    data = {
        "cart": cartSerializer.data,
        "cartItems": cartItemSerializer.data
    }
    return Response(data)
        

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderList(request):
        userId = request.user.id
        orders = Order.objects.filter(user=userId)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderDetail(request, orderId):
    order = Order.objects.get(pk=orderId)
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderItems(request, orderId):
    orderItems = OrderItem.objects.filter(order=orderId)
    serializer = OrderItemSerializer(orderItems, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createOrder(request):
    userId = request.user.id
    cart = Cart.objects.get(pk=userId)

    order_code = str(uuid4())
    grand_total = cart.grand_total()
    shipping_fee = request.data.get('shipping_fee')
    receiver_name = request.data.get('receiver_name')
    phone_number = request.data.get('phone_number')
    address = request.data.get('address')
    note = request.data.get('note')
    payment_method = request.data.get('payment_method')

    order = Order.objects.create(order_code=order_code,
                                user_id=userId,
                                grand_total=grand_total,
                                shipping_fee=shipping_fee,
                                receiver_name=receiver_name,
                                phone_number=phone_number,
                                payment_method=payment_method,
                                address=address,
                                note=note)

    for cartItem in cart.items.all():
        OrderItem.objects.create(order=order,
                                product=cartItem.product,
                                quantity=cartItem.quantity,
                                total=cartItem.total())
    
    cart.items.all().delete()

    serializer = OrderSerializer(order, many=False)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getPaymentURL(request):
    vnp = vnpay(request)
    payment_url = vnp.get_payment_url()
    return Response(payment_url)


@api_view(['POST'])
def savePaymentResult(request):
    order = request.data.get('order')
    user = int(request.data.get('order_info').split(' ')[0])
    amount = int(request.data.get('amount')) / 100
    bank_code = request.data.get('bank_code')
    bank_trans = request.data.get('bank_trans')
    pay_date = request.data.get('pay_date')
    order_info = request.data.get('order_info')
    vnp_trans = request.data.get('vnp_trans')
    vnp_TxnRef = request.data.get('vnp_TxnRef')

    payment = Payment.objects.create(order_id=order,
                           user_id=user,
                           amount=amount,
                           bank_code=bank_code,
                           bank_trans=bank_trans,
                           pay_date=pay_date,
                           order_info=order_info,
                           vnp_trans=vnp_trans,
                           vnp_TxnRef=vnp_TxnRef)


    serializer = PaymentSerializer(payment, many=False)
    return Response(serializer.data)