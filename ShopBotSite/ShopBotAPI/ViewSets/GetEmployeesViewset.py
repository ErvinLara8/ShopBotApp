from django.shortcuts import render

from rest_framework.response import Response    
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework.decorators import action
from rest_framework import status
from django.shortcuts import get_object_or_404

from ShopBotAPI.models import Employees
from rest_framework import viewsets, permissions
from ..Serializers.EmployeesSerializer import GetEmployeeSerializer
from ..Serializers.UsersSerializer import GetUsersSerializer
from django.contrib.auth.models import User
from knox.models import AuthToken


class GetEmployeesViewSet(viewsets.ModelViewSet):


    permission_classes = [
        permissions.IsAuthenticated
    ]

    @action(detail = False, methods= ['post'])
    def get_manager_and_store(self, request):
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

            employee_query = Employees.objects.get(user_id__id__contains = frontend['user_ID'])

            full_info = GetEmployeeSerializer(employee_query)

            return JsonResponse(full_info.data, safe=False)
        except Exception as e:
            print(e)
            return JsonResponse({"Error":"Error"}, status=status.HTTP_400_BAD_REQUEST,safe=False)


    @action(detail=True, methods=['get'])
    def fetch_working_employees(self, request, pk=None):

        try:

            queryset = Employees.objects.filter(store_ID = pk, is_working = True)

            serializer = GetEmployeeSerializer(queryset, many=True)

            return JsonResponse(serializer.data, safe=False)
        
        except Exception as e:
            print(e)
            return JsonResponse({"Error":"Error"}, status=status.HTTP_400_BAD_REQUEST,safe=False)


    @action(detail=True, methods=['get'])
    def fetch_off_duty_employees(self, request, pk=None):

        try:

            queryset = Employees.objects.filter(store_ID = pk, is_working = False)

            serializer = GetEmployeeSerializer(queryset, many=True)

            return JsonResponse(serializer.data, safe=False)
        
        except Exception as e:
            print(e)
            return JsonResponse({"Error":"Error"}, status=status.HTTP_400_BAD_REQUEST,safe=False)

     # sending an Order (Post Request)
    @action(detail=True, methods=['post'])
    def update_employee(self, request, pk=None):

        # getting the employee from the Database
        employee = Employees.objects.get(pk=pk)

        employee_update = JSONParser().parse(request)

        employee_serializer = GetEmployeeSerializer(employee, data = employee_update, partial=True)

        if employee_serializer.is_valid():
            employee_serializer.save()

            return JsonResponse(employee_serializer.data, status=status.HTTP_201_CREATED, safe=False)
        
        else:

            return JsonResponse(employee_serializer.errors, status=status.HTTP_400_BAD_REQUEST, safe=False)

