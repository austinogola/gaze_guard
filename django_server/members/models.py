from django.db import models
from django.contrib.postgres.fields import ArrayField,JSONField

# Create your models here.
class Member(models.Model):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    
    def __str__(self):
        return str(self.username)
    
    
class Account(models.Model):
    account_id = models.AutoField(primary_key=True)
    member = models.OneToOneField(Member, on_delete=models.CASCADE, related_name='account')
    plan = models.CharField(max_length=50)
    made_by=models.CharField(max_length=50,default='user_made')
    usage = models.JSONField(default=list )  # Array of objects
    payments = models.JSONField(default=list )
    # usage = ArrayField(models.JSONField(), default=[])  # Array of objects
    # payments = ArrayField(models.JSONField(), default=[])  # Array of objects
    
    
    def __str__(self):
        return str(self.account_id)
