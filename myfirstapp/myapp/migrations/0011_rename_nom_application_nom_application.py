# Generated by Django 3.2.12 on 2024-02-25 15:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0010_auto_20240225_1546'),
    ]

    operations = [
        migrations.RenameField(
            model_name='application',
            old_name='nom',
            new_name='nom_application',
        ),
    ]