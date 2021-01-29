# from django.shortcuts import render

# from django.http.response import JsonResponse
# from rest_framework.parsers import JSONParser 
# from rest_framework.decorators import action
# from rest_framework import status
# from django.shortcuts import get_object_or_404


# from ShopBotAPI.models import GroceryStore, Orders
# from rest_framework import viewsets, permissions
# from .Serializers.GetOrdersSerializer import GetOrdersSerializer
# from .Serializers.PostOrderSerializer import PostOrdersSerializer


"""
A viewset is a simplified class of views, by default when routing a viewset we get the default CRUD methods list, create, retrieve, update, partial update, and delete
these are routed by default depending on the HTTP method sent to the viewset on the router

if we want to add a method to the view set we need to use the @action decorator on top of the method
In the @action decorator we can define the following:

    detail: when true it mean we are returning one item
            when false it means we are returning multiple items

    methos: the http protocol (by default GET)

    override any viewset-level configuration

once the action is set, the url becomes the url-name/method-name

for more info go to https://www.django-rest-framework.org/api-guide/routers/#usage and https://www.django-rest-framework.org/api-guide/viewsets/

"""


# class GroceryStoreViewSet(viewsets.ModelViewSet):


#     def list(self, request):
#         queryset = GroceryStore.objects.all()
#         serializer = GroceryStoreSerializer(queryset, many=True)
#         return JsonResponse(serializer.data, safe=False)

#     def create(self, request):

#         # REMEMBER TO CONVER INTS TO DECIMALS FOR PRICES 

#         # getting the data from the request
#         grocery_store_data = JSONParser().parse(request)

#         # converting the data through the serializer
#         grocery_store_serializer = GroceryStoreSerializer(data=grocery_store_data)

#         # if valid submit to db and response success else error 
#         if grocery_store_serializer.is_valid():
#             grocery_store_serializer.save()
#             return JsonResponse(grocery_store_serializer.data, status=status.HTTP_201_CREATED, safe=False)
#         else: 
#             return JsonResponse(grocery_store_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     # retriving by single id
#     def retrieve(self, request, pk=None):

#         try:

#             # getting the store from the Database
#             store = GroceryStore.objects.get(pk=pk)
            
#             # Translating the database data to python data 
#             store_serializer = GroceryStoreSerializer(store)

#             # print()
#             # print()
#             # print(store_serializer['storeProducts'])
#             # print()
#             # print()

#             # returning the store to frontend
#             return JsonResponse(store_serializer.data, safe=False)
            
#         except GroceryStore.DoesNotExist:
#             return JsonResponse({'message': 'GroceryStore does not exist'}, status = status.HTTP_404_NOT_FOUND)

#     def update(self, request, pk=None):
#         pass

#     def partial_update(self, request, pk=None):
#         pass

#     def destroy(self, request, pk=None):
#         pass

#     @action(detail=False, methods=['get'] )
#     def get_hi(self, request, pk=None):
#         return JsonResponse({'hi':"hi"}, safe=False)

#     @action(detail=True, methods=['post'] )
#     def add_order_to_store(self, request, pk=None):

#         try:

#             incoming_order = JSONParser().parse(request) 

#             # getting the store from the Database
#             store = GroceryStore.objects.get(pk=pk)
            
#             # Translating the database data to python data 
#             store_serializer = GroceryStoreSerializer(store, data= incoming_order)

#             if store_serializer.is_valid():
#                 store_serializer.save()
#                 return JsonResponse(store_serializer.data, status=status.HTTP_201_CREATED, safe=False)
#             else: 
#                 return JsonResponse(store_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#             # returning the store to frontend
#             return JsonResponse(store_serializer.data, safe=False)
            
#         except GroceryStore.DoesNotExist:
#             return JsonResponse({'message': 'GroceryStore does not exist'}, status = status.HTTP_404_NOT_FOUND)
