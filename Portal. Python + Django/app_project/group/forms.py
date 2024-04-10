from django import forms
from django.core.validators import RegexValidator

from .models import Group

class GroupForm(forms.ModelForm):
    name = forms.CharField(validators=[
        RegexValidator(r'^[a-zA-Zа-яА-Я0-9\-]*$', message='Только цифры, буквы и символ "-" разрешены.')
    ])

    class Meta:
        model = Group
        fields = ['name', 'captain']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['captain'].required = False
