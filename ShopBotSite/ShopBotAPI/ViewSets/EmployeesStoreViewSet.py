from django.shortcuts import render

from rest_framework.response import Response    
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework.decorators import action
from rest_framework import status
from django.shortcuts import get_object_or_404

from ShopBotAPI.models import Employees, GroceryStore
from rest_framework import viewsets, permissions
from ..Serializers.EmployeesSerializer import LogInEmployeeSerializer, RegisterEmployeeSerializer, GetEmployeeSerializer
from ..Serializers.GroceryStoreSerializer import GetGroceryStoreSerializer
from ..Serializers.UsersSerializer import GetUsersSerializer
from django.contrib.auth.models import User
from knox.models import AuthToken



class EmployeesStoreViewSet(viewsets.ModelViewSet):

    @action(detail=False, methods=['post'])
    def grocery_admin_log_in(self, request):
        """
        The purpose of this method is to log in an admin of the grocery store

        Incoming data from front end: 
            manager email,
            store_ID,
            password

        Response from log in: 
            valid (valid log in),
            user_info (Employee who log in details),
            store_info (All info about current store),
            token (for authentication)
        """

        try:
            log_response = {'valid': False}

            log_in_info = JSONParser().parse(request)

            # Getting employee info by searching by attribute of foreing key user_id
            employee_query = Employees.objects.filter(user_id__email__contains = log_in_info['email'])

            # checking if user exist 
            if len(employee_query) != 0:

                employee_serializer = LogInEmployeeSerializer(employee_query[0])

                # checking credentials of employee
                if employee_serializer.data["store_ID"]["store_ID"] == log_in_info["store_ID"] and employee_serializer.data["user_id"]["password"] == log_in_info["password"] and employee_serializer.data["is_admin"] == True:

                    user_query = User.objects.filter(id = employee_serializer.data["user_id"]["id"])
                    user_serializer = GetUsersSerializer(user_query[0])

                    log_response['valid'] = True
                    log_response['user_info'] = user_serializer.data
                    log_response['store_info'] = employee_serializer.data["store_ID"]
                    log_response['token'] = AuthToken.objects.create(user_query[0])[1]

                    return JsonResponse(log_response, status=status.HTTP_200_OK, safe=False)
                
                else:
                    return JsonResponse(log_response, status=status.HTTP_400_BAD_REQUEST, safe=False)

            else: 
                return JsonResponse(log_response, status=status.HTTP_400_BAD_REQUEST, safe=False)
        
        except Exception as e:
            print(e)
            return JsonResponse({"Error":"Error"}, status=status.HTTP_400_BAD_REQUEST,safe=False)
