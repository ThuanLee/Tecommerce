# Generated by Django 4.2.1 on 2023-08-26 17:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0019_alter_orderitem_options_product_image_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.IntegerField()),
                ('bank_code', models.CharField(max_length=20)),
                ('bank_trans', models.CharField(max_length=256)),
                ('pay_date', models.CharField(max_length=14)),
                ('order_info', models.CharField(max_length=256)),
                ('vnp_trans', models.CharField(max_length=15)),
                ('vnp_TxnRef', models.CharField(max_length=100)),
                ('order', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.order')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='payments', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-pay_date'],
            },
        ),
    ]
