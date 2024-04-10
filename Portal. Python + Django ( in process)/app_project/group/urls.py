from django.urls import path
from . import views
urlpatterns = [
    path('',views.all_group,name='all_group'),
    path('create_group',views.create_group,name='create_group'),
    path('<int:group_id>/', views.group_details, name='group_details'),
    path('<int:pk>/delete', views.GroupDelete.as_view(), name='group_delete'),
    path('<int:pk>/update', views.GroupUpdate.as_view(), name='group_update')
]
