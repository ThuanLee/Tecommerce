# Generated by Django 4.2.1 on 2023-08-29 22:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0021_product_arrival_time'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='quantity_in_stock',
        ),
    ]
