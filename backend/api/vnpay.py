import urllib.parse
import hashlib
import hmac
from datetime import datetime
from ipware import get_client_ip
from django.conf import settings
from uuid import uuid4

def hmacsha512(key, data):
    byteKey = key.encode('utf-8')
    byteData = data.encode('utf-8')
    return hmac.new(byteKey, byteData, hashlib.sha512).hexdigest()

class vnpay:
    def __init__(self, request):
        self.params = {
            "vnp_Amount": request.data.get('amount') * 100,
            "vnp_Command": 'pay',
            "vnp_CreateDate": datetime.now().strftime('%Y%m%d%H%M%S'),
            "vnp_CurrCode": 'VND',
            "vnp_IpAddr": get_client_ip(request)[0],
            "vnp_Locale": 'vn',
            "vnp_OrderInfo": str(request.user.id) + " thanh toan don hang",
            "vnp_OrderType": 'other',
            "vnp_ReturnUrl": settings.VNPAY_RETURN_URL,
            "vnp_TmnCode": settings.VNPAY_TMN_CODE,
            "vnp_TxnRef": str(uuid4()).replace('-', ''),
            "vnp_Version": '2.1.0',
        }
        self.query_string = urllib.parse.urlencode(self.params)

    def get_payment_url(self):
        url = settings.VNPAY_PAYMENT_URL
        hash_value = hmacsha512(settings.VNPAY_HASH_SECRET_KEY, self.query_string)
        return url + "?" + self.query_string + "&vnp_SecureHash=" + hash_value
    