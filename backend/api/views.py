from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from .models import Product, Category
from .serializer import ProductSerializer, CategorySerializer
from django.db.models import Q

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