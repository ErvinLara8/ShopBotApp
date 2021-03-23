from rest_framework import routers
from django.urls import include, path
from .ViewSets.OrdersAPIViewSet import OrdersViewSet
from .ViewSets.EmployeesStoreViewSet import EmployeesStoreViewSet
from .ViewSets.GetEmployeesViewset import GetEmployeesViewSet
from .ViewSets.ProductsViewSet import ProductsViewSet
from .ViewSets.UserLogInViewSet import UserLogInViewSet
from .ViewSets.UserActionsViewSet import UserActionsViewSet


router = routers.DefaultRouter()
router.register('api/auth/EmployeesStoreAPI', EmployeesStoreViewSet, 'employeeStoreAPI')
router.register('api/auth/GetEmployeesAPI', GetEmployeesViewSet, 'getEmployeeAPI')
router.register('api/auth/OrdersAPI', OrdersViewSet, 'ordersAPI')
router.register('api/auth/ProductsAPI', ProductsViewSet, 'productsAPI')
router.register('api/auth/UserLogInAPI', UserLogInViewSet, 'userLogInAPI')
router.register('api/auth/UserActionsAPI', UserActionsViewSet, 'userActionsAPI')


urlpatterns = router.urls