from django.shortcuts import render

from rest_framework.response import Response    
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404


from ShopBotAPI.models import StoreListings, ProductDetails, Categories
from rest_framework import viewsets, permissions, status
from ..Serializers.ProductDetailsSerializer import AddProductSerializer, ProductDetailsSerializer
from ..Serializers.StoreListingSerializer import StoreListingSerializer, AddStoreListingSerializer
from ..Serializers.CategoriesSerializer import CategoriesSerializer

class ProductsViewSet(viewsets.ModelViewSet):

    permission_classes = [
        permissions.IsAuthenticated
    ]

    @action(detail = True, methods= ['get'])
    def fetch_listings(self, request, pk=None):
        try:
            listing_query = StoreListings.objects.filter(storeID = pk)

            listing_serializer = StoreListingSerializer(listing_query, many = True)

            return JsonResponse(listing_serializer.data, status=status.HTTP_200_OK, safe=False)

        except Exception as e:
            print(e)
            return JsonResponse({"Error":"Error"}, status=status.HTTP_400_BAD_REQUEST,safe=False)

    @action(detail = False, methods= ['get'])
    def fetch_products(self, request):
        try:
            product_query = ProductDetails.objects.all()

            products_serializer = ProductDetailsSerializer(product_query, many=True)

            return JsonResponse(products_serializer.data, status=status.HTTP_200_OK, safe=False)

        except Exception as e:
            print(e)
            return JsonResponse({"Error":"Error"}, status=status.HTTP_400_BAD_REQUEST,safe=False)

    @action(detail = False, methods= ['post'])
    def add_listing(self, request):

        try:
            listing_data = JSONParser().parse(request)

            listing_serializer = AddStoreListingSerializer(data=listing_data)

            if listing_serializer.is_valid():
                listing_serializer.save()
                return JsonResponse(listing_serializer.data, status=status.HTTP_201_CREATED, safe=False)
            
            else:
                return JsonResponse(listing_serializer.errors, status=status.HTTP_400_BAD_REQUEST, safe=False)
        except Exception as e:
            print(e)
            return JsonResponse({"Error":"Error"}, status=status.HTTP_400_BAD_REQUEST,safe=False)


    @action(detail = False, methods= ['post'])
    def add_product_detail(self, request):

        try:

            product_data = JSONParser().parse(request)

            product_serializer = AddProductSerializer(data=product_data)

            if product_serializer.is_valid():
                product_serializer.save()
                return JsonResponse(product_serializer.data, status=status.HTTP_201_CREATED, safe=False)
            
            else:

                return JsonResponse(product_serializer.errors, status=status.HTTP_400_BAD_REQUEST, safe=False)
            
        except Exception as e:
            print(e)
            return JsonResponse({"Error":"Error"}, status=status.HTTP_400_BAD_REQUEST,safe=False)

    @action(detail = False, methods= ['get'])
    def fetch_categories(self, request):
        try:
            category_query = Categories.objects.all()

            category_serializer = CategoriesSerializer(category_query, many = True)

            return JsonResponse(category_serializer.data, status=status.HTTP_200_OK, safe=False)

        except Exception as e:
            print(e)
            return JsonResponse({"Error":"Error"}, status=status.HTTP_400_BAD_REQUEST,safe=False)