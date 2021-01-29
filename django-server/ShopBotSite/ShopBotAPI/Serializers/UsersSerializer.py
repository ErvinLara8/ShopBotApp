from django.contrib.auth.models import User
from rest_framework import serializers 

# used to get user excluding passwrod 
class GetUsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'last_login', 'username', 'first_name', 'last_name', 'email']

# used to add user
class AddUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

# used to check user
class CheckUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'password', 'last_login', 'username', 'is_superuser', 'first_name', 'last_name', 'email',  'is_staff',]

