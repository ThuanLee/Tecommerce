from django.urls import path
from . import views

urlpatterns = [
    path('products/<int:categoryId>/', views.getProductByCategory, name='getProductByCategory'),
    path('products/all/', views.getProductList, name='getProductList'),
    path('product/<int:productId>/', views.getProduct, name='getProduct'),
    path('categories/', views.getCategoryList, name='getCategoryList'),
    path('search/', views.searchProduct, name='search')
]