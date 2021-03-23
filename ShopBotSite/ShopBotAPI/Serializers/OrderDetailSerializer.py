from rest_framework import serializers 
from ShopBotAPI.models import OrderDetails
from .StoreListingSerializer import StoreListingSerializer


# Used to get detail with listing 
class OrderDetailSerializer(serializers.ModelSerializer):

    listing_ID = StoreListingSerializer()

    class Meta:
        model = OrderDetails
        fields = '__all__'

# used to add detail with id
class AddOrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetails
        fields = '__all__'