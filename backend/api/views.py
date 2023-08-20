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

@api_view(['GET'])
def getProductList(request):
    serializer = ProductSerializer(Product.objects.all(), many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, productId):
    serializer = ProductSerializer(Product.objects.get(pk=productId), many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getProductByCategory(request, categoryId):
    serializer = ProductSerializer(Product.objects.filter(category=categoryId), many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getCategoryList(request):
    serializer = CategorySerializer(Category.objects.all(), many=True)
    return Response(serializer.data)

@api_view(['POST'])
def searchProduct(request):
    query = request.data.get('query')
    products = Product.objects.filter(Q(name__icontains=query) | Q(description__icontains=query))
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

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
        data = {"email": user.email}
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
        data = {"email": user.email}
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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createOrder(request):
    userId = request.user.id
    order_id = str(uuid4())
    shipping_fee = request.data.get('shipping_fee')
    phone_number = request.data.get('phone_number')
    address = request.data.get('address')

    cart = Cart.objects.get(pk=userId)

    payment = cart.grand_total() + int(shipping_fee)

    order = Order.objects.create(order_id=order_id,
                                user_id=userId,
                                shipping_fee=shipping_fee,
                                payment=payment,
                                phone_number=phone_number,
                                address=address)

    for cartItem in cart.items.all():
        OrderItem.objects.create(order=order,
                                product=cartItem.product,
                                quantity=cartItem.quantity,
                                total=cartItem.total())
    
    cart.items.all().delete()

    serializer = OrderSerializer(order, many=False)

    return Response(serializer.data)
