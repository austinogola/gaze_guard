# Generated by Django 5.1 on 2024-09-02 17:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='payments',
            field=models.JSONField(default=list),
        ),
        migrations.AlterField(
            model_name='account',
            name='usage',
            field=models.JSONField(default=list),
        ),
    ]
