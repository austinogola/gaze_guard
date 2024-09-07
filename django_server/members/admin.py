from django.contrib import admin
from .models import Member, Account



class MemberAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Member._meta.get_fields()]

admin.site.register(Member, MemberAdmin)
# admin.site.register(Member)
class AccountAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Account._meta.get_fields()]
    
admin.site.register(Account, AccountAdmin)
# admin.site.register(Account)

# Register your models here.
