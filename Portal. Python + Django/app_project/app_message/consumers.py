import base64
import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.ticket_id = self.scope["url_route"]["kwargs"]["ticket_id"]
        self.ticket_group_name = f"ticket_{self.ticket_id}"
        async_to_sync(self.channel_layer.group_add)(
            self.ticket_group_name, self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.ticket_group_name, self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        sender_first_name = text_data_json["sender_first_name"]
        sender_last_name = text_data_json["sender_last_name"]

        async_to_sync(self.channel_layer.group_send)(
            self.ticket_group_name, {"type": "chat_message", "message": message,"sender_first_name": sender_first_name,
                "sender_last_name": sender_last_name}
        )

    def chat_message(self, event):
        message = event["message"]
        sender_first_name = event["sender_first_name"]
        sender_last_name = event["sender_last_name"]

        self.send(text_data=json.dumps({"message": message,"sender_first_name": sender_first_name,
            "sender_last_name": sender_last_name}))

class DialogConsumer(WebsocketConsumer):
    def connect(self):
        self.dialog_id = self.scope["url_route"]["kwargs"]["dialog_id"]
        self.dialog_group_name = f"dialog_{self.dialog_id}"
        async_to_sync(self.channel_layer.group_add)(
            self.dialog_group_name, self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.dialog_group_name, self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        print("Received message:", text_data_json)
        message = text_data_json["message"]
        sender_first_name = text_data_json["sender_first_name"]
        sender_last_name = text_data_json["sender_last_name"]
        image_url = text_data_json.get("image_url")
        async_to_sync(self.channel_layer.group_send)(
            self.dialog_group_name, {
                "type": "dialog_message",
                "message": message,
                "sender_first_name": sender_first_name,
                "sender_last_name": sender_last_name,
                "image_url" : image_url
            }
        )

    def dialog_message(self, event):
        print(event)
        message = event["message"]
        sender_first_name = event["sender_first_name"]
        sender_last_name = event["sender_last_name"]
        image_url = event.get("image_url")
        self.send(text_data=json.dumps({
            "message": message,
            "sender_first_name": sender_first_name,
            "sender_last_name": sender_last_name,
            "image_url": image_url
        }))


class Chat1Consumer(WebsocketConsumer):
    def connect(self):
        self.chat_id = self.scope["url_route"]["kwargs"]["chat_id"]
        self.chat_group_name = f"chat_{self.chat_id}"
        async_to_sync(self.channel_layer.group_add)(
            self.chat_group_name, self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.chat_group_name, self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        sender_first_name = text_data_json["sender_first_name"]
        sender_last_name = text_data_json["sender_last_name"]
        image_url = text_data_json.get("image_url")
        async_to_sync(self.channel_layer.group_send)(
            self.chat_group_name, {
                "type": "chat_message",
                "message": message,
                "sender_first_name": sender_first_name,
                "sender_last_name": sender_last_name,
                "image_url": image_url
            }
        )

    def chat_message(self, event):
        message = event["message"]
        sender_first_name = event["sender_first_name"]
        sender_last_name = event["sender_last_name"]
        image_url = event.get("image_url")
        self.send(text_data=json.dumps({
            "message": message,
            "sender_first_name": sender_first_name,
            "sender_last_name": sender_last_name,
            "image_url": image_url
        }))