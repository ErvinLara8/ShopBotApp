from rest_framework import routers
from .ViewSets.OrdersAPIViewSet import OrdersViewSet

router = routers.DefaultRouter()
# router.register('api/GroceryStoreAPI', GroceryStoreViewSet, 'groceryStoreAPI')
router.register('api/OrdersAPI', OrdersViewSet, 'ordersAPI')


urlpatterns = router.urls