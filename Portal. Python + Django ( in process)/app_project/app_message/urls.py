
from django.urls import path
from . import views

urlpatterns = [
    path('',views.all_theme,name='all_theme'),
    path('tickets',views.all_tickets,name='all_tickets'),
    path('ticket/<int:ticket_id>/', views.ticket_detail, name='ticket_detail'),
    path('create_ticket/', views.create_ticket, name='create_ticket'),
    path('dialogs',views.all_dialogs,name='all_dialogs'),
    path('dialogs/create_dialog',views.create_dialog,name='create_dialog'),
    path('close_ticket/<int:ticket_id>/', views.close_ticket, name='close_ticket'),
    path('dialog/<int:dialog_id>/', views.dialog_detail, name='dialog_detail'),
    path('get-dialog-id/', views.get_dialog_id, name='get_dialog_id'),
    path('search_users_dropdown/', views.search_users_dropdown, name='search_users_dropdown'),
    path('chats/', views.all_chats, name='all_chats'),
    path('create_chat/', views.create_chat, name='create_chat'),
    path('chat/<int:chat_id>/', views.chat_detail, name='chat_detail'),

]
