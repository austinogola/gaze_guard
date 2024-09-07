# accounts/views.py
import os
import time
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Member,Account
from rest_framework_simplejwt.tokens import RefreshToken
import json
import jwt
from dotenv import load_dotenv
from datetime import datetime, timedelta

from .serializers import AccountSerializer,MemberSerializer

load_dotenv()

import bcrypt
import hashlib

def hashPwd(raw_password):
    # password_hash = hashlib.sha256(raw_password.encode("utf-8")).hexdigest()
    password_hash=bcrypt.hashpw(raw_password.encode('utf-8'), bcrypt.gensalt(14))
    hash_string=password_hash.decode("utf-8")
    return hash_string

def checkPwd(raw,hashed):
    hashByte=bytes(hashed,'utf-8')
    return bcrypt.checkpw(raw.encode('utf-8'), hashByte)

def makeJwtToken(user_id,email):
    secret = os.getenv('JWT_SECRET')
    encoded_jwt = jwt.encode({"user_id": user_id,"email": email}, secret, algorithm="HS256")
    return encoded_jwt

def getJwtPayload(token):
    secret = os.getenv('JWT_SECRET')
    try:
        decoded = jwt.decode(token, secret, algorithms=["HS256"])
        return decoded
    except:
        print(False)
        return False
    

@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
       
        
        if not username:
            return JsonResponse({'status': 'error', 'message': 'Missing username'}, status=400)
        if not email:
            return JsonResponse({'status': 'error', 'message': 'Missing email'}, status=400)
        if not password:
            return JsonResponse({'status': 'error', 'message': 'Missing password'}, status=400)


        if Member.objects.filter(username=username).exists():
            return JsonResponse({'status': 'error', 'message': 'Username already exists'}, status=400)
        if Member.objects.filter(email=email).exists():
            return JsonResponse({'status': 'error', 'message': 'Email already exists'}, status=400)
        
        hashed_pwd=hashPwd(password)
        try:
     
            member = Member(username=username, email=email, password=hashed_pwd)
            member.save()
            Account.objects.create(member=member, plan='free')
            # login(request, member)
            user_id=member.user_id
            email=member.email
            jwt_token=makeJwtToken(user_id,email)
            # refresh = RefreshToken.for_user(member)
            # access_token = str(refresh.access_token)
            
            return JsonResponse({'status': 'success', 'message': 'Member created successfully',
                                 'token': jwt_token})
            
            pass
        except Exception as e:
            message=str(e)
            return JsonResponse({'status': 'error', 'message': message}, status=400)
       
        

    return JsonResponse({'status': 'error', 'message': 'Wrong request method'},status=400)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        print(email,password)
        
        if not username and not email:
            return JsonResponse({'status': 'error', 'message': 'Missing username or email'}, status=400)
        
        member_exists=Member.objects.filter(email=email).exists() or Member.objects.filter(username=username).exists()

        if not member_exists:
            return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=400)

        the_member = Member.objects.get(email=email) or Member.objects.get(username=username)
        member_data=MemberSerializer(the_member).data
        
        hashed_pwd=member_data["password"]
        
        if(not checkPwd(password,hashed_pwd)):
            return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=400)

        user_id=member_data["user_id"]
        email=member_data["email"]
        jwt_token=makeJwtToken(user_id,email)
                 
        return JsonResponse({'status': 'success', 'message': 'Member logged in successfully',
                                 'token': jwt_token})

        
    return JsonResponse({'status': 'error', 'message': 'Wrong request method'},status=400)


@csrf_exempt
def ext_auth_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')

        if not email:
            return JsonResponse({
                'status': 'error',
                'message': 'Email is required.'
            }, status=400)
            
        pwd=Member.objects.make_random_password()
        member, created = Member.objects.get_or_create(email=email)
        print(member)
        print(created)
        return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=400)

plans_objects={
    "free":{"images":100,"video":100},
    "basic":{"images":"unlimited","video":200},
    "pro":{"images":'unlimited',"video":'unlimited'}
    }

def get_member_usage_remnants(the_account):
    now = datetime.now()
    start_of_today = int(datetime(now.year, now.month, now.day).timestamp())
    start_of_tomorrow = int((datetime(now.year, now.month, now.day) + timedelta(days=1)).timestamp())

    account_data=AccountSerializer(the_account).data
    plan=account_data['plan']
    usage=account_data['usage']
    
    max_images=plans_objects[plan]["images"]
    max_minutes=plans_objects[plan]["video"]
    
    remaining_images='unlimited'
    remaining_minutes='unlimited'
    
    if isinstance(max_images, (int, float)):
        images_today = [
            obj for obj in usage
            if start_of_today <= obj['time_added'] < start_of_tomorrow and obj.get('type') == 'image'
        ]
        remaining_images=max_images-len(images_today)
        
    if isinstance(max_minutes, (int, float)):
        videos_today = [
            obj for obj in usage
            if start_of_today <= obj['time_added'] < start_of_tomorrow and obj.get('type') == 'video'
        ]
        print(videos_today)
        minutes_today=sum(obj["minutes"] for obj in videos_today)
        remaining_minutes=max_minutes-minutes_today
        
    return {"max_minutes":max_minutes,
            "remaining_minutes":remaining_minutes,
            "max_images":max_images,"remaining_images":remaining_images}
        
        
@csrf_exempt
def config(request):
    if request.method == 'GET':
        gg_token=request.COOKIES.get('gg_token')
        
        if not gg_token:
            return JsonResponse({'status': 'error', 'message': 'Not allowed'}, status=400)
        
        data=getJwtPayload(gg_token)
        if not data:
             return JsonResponse({'status': 'error', 'message': 'Not allowed'}, status=400)
         
        email=data['email']
        member_exists=Member.objects.filter(email=email).exists()
        if not member_exists:
            return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=400)

        the_member = Member.objects.get(email=email)
        the_account = the_member.account
        
        # remaining_images=account_data['images']
        
       
        config_data=get_member_usage_remnants(the_account)
        
        
        
        
        # config_data={"remaining_images":remaining_images,"remaining_minutes":remaining_minutes,"plan":plan}
        
        return JsonResponse({'status': 'success', 'data':config_data}, status=200)
         
       
         
        
    return JsonResponse({'status': 'error', 'message': 'Invalid method'}, status=400)
        
        
        
@csrf_exempt
def usage(request):
    if request.method == 'POST':
        gg_token=request.COOKIES.get('gg_token')
        if not gg_token:
                return JsonResponse({'status': 'error', 'message': 'Not allowed'}, status=400)
            
        data=getJwtPayload(gg_token)
        if not data:
                return JsonResponse({'status': 'error', 'message': 'Not allowed'}, status=400)
    
        posted_data = json.loads(request.body)
        time_added = int(time.time())
        # time_added = posted_data.get('date_added')
        type = posted_data.get('type')
     
        if not type:
                return JsonResponse({'status': 'error', 'message': 'No type'}, status=400)
        
        email=data['email']
        the_member = Member.objects.get(email=email)
        the_account = the_member.account
        print(the_account)
        # account_data=AccountSerializer(the_account).data
        if(type=='image'):
            the_account.usage.append({"time_added":time_added,"type":type})
            the_account.save()
        else:
            gg_src=posted_data.get('gg_src')
            minutes=posted_data.get('time')
            prev_obj = next(
                (obj for obj in the_account.usage if obj.get('type') == 'video' and obj.get('gg_src') == gg_src),
                None
                )
            if prev_obj is None:
                the_account.usage.append({"time_added":time_added,"type":type,
                                          "gg_src":gg_src,"minutes":minutes})
                the_account.save()
            else:
                prev_obj["minutes"]=prev_obj["minutes"]+minutes
                the_account.save()
                
        
        
        config_data=get_member_usage_remnants(the_account)
        
        
        return JsonResponse({'status': 'success', 'message': 'Updated',"new_state":config_data}, status=200)
      
    return JsonResponse({'status': 'error', 'message': 'Invalid method'}, status=400)