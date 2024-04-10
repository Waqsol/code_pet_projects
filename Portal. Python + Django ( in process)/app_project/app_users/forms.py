from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordChangeForm
from django.core.validators import RegexValidator, EmailValidator
from django.forms import Select, forms, DateInput
from django import  forms


class RegisterUsersForm(UserCreationForm):
    username = forms.CharField(label='Username')
    password1 = forms.CharField(label='Пароль',widget=forms.PasswordInput())
    password2 = forms.CharField(label='Повтор пароля', widget=forms.PasswordInput())
    email = forms.EmailField(label='Почта', validators=[EmailValidator(message='Некорректный адрес электронной почты')])
    first_name = forms.CharField(label='Имя', validators=[
        RegexValidator(regex='^[A-Za-zА-Яа-я]*$', message='Имя может содержать только буквы')
    ])
    last_name = forms.CharField(label='Фамилия', validators=[
        RegexValidator(regex='^[A-Za-zА-Яа-я]*$', message='Фамилия может содержать только буквы')
    ])
    role = forms.ChoiceField(label='Роль пользователя', choices=[ ('Студент', 'Студент'),
                                                                 ('Преподаватель', 'Преподаватель')],
                             initial='Студент')
    number = forms.CharField(label='Номер телефона', validators=[RegexValidator(regex='^\d{10}$', message='Номер телефона должен содержать 10 цифр')])
    birth_date = forms.DateField(label='Дата рождения', widget=DateInput(attrs={'type': 'date'}), help_text='Выберите дату')

    class Meta:
        model = get_user_model()
        fields = ['username','password1','password2','email','first_name','last_name', 'number', 'birth_date','role', 'group']

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if get_user_model().objects.filter(username=username).exists():
            raise forms.ValidationError('Пользователь с таким именем уже существует.')
        return username

    def clean_password2(self):
        cd=self.cleaned_data
        if cd['password1']!=cd['password2']:
            raise forms.ValidationError('Пароли несовпадают!')
        return cd['password1']

    def clean_number(self):
        number = self.cleaned_data.get('number')
        if not number.isdigit() or len(number) != 10:
            raise forms.ValidationError('Номер телефона должен содержать 10 цифр.')
        return number

    def clean_birth_date(self):
        birth_date = self.cleaned_data.get('birth_date')
        if not birth_date:
            raise forms.ValidationError('Пожалуйста, введите дату рождения.')
        return birth_date

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if email:
            existing_users = get_user_model().objects.filter(email=email)
            if self.instance.pk:
                existing_users = existing_users.exclude(pk=self.instance.pk)
            if existing_users.exists():
                raise forms.ValidationError('Такой email уже существует!')
        return email


    def __init__(self, *args, **kwargs):
        super(RegisterUsersForm, self).__init__(*args, **kwargs)

        self.fields['number'].required = True
        self.fields['birth_date'].required = True


    def clean(self):
        cleaned_data = super().clean()
        role = cleaned_data.get('role')
        if role != 'Студент' and role != 'Преподаватель':
            raise forms.ValidationError("Роль должна быть 'Студент' или 'Преподаватель'.")
        return cleaned_data



class LoginUserForm(AuthenticationForm):
    username = forms.CharField(label='Почта или Username',
                               widget=forms.TextInput(attrs={'class':'form-imput'}))
    password = forms.CharField(label='Пароль',
                               widget=forms.PasswordInput(attrs={'class':'form-imput'}))

    class Meta:
        model = get_user_model()
        fields = ['username','password']

class UpdateUsersForm(forms.ModelForm):
    password1 = forms.CharField(label='Пароль', widget=forms.PasswordInput())
    password2 = forms.CharField(label='Повтор пароля', widget=forms.PasswordInput())
    class Meta:
        model = get_user_model()
        fields = ['username', 'email','password1','password2','email', 'first_name', 'last_name', 'number', 'birth_date', 'role', 'group']

    def __init__(self, *args, **kwargs):
        super(UpdateUsersForm, self).__init__(*args, **kwargs)
        self.fields['number'].required = True
        self.fields['birth_date'].required = True
        self.fields['role'].widget = Select(choices=[('Студент', 'Студент'), ('Преподаватель', 'Преподаватель')])

    def clean(self):
        cleaned_data = super().clean()
        role = cleaned_data.get('role')
        if role not in ['Студент', 'Преподаватель']:
            raise forms.ValidationError("Роль должна быть 'Студент' или 'Преподаватель'.")
        return cleaned_data

class ProfileUserForm(forms.ModelForm):
    email = forms.EmailField(disabled=True,label='Почта',widget=forms.TextInput(attrs={'class':'form-imput'}))

    class Meta:
        model=get_user_model()
        fields=['first_name','last_name','email','number','birth_date','role','group']
        widgets={
            'first_name': forms.TextInput(attrs={'class':'form-imput'}),
            'last_name': forms.TextInput(attrs={'class':'form-imput'}),
            'number': forms.TextInput(attrs={'class':'form-imput'}),
            'birth_date': forms.TextInput(attrs={'class':'form-imput'})
        }

    def __init__(self, *args, **kwargs):
        super(ProfileUserForm, self).__init__(*args, **kwargs)
        self.fields['role'].widget = Select(choices=[('Студент', 'Студент'), ('Преподаватель', 'Преподаватель')])

class UserPasswordChangeForm(PasswordChangeForm):
    old_password= forms.CharField(label='Старый пароль',
                               widget=forms.TextInput(attrs={'class':'form-imput'}))
    new_password1 = forms.CharField(label='Новый пароль',
                                   widget=forms.TextInput(attrs={'class': 'form-imput'}))
    new_password2 = forms.CharField(label='Подтверждение пароля',
                                    widget=forms.TextInput(attrs={'class': 'form-imput'}))