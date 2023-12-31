# Generated by Django 4.2.1 on 2023-08-11 16:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_user_product_quantity_in_stock_alter_product_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='email',
            field=models.EmailField(default='email@email.com', max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='user',
            name='address',
            field=models.CharField(max_length=150, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='fullname',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='phone_number',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
