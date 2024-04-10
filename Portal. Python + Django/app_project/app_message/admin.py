from django.contrib import admin

from .models import Tickets, Message_ticket, Dialogs, Message_dialog, Chat, ChatUser, ChatMessage

admin.site.register(Tickets)
admin.site.register(Message_ticket)
admin.site.register(Dialogs)
admin.site.register(Message_dialog)
admin.site.register(Chat)
admin.site.register(ChatUser)
admin.site.register(ChatMessage)
