from rest_framework import serializers 
from ShopBotAPI.models import Employees
from .GroceryStoreSerializer import GroceryStoreSerializer

# Gets employee without password and with store description 
class GetEmployeesSerializer(serializers.ModelSerializer):

    employed_store = GroceryStoreSerializer()

    class Meta:
        model = Employees
        fields = ['employee_ID', 'employed_store', 'first_name', 'last_name']


# Used to add employee or check employee witout only store id
class CheckOrAddEmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employees
        fields = '__all__'
