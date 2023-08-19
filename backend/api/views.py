from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializer import *
from django.db.models import Q
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

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
class ProfileDetail(APIView):
    
    def get(self, request, userId):
        user = User.objects.get(pk=userId)
        userProfile = UserProfile.objects.get(pk=userId)
        serializer = UserProfileSerializer(userProfile, many=False)
        
        # Add email field to return dict
        data = {"email": user.email}
        data.update(serializer.data)

        return Response(data)

    def put(self, request, userId):
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
def getCart(request, userId):
    cart = Cart.objects.get(pk=userId)
    serializer = CartSerializer(cart, many=False)
    return Response(serializer.data)


@permission_classes([IsAuthenticated])
class CartItems(APIView):
    
    def get(self, request, userId):
        cart = Cart.objects.get(pk=userId)
        cartItems = cart.items.all()
        serializer = CartItemSerializer(cartItems, many=True)
        return Response(serializer.data)

    def post(self, request, userId):
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
        


    