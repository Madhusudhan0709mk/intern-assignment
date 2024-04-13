# from rest_framework.routers import DefaultRouter
# from .views import TodoViewSet
# from django.urls import path,include

# router = DefaultRouter()
# router.register(r'', TodoViewSet)


# urlpatterns = [
#     path('', include(router.urls))
# ]

from django.urls import path
from .views import TodoListCreate, TodoRetrieveUpdateDestroy

urlpatterns = [
    path('todos/', TodoListCreate.as_view(), name='todo-list-create'),
    path('todos/<int:pk>/', TodoRetrieveUpdateDestroy.as_view(), name='todo-detail'),
]

