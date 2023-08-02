from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.getProductList, name='getProductList'),
    path('product/<int:pk>/', views.getProduct, name='getProduct')
]