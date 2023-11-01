from api import models
from api.models import Product, Category
from django.conf import settings
import json, time

def load_data():
    f = open(settings.BASE_DIR / 'api/data.txt')
    blocks = f.read().split('***---***')
    f.close()

    for block in blocks:
        products = json.loads(block)
        for product in products:
            try:
                category = Category.objects.filter(name=product['category'])
                if not category.exists():
                    category = Category.objects.create(name=product['category'])
                    product['category'] = category
                else:
                    product['category'] = category.first()
                newProduct = Product.objects.create(**product)
                print(f'Add {newProduct.id}: {newProduct.name} OKE')
            except Exception as e:
                print(e)