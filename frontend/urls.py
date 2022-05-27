"""
Передаём ответственность за нахождения ошибок URL django, дабы не заниматься этим в реакте. В реакте будем только отсле-
живать моменты, когда доп параметры в URL допустимы или нет
"""
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('techOp/<int:pk>', views.index),
    path('cause/', views.index),
    path('login/', views.index)
]
