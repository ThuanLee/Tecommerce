from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from .models import Category, Product, User
from .serializer import CategorySerializer, ProductSerializer, UserSerializer
from django.db.models import Q
from hashlib import sha256

@api_view(['GET'])
def getProductList(request):
    serializer = ProductSerializer(Product.objects.all(), many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, productId):
    serializer = ProductSerializer(get_object_or_404(Product, pk=productId), many=False)
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

    # encode password
    password = sha256(password.encode()).hexdigest()
    newAccount = User.objects.create(username=username, password=password, email=email)
    
    return Response("signup success")
    

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    # encode password
    password = sha256(password.encode()).hexdigest()

    if (User.objects.filter(username=username)):
        if (User.objects.filter(password=password)):
            user = User.objects.get(username=username, password=password)
            return Response({'id': str(user.id), 'token': '123'})
        else:
            return Response("password not match")
    else:
        return Response("username not match")
