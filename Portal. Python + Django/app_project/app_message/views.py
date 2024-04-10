import base64
import logging
from datetime import timezone

from asgiref.sync import async_to_sync
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Q
from django.http import Http404, JsonResponse, HttpResponseBadRequest, HttpResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.views.decorators.http import require_GET

from .models import Tickets, Message_ticket, Dialogs, Message_dialog, Chat, ChatUser, ChatMessage
from .forms import TicketForm, MessageForm, CreateDialogForm, MessageDialogForm, ChatMessageForm
from app_users.models import Users

import logging
logger = logging.getLogger('websockets')
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler())
def all_theme(request):
    return render(request, 'app_message/all_theme.html')
def all_tickets(request):
    all_tickets=Tickets.objects.all().order_by('dedline_date')
    return render(request, 'app_message/all_tickets.html', {'all_tickets': all_tickets})
def all_dialogs(request):
    all_dialogs = Dialogs.objects.all()
    return render(request, 'app_message/all_dialogs.html', {'all_dialogs': all_dialogs})


@login_required
def ticket_detail(request, ticket_id):
    ticket = get_object_or_404(Tickets, pk=ticket_id)
    # Проверяем, имеет ли пользователь доступ к этому тикету
    if request.user != ticket.sender and request.user != ticket.receiver:
        raise Http404("У вас нет доступа к этому тикету.")
    # Получаем все сообщения, связанные с этим тикетом
    messages = Message_ticket.objects.filter(ticket=ticket).order_by('date')
    if request.method == 'POST':
        form = MessageForm(request.POST,request.FILES)
        if form.is_valid():
            # Сохраняем сообщение
            message = form.save(commit=False)
            message.ticket = ticket
            message.sender = request.user
            message.save()

            # Обновляем статус тикета
            ticket.update_status()

            # Возвращаем данные нового сообщения в формате JSON
            data = {
                'sender_first_name': message.sender.first_name,
                'sender_last_name': message.sender.last_name,
                'message': message.content,
                'image': message.image
            }
            return JsonResponse(data)
    else:
        form = MessageForm(initial={'ticket': ticket_id, 'sender': request.user})

    if request.user == ticket.sender and ticket.status != 'Закрыт':
        close_button = True
    else:
        close_button = False

    return render(request, 'app_message/ticket_detail.html', {'ticket': ticket, 'form': form, 'messages': messages, 'close_button': close_button})



@login_required
def dialog_detail(request, dialog_id):
    dialog = get_object_or_404(Dialogs, pk=dialog_id)

    if request.user != dialog.first_owner and request.user != dialog.second_owner:
        raise Http404("У вас нет доступа к этому диалогу.")

    messages = Message_dialog.objects.filter(dialog=dialog).order_by('date')

    if request.method == 'POST':
        form = MessageDialogForm(request.POST, request.FILES)  # Обработка файлов из POST-запроса
        if form.is_valid():
            message = form.save(commit=False)
            message.dialog = dialog
            message.sender = request.user

            if 'image' in request.FILES:  # Проверяем, загружено ли изображение
                image = request.FILES['image']
                message.image.save(image.name, image)
                if not image.content_type.startswith('image'):
                    return JsonResponse({'error': 'Тип файла не поддерживается. Пожалуйста, загрузите изображение.'},
                                        status=400)
            message.save()
            print(message.image.url,'1111')
            data = {
                'sender_first_name': message.sender.first_name,
                'sender_last_name': message.sender.last_name,
                'message': message.content,
                'image': message.image.url
            }
            return JsonResponse(data)
    else:
        form = MessageDialogForm(initial={'dialog': dialog_id, 'sender': request.user})

    return render(request, 'app_message/dialog_detail.html', {'dialog': dialog, 'form': form, 'messages': messages})

@login_required
def create_ticket(request):
    current_user_id = request.user.id
    if request.method == 'POST':
        form = TicketForm(request.POST, initial={'user': request.user})
        if form.is_valid():
            form.save()
            return redirect('all_tickets')
    else:
        form = TicketForm(initial={'user': request.user})

    return render(request, 'app_message/create_ticket.html', {'form': form, 'current_user_id': current_user_id})

@login_required
def create_dialog(request):
    if request.method == 'POST':
        form = CreateDialogForm(request.POST, initial={'user': request.user})
        if form.is_valid():
            dialog = form.save(commit=False)
            dialog.save()
            return redirect('all_dialogs')
    else:
        form = CreateDialogForm(initial={'user': request.user})

    return render(request, 'app_message/create_dialog.html', {'form': form, 'current_user_id': request.user.id})

def close_ticket(request, ticket_id):
    if request.method == 'POST':
        try:
            ticket = Tickets.objects.get(id=ticket_id)
            ticket.close_ticket()
            return JsonResponse({'success': True})
        except Tickets.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Ticket not found'})
    else:
        return JsonResponse({'success': False, 'error': 'Method not allowed'}, status=405)

def get_dialog_id(request):
    user_id = request.GET.get('user_id')
    try:
        dialog = Dialogs.objects.filter(
            (Q(first_owner=user_id) & Q(second_owner=request.user)) |
            (Q(first_owner=request.user) & Q(second_owner=user_id))
        ).first()
        if dialog:
            return JsonResponse({'dialog_id': dialog.id})
        else:
            return JsonResponse({'dialog_id': None})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@require_GET
def search_users_dropdown(request):
    term = request.GET.get('term')
    users = Users.objects.filter(first_name__icontains=term) | Users.objects.filter(last_name__icontains=term)
    results = [{'id': user.id, 'text': f"{user.first_name} {user.last_name}"} for user in users]
    return JsonResponse(results, safe=False)


def all_chats(request):
    all_chats = Chat.objects.all()
    return render(request, 'app_message/all_chats.html', {'all_chats': all_chats})

@login_required
def create_chat(request):
    if request.method == 'POST':
        # Получаем данные из формы
        title = request.POST.get('title')
        users_ids = request.POST.getlist('users')

        # Создаем беседу, учитывая текущего пользователя
        chat = Chat.objects.create(title=title)

        # Создаем записи в таблице ChatUser для каждого выбранного пользователя
        for user_id in users_ids:
            user = Users.objects.get(pk=user_id)
            ChatUser.objects.create(user=user, chat=chat)

        # После создания беседы перенаправляем пользователя на страницу всех бесед
        return redirect('all_chats')
    else:
        # Если метод запроса GET, отображаем форму создания беседы
        # Передаем текущего пользователя в шаблон
        current_user = request.user
        return render(request, 'app_message/create_chat.html', {'current_user': current_user})


@login_required
def chat_detail(request, chat_id):
    chat = get_object_or_404(Chat, pk=chat_id)
    messages = chat.messages.all()
    user = request.user

    # Проверяем, есть ли пользователь в списке участников беседы
    if not chat.users.filter(user=user).exists():
        raise Http404("У вас нет доступа к этой беседе.")

    if request.method == 'POST':
        form = ChatMessageForm(request.POST, request.FILES)
        if form.is_valid():
            message = form.save(commit=False)
            message.chat = chat
            message.sender = request.user

            # Сохранение изображения, если оно было прикреплено
            image = request.FILES.get('image')
            if image:
                if not image.content_type.startswith('image'):
                    return JsonResponse({'error': "Тип файла не поддерживается"}, status=400)
                message.image.save(image.name, image)

            # Если сообщение содержит только текст и не содержит изображения,также сохраняем его
            if not message.content and not message.image:
                return JsonResponse({'error': "Сообщение не может быть пустым"}, status=400)

            message.save()

            data = {
                'sender_first_name': message.sender.first_name,
                'sender_last_name': message.sender.last_name,
                'message': message.content,
                'image': message.image.url if message.image else None
            }

            return JsonResponse(data)
    else:
        form = ChatMessageForm(initial={'chat': chat, 'sender': request.user})

    return render(request, 'app_message/chat_detail.html', {'chat': chat, 'messages': messages, 'form': form})