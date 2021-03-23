from django.shortcuts import render

from rest_framework.response import Response    
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework.decorators import action
from rest_framework import status
from django.shortcuts import get_object_or_404

from rest_framework import viewsets, permissions
from ..models import GroceryStore, StoreListings
from ..Serializers.GroceryStoreSerializer import GetGroceryStoreSerializer
from ..Serializers.StoreListingSerializer import StoreListingSerializer
from ..Serializers.UsersSerializer import GetUsersSerializer, CheckUserSerializer
from django.contrib.auth.models import User
from knox.models import AuthToken


class UserActionsViewSet(viewsets.ModelViewSet):


    permission_classes = [
        permissions.IsAuthenticated
    ]

    @action(detail = False, methods= ['post'])
    def get_user(self, request):
        """
        This method keeps fetching the user, employee and store information for the front end

        input: user_ID

        output: 
            employee_ID,
            user_id: (full Data),
            store_ID: (full Data),
            is_admin,
            is_working
        """
        try:
            frontend = JSONParser().parse(request)

            user_query = User.objects.get(id = frontend['user_ID'])

            full_info = GetUsersSerializer(user_query)

            return JsonResponse(full_info.data, safe=False)
        except Exception as e:
            print(e)
            return JsonResponse({"Error":"Error"}, status=status.HTTP_400_BAD_REQUEST,safe=False)

    
    @action(detail = False, methods= ['post'])
    def search_stores(self, request):
        """
        This method return all the stores in a given zipcode

        input: zipcode

        output: list of stores
        """
        try:
            zipcode_searched = JSONParser().parse(request)

            stores_query = GroceryStore.objects.filter(zipcode = zipcode_searched["zipcode"])

            found_stores = GetGroceryStoreSerializer(stores_query, many=True)

            return JsonResponse(found_stores.data, safe=False)
        except Exception as e:
            print(e)
            return JsonResponse({"Error":"Error"}, status=status.HTTP_400_BAD_REQUEST,safe=False)
    
    @action(detail = False, methods= ['post'])
    def selected_store_listings(self, request):
        """
        This method return all the listings based on a given store

        input: store ID

        output: all listing for that store
        """
        try:
            store_id = JSONParser().parse(request)

            stores_listings = StoreListings.objects.filter(storeID = store_id["store_id"])

            found_listings = StoreListingSerializer(stores_listings, many=True)

            return JsonResponse(found_listings.data, safe=False)
        except Exception as e:
            print(e)
            return JsonResponse({"Error":"Error"}, status=status.HTTP_400_BAD_REQUEST,safe=False)


    