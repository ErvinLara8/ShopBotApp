from rest_framework import serializers 
from ShopBotAPI.models import Categories

# Gets or adds all categories
class CategoriesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Categories
        fields = '__all__'