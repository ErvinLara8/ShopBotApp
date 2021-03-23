from rest_framework import serializers 
from ShopBotAPI.models import Employees
from .GroceryStoreSerializer import GetGroceryStoreSerializer
from .UsersSerializer import GetUsersSerializer, CheckUserSerializer, AddUserSerializer


# Log In Employee
class LogInEmployeeSerializer(serializers.ModelSerializer):

    user_id = CheckUserSerializer()
    store_ID = GetGroceryStoreSerializer()

    class Meta:
        model = Employees
        fields = '__all__'


# Register Employee
class RegisterEmployeeSerializer(serializers.ModelSerializer):

    user_id = AddUserSerializer()

    class Meta:
        model = Employees
        fields = '__all__'


# Get Employee
class GetEmployeeSerializer(serializers.ModelSerializer):

    user_id = GetUsersSerializer()
    store_ID = GetGroceryStoreSerializer()

    class Meta:
        model = Employees
        fields = '__all__'