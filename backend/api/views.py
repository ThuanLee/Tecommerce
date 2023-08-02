from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product
from .serializer import ProductSerializer

# products/ -> getProductList
# product/<int:pk>/ -> getProduct

@api_view(['GET'])
def getProductList(request):
    serializer = ProductSerializer(Product.objects.all(), many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    serializer = ProductSerializer(Product.objects.get(pk=pk), many=False)
    return Response(serializer.data)