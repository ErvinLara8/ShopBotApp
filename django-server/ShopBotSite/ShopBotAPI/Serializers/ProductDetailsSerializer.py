from rest_framework import serializers 
from ShopBotAPI.models import ProductDetails
from .CategoriesSerializer import CategoriesSerializer

# Used to Get Product Details
class ProductDetailsSerializer(serializers.ModelSerializer):

    category_ID = CategoriesSerializer()

    class Meta:
        model = ProductDetails
        fields = '__all__'
    
# Used to add Product Details
class AddProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductDetails
        fields = '__all__'