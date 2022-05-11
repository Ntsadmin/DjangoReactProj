from django.urls import path
from .views import UniqueUnitView, UnitView, Operationunits, OpUnitRef, getUnitRef, downCauseOp, downCauseUnit, \
    ShiftUnit, MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('uniqueunits/', UniqueUnitView.as_view(), name='uniqueunits'),
    path(r'uniqueunits/<int:pk>', getUnitRef, name='uniqueref'),
    path('units/', UnitView.as_view(), name='units'),
    path(r'operations/', Operationunits, name='Operations'),
    path(r'operations/<int:pk>/', OpUnitRef, name='OpUnitRef'),
    path('downcause/', downCauseUnit.as_view(), name='cause'),
    path(r'downcause/<int:pk>/', downCauseOp, name='downCause'),
    path('shift/', ShiftUnit.as_view(), name='shift'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
