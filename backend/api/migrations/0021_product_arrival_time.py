# Generated by Django 4.2.1 on 2023-08-28 12:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_alter_order_user_payment'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='arrival_time',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
