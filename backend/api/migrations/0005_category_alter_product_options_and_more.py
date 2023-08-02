# Generated by Django 4.2.1 on 2023-08-02 09:36

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_product_options_alter_product_arrival_time'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.AlterModelOptions(
            name='product',
            options={'ordering': ['-arrival_time']},
        ),
        migrations.AlterField(
            model_name='product',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=12),
        ),
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='products', to='api.category'),
            preserve_default=False,
        ),
    ]
