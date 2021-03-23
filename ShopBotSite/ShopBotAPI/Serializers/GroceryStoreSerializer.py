from rest_framework import serializers 
from ShopBotAPI.models import GroceryStore

# Gets Grocery Store without password 
class GetGroceryStoreSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = GroceryStore
        fields = ['store_ID', 'name', 'email', 'street', 'city', 'state', 'zipcode']


# Used to add or check grocery store
class CheckOrAddGroceryStore(serializers.ModelSerializer):

    class Meta:
        model = GroceryStore
        fields = '__all__'
