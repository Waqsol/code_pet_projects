from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.views.generic import DeleteView, UpdateView
from .models import Group
from .forms import GroupForm

@login_required
def all_group(request):
    all_group = Group.objects.all()
    return render(request, 'group/all_group.html', {'all_group': all_group})

def create_group(request):
    error = ''
    if request.method == 'POST':
        form = GroupForm(request.POST)
        if form.is_valid():
            group_name = form.cleaned_data.get('name')
            existing_group = Group.objects.filter(name=group_name).exists()
            if existing_group:
                error = 'Группа с таким названием уже существует'
            else:
                group = form.save(commit=False)
                group.save()
                return redirect('all_group')
        else:
            error = 'Форма неверно заполнена'
    else:
        form = GroupForm()
    return render(request, 'group/create_group.html', {'form': form, 'error': error})

def group_details(request, group_id):
    group = Group.objects.get(pk=group_id)
    students = group.users_set.filter(group=group_id)
    return render(request, 'group/group_details.html', {'group': group, 'students': students})

class GroupDelete(DeleteView):
    model = Group
    success_url = '/group'
    template_name = 'group/group_delete.html'

class GroupUpdate(UpdateView):
    model = Group
    template_name = 'group/group_update.html'
    form_class = GroupForm

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        group = self.get_object()
        students = group.users_set.all()
        context['students'] = students
        return context