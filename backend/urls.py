from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import UniqueUnitView, UnitView, OperationUnit, OpUnitRef, getUnitRef, downCauseOp, downCauseUnit, \
    ShiftUnit, MyTokenObtainPairView, OpUnitRefLastElement, getUnitView, OperationFullUnits

urlpatterns = [
    path('uniqueunits/', UniqueUnitView.as_view(), name='unique_units'),
    path('units/', getUnitView, name='units'),
    path(r'units/<int:pk>', getUnitRef, name='unique_ref'),
    path(r'operations/', OperationFullUnits, name='Operations'),
    path(r'operations/<int:pk>/', OpUnitRef, name='op_unit_ref'),
    path(r'lastoperation/<int:pk>', OpUnitRefLastElement, name='last_unit_operation'),
    path('downcause/', downCauseUnit.as_view(), name='cause'),
    path(r'downcause/<int:pk>/', downCauseOp, name='unit_down_cause'),
    path('shift/', ShiftUnit.as_view(), name='shift'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
