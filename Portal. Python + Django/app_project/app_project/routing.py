
from django.urls import re_path

from app_message import consumers
import logging
logger = logging.getLogger('websockets')
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler())

websocket_urlpatterns = [
    re_path(r"ws/ticket/(?P<ticket_id>\d+)/$", consumers.ChatConsumer.as_asgi()),
    re_path(r"ws/dialog/(?P<dialog_id>\d+)/$", consumers.DialogConsumer.as_asgi()),
    re_path(r"ws/chat/(?P<chat_id>\d+)/$", consumers.Chat1Consumer.as_asgi()),
]