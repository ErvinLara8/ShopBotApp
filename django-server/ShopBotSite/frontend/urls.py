from django.urls import path, re_path
from . import views

# This wrapper turns your list into a regex URL matcher
react_views_regex = r'\/|\b'.join([

    # List all your react routes here
    'OrdersPage',

]) + r'\/'


urlpatterns = [
    path('', views.index),

    re_path(react_views_regex, views.index),
]