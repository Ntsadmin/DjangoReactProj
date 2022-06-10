from django.shortcuts import render
from django.views.decorators.cache import never_cache


def index(request, *args, **kwargs):
    """
    Будем передавать право роутинга реакту. Наличие args и kwargs дано для того, чтобы роутинг смог передавать доп
    параметры. Весь реакт компилируется с помощью WebPack в одном HTML файле.
    """
    return render(request, 'frontend/index.html')
