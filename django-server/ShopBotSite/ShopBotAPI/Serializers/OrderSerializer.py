from rest_framework import serializers 
from .GroceryStoreSerializer import GetGroceryStoreSerializer
from .UsersSerializer import GetUsersSerializer
from .OrderDetailSerializer import OrderDetailSerializer
from ShopBotAPI.models import  Orders

# used to check or add to Orders Table with out specifics only ID's
class CheckOrAddOrderTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = '__all__'

# Used to get full order with full details on every ID
class GetFullOrdersSerializer(serializers.ModelSerializer):

    user_ID = GetUsersSerializer()
    store_ID = GetGroceryStoreSerializer()
    order_list = OrderDetailSerializer(many=True)

    class Meta:
        model = Orders
        fields = '__all__'
