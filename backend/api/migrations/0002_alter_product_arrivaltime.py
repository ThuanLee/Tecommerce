# Generated by Django 4.2.1 on 2023-07-31 16:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='arrivalTime',
            field=models.DateTimeField(auto_now=True),
        ),
    ]