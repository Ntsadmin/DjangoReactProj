from django.urls import path
from django.views.decorators.cache import cache_page
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from .views import UniqueUnitView, get_units_view, get_unit_ref,\
    get_unit_last_operation, get_unit_operations, get_all_operations,\
    get_shift_info, ShiftUnit, MyTokenObtainPairView

urlpatterns = [
    path('uniqueunits/', UniqueUnitView.as_view(), name='unique_units'),
    path('units/', get_units_view, name='units'),
    path(r'units/<int:pk>', get_unit_ref, name='unique_ref'),
    path(r'operations/', get_all_operations, name='Operations'),
    path(r'operations/<int:pk>/', get_unit_operations, name='op_unit_ref'),
    path(r'lastoperation/<int:pk>', get_unit_last_operation, name='last_unit_operation'),
    path('shift/', cache_page(60*2)(ShiftUnit.as_view()), name='shift'),
    path('shift/<str:pk>', get_shift_info, name='shift_info'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
