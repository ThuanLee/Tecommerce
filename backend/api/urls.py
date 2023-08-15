from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('products/<int:categoryId>/', views.getProductByCategory, name='getProductByCategory'),
    path('products/all/', views.getProductList, name='getProductList'),
    path('product/<int:productId>/', views.getProduct, name='getProduct'),
    path('categories/', views.getCategoryList, name='getCategoryList'),
    path('search/', views.searchProduct, name='search'),
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('profile/<int:userId>/', views.ProfileDetail.as_view(), name='ProfileDetail')
]