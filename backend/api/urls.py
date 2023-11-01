from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # path('import/', views.importData),
    # User
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('profile/', views.ProfileView.as_view(), name='ProfileView'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Product
    path('products/<int:categoryId>/', views.getProductByCategory, name='getProductByCategory'),
    path('products/all/', views.getProductList, name='getProductList'),
    path('product/<int:productId>/', views.getProduct, name='getProduct'),
    path('categories/', views.getCategoryList, name='getCategoryList'),
    path('search/', views.searchProduct, name='search'),
    
    # Cart
    path('cart/', views.getCart, name='getCart'),
    path('cart/items/', views.CartItemView.as_view(), name='CartItemView'),
    path('cart/items/delete/<int:cartItemId>/', views.deleteCartItem, name='deleteCartItem'),

    # Order
    path('order/all/', views.getOrderList, name='getOrderList'),
    path('order/create/', views.createOrder, name='createOrder'),
    path('order/<int:orderId>/', views.getOrderDetail, name='getOrderDetail'),
    path('order/items/<int:orderId>/', views.getOrderItems, name='getOrderItems'),

    # Payment
    path('payment/create/', views.getPaymentURL, name='getPaymentURL'),
    path('payment/save/', views.savePaymentResult, name='savePaymentResult')
]