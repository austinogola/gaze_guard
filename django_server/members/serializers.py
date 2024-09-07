from rest_framework import serializers
from .models import Account,Member

class AccountSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField(unique=True)
    # password = serializers.CharField(max_length=255)
    # allowed_max_bid = serializers.CharField(max_length=255)
    # copart_accounts = ArrayField(serializers.IntegerField(),default=list)  
    class Meta:
        model=Account
        # fields=('email','password','copart_accounts','allowed_max_bid')
        fields = '__all__'
        
   


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model=Member
        # fields=('timestamp','lot','VIN','bid_amount','current_status','username')
        fields = '__all__'