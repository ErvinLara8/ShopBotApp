from django.shortcuts import render

from rest_framework.response import Response    
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404


from ShopBotAPI.models import Orders, OrderDetails, StoreListings
from rest_framework import viewsets, permissions, status
from ..Serializers.OrderSerializer import GetFullOrdersSerializer, CheckOrAddOrderTableSerializer
from ..Serializers.OrderDetailSerializer import AddOrderDetailSerializer, OrderDetailSerializer
from ..Serializers.StoreListingSerializer import StoreListingSerializer


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

class OrdersViewSet(viewsets.ModelViewSet):


    permission_classes = [
        permissions.IsAuthenticated
    ]


    # List all Order (GET resquest with no ID on url)
    def list(self, request):
        try:
            # # queryset = Orders.objects.all()
            # serializer = GetOrdersSerializer(queryset, many=True)

            serializer = GetFullOrdersSerializer()
            return JsonResponse(serializer.data, safe=False)

        except Exception:
            print(Exception)

    # Getting all User's orders
    @action(detail=False, methods=['get'] )
    def all_users_orders(self, request):

        try:

            queryset = Orders.objects.filter(order_ID=1)     #GOING BACK TO THIS

            serializer = GetFullOrdersSerializer(queryset, many=True)

            return JsonResponse(serializer.data, safe=False)
        
        except Exception:
            print(Exception)

    
    # Getting all completed orders
    @action(detail=True, methods=['get'] )
    def fetching_completed_orders(self, request, pk=None):

        try:

            queryset = Orders.objects.filter(completed=1, store_ID = pk)

            serializer = GetFullOrdersSerializer(queryset, many=True)

            return JsonResponse(serializer.data, safe=False)
        
        except serializer.DoesNotExist:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST,safe=False)

    # Getting all pending orders
    @action(detail=True, methods=['get'] )
    def fetching_pending_orders(self, request, pk=None):

        try:

            queryset = Orders.objects.filter(completed=0, store_ID = pk)

            serializer = GetFullOrdersSerializer(queryset, many=True)
            
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED, safe=False)
        
        except serializer.DoesNotExist:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST,safe=False)

    # sending an Order (Post Request)
    @action(detail=False, methods=['post'])
    def create_order(self, request):
        
        try:
            order_sent = {'order_sent':False}

            # getting the data from the request
            order_data = JSONParser().parse(request)

            # converting the data through the serializer
            order_serializer = CheckOrAddOrderTableSerializer(data=order_data)

            # if valid submit to db and response success else error 
            if order_serializer.is_valid():
                order_serializer.save()

                return JsonResponse(order_serializer.data, status=status.HTTP_201_CREATED, safe=False)
            else: 
                return JsonResponse(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST, safe=False)

        except Exception:
            print(Exception)


    # sending an Order (Post Request)
    @action(detail=False, methods=['post'])
    def add_order_details(self, request):

        detail_data = JSONParser().parse(request)
        many = isinstance(detail_data, list)

        detail_serializer = AddOrderDetailSerializer(data=detail_data, many = many)

        if detail_serializer.is_valid():
            detail_serializer.save()

            return JsonResponse(detail_serializer.data, status=status.HTTP_201_CREATED, safe=False)
        
        else:

            return JsonResponse(detail_serializer.errors, status=status.HTTP_400_BAD_REQUEST, safe=False)

    # sending an Order (Post Request)
    @action(detail=True, methods=['post'])
    def update_order(self, request, pk=None):

        # getting the store from the Database
        order = Orders.objects.get(pk=pk)

        order_update = JSONParser().parse(request)

        order_serializer = CheckOrAddOrderTableSerializer(order, data = order_update, partial=True)

        if order_serializer.is_valid():
            order_serializer.save()

            return JsonResponse(order_serializer.data, status=status.HTTP_201_CREATED, safe=False)
        
        else:

            return JsonResponse(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST, safe=False)

    # def testing(self, request):

    #     queryset = Orders.objects.filter(completed=1)
    #     serializer = GetFullOrdersSerializer(queryset, many = True)

    #     # print(serializer.data[0]['order_ID']) #!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    #     return JsonResponse(serializer.data, safe=False)
