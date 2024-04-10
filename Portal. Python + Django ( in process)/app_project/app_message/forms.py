from django import forms
from .models import Tickets, Message_ticket, Dialogs, Message_dialog, ChatMessage
from app_users.models import Users

class TicketForm(forms.ModelForm):
    class Meta:
        model = Tickets
        fields = ['sender', 'receiver', 'theme', 'dedline_date']
        widgets = {
            'dedline_date': forms.DateInput(attrs={'type': 'date'}),
        }

    def __init__(self, *args, **kwargs):
        super(TicketForm, self).__init__(*args, **kwargs)
        user = kwargs.get('initial', {}).get('user')
        if user:
            self.fields['sender'].initial = user
            self.fields['sender'].widget.attrs['style'] = 'display: none;'
            self.fields['sender'].label = ''
            self.fields['receiver'].queryset = Users.objects.exclude(id=user.id)

class MessageForm(forms.ModelForm):
    class Meta:
        model = Message_ticket
        fields = ['ticket', 'sender', 'content', 'date']
        widgets = {
            'content': forms.TextInput(attrs={'id': 'chat-message-input'})
        }

class CreateDialogForm(forms.ModelForm):
    class Meta:
        model = Dialogs
        fields = ['first_owner', 'second_owner']

    def __init__(self, *args, **kwargs):
        super(CreateDialogForm, self).__init__(*args, **kwargs)
        user = kwargs.get('initial', {}).get('user')
        if user:
            self.fields['first_owner'].disabled = True
            self.fields['first_owner'].initial = user
            self.fields['first_owner'].widget.attrs['style'] = 'display:none;'
            self.fields['first_owner'].label = ''  # Убираем метку для поля first_owner
            self.fields['second_owner'].queryset = Users.objects.exclude(id=user.id)

    def clean(self):
        cleaned_data = super().clean()
        first_owner = cleaned_data.get('first_owner')
        second_owner = cleaned_data.get('second_owner')

        if second_owner:
            if Dialogs.objects.filter(first_owner=first_owner, second_owner=second_owner).exists() or \
               Dialogs.objects.filter(first_owner=second_owner, second_owner=first_owner).exists():
                raise forms.ValidationError("Диалог уже существует для выбранных пользователей.")
        return cleaned_data

    def label_from_instance(self, obj):
        return f"{obj.first_name} {obj.last_name}"

class MessageDialogForm(forms.ModelForm):
    class Meta:
        model = Message_dialog
        fields = ['dialog', 'sender', 'content', 'image']
        widgets = {
            'content': forms.TextInput(attrs={'id': 'chat-message-input'})
        }

class ChatMessageForm(forms.ModelForm):
    class Meta:
        model = ChatMessage
        fields = ['chat','sender','content', 'image']
        widgets = {
            'content': forms.TextInput(attrs={'id': 'chat-message-input'})
        }