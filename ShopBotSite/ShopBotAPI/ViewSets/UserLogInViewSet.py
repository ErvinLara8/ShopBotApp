from django.shortcuts import render

from rest_framework.response import Response    
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework.decorators import action
from rest_framework import status
from django.shortcuts import get_object_or_404

from rest_framework import viewsets, permissions
from ..Serializers.EmployeesSerializer import LogInEmployeeSerializer, RegisterEmployeeSerializer, GetEmployeeSerializer
from ..Serializers.GroceryStoreSerializer import GetGroceryStoreSerializer
from ..Serializers.UsersSerializer import CheckUserSerializer, GetUsersSerializer, AddUserSerializer
from django.contrib.auth.models import User
from knox.models import AuthToken



class UserLogInViewSet(viewsets.ModelViewSet):

    @action(detail=False, methods=['post'])
    def user_log_in(self, request):
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
            user_query = User.objects.filter(email = log_in_info['email'])

            # checking if user exist 
            if len(user_query) != 0:

                user_serializer = CheckUserSerializer(user_query[0])

                # checking credentials of employee
                if user_serializer.data["password"] == log_in_info["password"]:

                    user_info_no_pass = GetUsersSerializer(user_query[0])

                    log_response['valid'] = True
                    log_response['user_info'] = user_info_no_pass.data
                    log_response['token'] = AuthToken.objects.create(user_query[0])[1]

                    return JsonResponse(log_response, status=status.HTTP_200_OK, safe=False)
                
                else:
                    return JsonResponse(log_response, status=status.HTTP_400_BAD_REQUEST, safe=False)

            else: 
                return JsonResponse(log_response, status=status.HTTP_400_BAD_REQUEST, safe=False)
        
        except Exception as e:
            print(e)
            return JsonResponse({"Error":"Error"}, status=status.HTTP_400_BAD_REQUEST,safe=False)

    @action(detail=False, methods=['post'])
    def create_user(self, request):

        try:

            # Getting user data 
            user_info = JSONParser().parse(request)

            # convertinf data through serializer
            user_serializer = AddUserSerializer(data = user_info)

            if user_serializer.is_valid():
                user_serializer.save()

                return JsonResponse(user_serializer.data, status=status.HTTP_201_CREATED, safe=False)
            else:
                print(user_serializer.errors)
                return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST, safe=False)
        
        except Exception as e:
            print(e)
            return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST, safe=False)
