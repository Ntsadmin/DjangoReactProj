# Generated by Django 3.2.9 on 2022-05-23 11:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_auto_20220518_1559'),
    ]

    operations = [
        migrations.AddField(
            model_name='dbworkunits',
            name='is_productive',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]