from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # User
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('profile/<int:userId>/', views.ProfileDetail.as_view(), name='ProfileDetail'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Product
    path('products/<int:categoryId>/', views.getProductByCategory, name='getProductByCategory'),
    path('products/all/', views.getProductList, name='getProductList'),
    path('product/<int:productId>/', views.getProduct, name='getProduct'),
    path('categories/', views.getCategoryList, name='getCategoryList'),
    path('search/', views.searchProduct, name='search'),
    
    # Cart
    path('cart/<int:userId>/', views.getCart, name='getCart'),
    path('cart/items/<int:userId>/', views.CartItems.as_view(), name='CartItems'),
    path('cart/items/delete/<int:cartItemId>/', views.deleteCartItem, name='deleteCartItem')
]