# Generated by Django 3.2.12 on 2024-02-15 12:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0004_auto_20240215_1255'),
    ]

    operations = [
        migrations.AddField(
            model_name='utilisateur',
            name='prenom',
            field=models.CharField(default='Inconnu', max_length=255),
            preserve_default=False,
        ),
    ]
