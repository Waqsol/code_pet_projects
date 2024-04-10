from django.contrib.auth import  get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView, PasswordChangeView
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse, reverse_lazy

from .models import Users
from .forms import RegisterUsersForm, UpdateUsersForm, LoginUserForm, ProfileUserForm, UserPasswordChangeForm
from django.views.generic import DetailView, UpdateView, DeleteView, CreateView
from app_message.models import Dialogs


class Profile(LoginRequiredMixin,UpdateView):
    model = get_user_model()
    form_class = ProfileUserForm
    template_name = 'app_users/profile.html'
    context_object_name = 'user'
    extra_context = {'title':"Профиль пользователя"}

    def get_success_url(self):
        return reverse_lazy('profile')
    def get_object(self, queryset=None):
        return self.request.user



@login_required
def all_users(request):
    all_users = Users.objects.exclude(username='admin')
    return render(request, 'app_users/all_users.html', {'all_users': all_users})


class LoginUser(LoginView):
    form_class = LoginUserForm
    template_name = 'app_users/login.html'
    extra_context = {'title':'Авторизация'}


class Register(CreateView):
    form_class = RegisterUsersForm
    template_name = 'app_users/register.html'
    extra_context = {'title': 'Регистрация'}
    success_url = reverse_lazy('login')

@login_required
def Update(request, pk):
    user = get_object_or_404(get_user_model(), pk=pk)
    if request.method == 'POST':
        form = UpdateUsersForm(request.POST, instance=user)
        if form.is_valid():
            form.save()
            print('Профиль успешно обновлен.')
            return redirect(reverse('profile', args=[pk]))
    else:
        form = UpdateUsersForm(instance=user)
    return render(request, 'app_users/update_user.html', {'form': form})


class UserPasswordChange(PasswordChangeView):
    form_class = UserPasswordChangeForm
    success_url = reverse_lazy("password_change_done")
    template_name = "app_users/password_change_form.html"



