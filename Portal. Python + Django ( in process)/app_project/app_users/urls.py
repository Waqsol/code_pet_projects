from django.contrib.auth.views import LogoutView, PasswordChangeView, PasswordChangeDoneView, PasswordResetView, \
    PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView
from django.urls import path, reverse_lazy
from . import  views

urlpatterns = [
    path('',views.all_users,name='all_users'),
    path('profile/', views.Profile.as_view(), name='profile'),
    path('profile/update_profile/', views.Update, name='profile_update'),
    path('login/',views.LoginUser.as_view(),name='login'),
    path('logout/',LogoutView.as_view(),name='logout'),
    path('register/',views.Register.as_view(),name='register'),
    path('password-change/',views.UserPasswordChange.as_view(),name='password_change'),
    path('password-change/done',PasswordChangeDoneView.as_view(template_name="app_users/password_change_done.html"),name='password_change_done'),
    path('password-reset/',PasswordResetView.as_view(template_name="app_users/password_reset_form.html",success_url=reverse_lazy('password_reset_done')),name='password_reset'),
    path('password-reset/done',PasswordResetDoneView.as_view(template_name="app_users/password_reset_done.html"),name='password_reset_done'),
    path('password-reset/<uidb64>/<token>',PasswordResetConfirmView.as_view(template_name="app_users/password_reset_confirm.html",success_url=reverse_lazy('password_reset_complete')),name='password_reset_confirm'),
    path('password-reset/complete',PasswordResetCompleteView.as_view(template_name="app_users/password_reset_complete.html"),name='password_reset_complete'),
]
