from rest_framework import serializer
from ShopBotAPI.models import GroceryStore


class GroceryStoreSerializer(serializer.ModelSerializer):
    class Meta:
        model = GroceryStore
        fields = '__all__'