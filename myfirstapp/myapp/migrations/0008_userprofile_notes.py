# Generated by Django 3.2.12 on 2024-02-20 10:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0007_auto_20240220_1030'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='notes',
            field=models.TextField(blank=True),
        ),
    ]
