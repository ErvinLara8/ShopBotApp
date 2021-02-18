from rest_framework import serializers 
from ShopBotAPI.models import StoreListings
from .ProductDetailsSerializer import ProductDetailsSerializer


# used to get Store listing 
class StoreListingSerializer(serializers.ModelSerializer):

    product_ID = ProductDetailsSerializer()

    class Meta:
        model = StoreListings
        fields = ['listing_ID','product_ID', 'price', 'quantity']


# used to add listing
class AddStoreListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreListings
        fields = '__all__'
