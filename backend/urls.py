from django.urls import path
from .views import UniqueUnitView, UnitView, OperationUnit, OpUnitRef, getUnitRef, downCauseOp, downCauseUnit, \
    ShiftUnit, MyTokenObtainPairView, OpUnitRefLastElement

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('uniqueunits/', UniqueUnitView.as_view(), name='unique_units'),
    path('units/', UnitView.as_view(), name='units'),
    path(r'units/<int:pk>', getUnitRef, name='unique_ref'),
    path(r'operations/', OperationUnit.as_view(), name='Operations'),
    path(r'operations/<int:pk>/', OpUnitRef, name='OpUnitRef'),
    path(r'lastoperation/<int:pk>', OpUnitRefLastElement, name='last_operation'),
    path('downcause/', downCauseUnit.as_view(), name='cause'),
    path(r'downcause/<int:pk>/', downCauseOp, name='downCause'),
    path('shift/', ShiftUnit.as_view(), name='shift'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
