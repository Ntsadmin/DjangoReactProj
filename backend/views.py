import datetime
from abc import ABC

from django.utils import timezone

from .models import DbUniqueWorkunits, DbWorkunits, DbTubetechoperations, DbTempdowntime, DbShift
from .serializers import UniqueUnitsSerializer, UnitSerializer, OperationTubeSerializer, DownOpCauseSerializer, \
    ShiftSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# Уникальные участки по названию и функционалу
class UniqueUnitView(generics.ListAPIView):
    queryset = DbUniqueWorkunits.objects.all()
    serializer_class = UniqueUnitsSerializer


# Все доступные участки в цеху
class UnitView(generics.ListAPIView):
    queryset = DbWorkunits.objects.all()
    serializer_class = UnitSerializer


# Получить информацию по каждому участку по отдельности
@api_view(['GET'])
def getUnitRef(request, pk):
    if request.method == 'GET':
        try:

            Unique = DbWorkunits.objects.all().filter(unit_ref=pk)

            # Получаем далее последние операции за 10 мин, где мы будем сравнивать производительности
            unit = DbWorkunits.objects.get(unit_ref=pk)
            time_interval = datetime.datetime.now(tz=timezone.utc) - datetime.timedelta(minutes=10)
            unique_unit_ref = DbTubetechoperations.objects.all().filter(unitref=pk,
                                                                        optime__gt=time_interval).count()

            if unique_unit_ref == 0:
                unit.is_productive = 0
            elif unique_unit_ref < 10:
                unit.is_productive = 1
            else:
                unit.is_productive = 2
            unit.save()

            serializer = UnitSerializer(Unique, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)

        except:
            return Response(status=status.HTTP_204_NO_CONTENT)


# Причины остановы участков
class downCauseUnit(generics.ListAPIView):
    queryset = DbTempdowntime.objects.select_related('worker', 'unit').all()
    serializer_class = DownOpCauseSerializer


# Тестовая вьюха для POST request
class ShiftUnit(generics.ListCreateAPIView):
    queryset = DbShift.objects.all()
    serializer_class = ShiftSerializer


class OperationUnit(generics.ListAPIView):
    shift_queryset = DbShift.objects.last()
    time_interval = datetime.datetime.now(tz=timezone.utc) - datetime.timedelta(hours=12)
    queryset = DbTubetechoperations.objects.select_related('unitref').all().filter(optime__gt=time_interval,
                                                                                   shiftref=shift_queryset)
    serializer_class = OperationTubeSerializer


# # Получить все совершённые операции
# @api_view(['GET'])
# def Operationunits(request):
#     if request.method == 'GET':
#         try:
#             shift_queryset = DbShift.objects.last()
#             time_interval = datetime.datetime.now(tz=timezone.utc) - datetime.timedelta(hours=12)
#             Tubes = DbTubetechoperations.objects.select_related('unitref').all().filter(optime__gt=time_interval,
#                                                                                         shiftref=shift_queryset)
#             serializer = OperationTubeSerializer(Tubes, many=True)
#             return Response({'data': serializer.data}, status=status.HTTP_200_OK)
#         except:
#             return Response(status=status.HTTP_400_BAD_REQUEST)


# Получить все совершённые операции конкретным участком
@api_view(['GET'])
def OpUnitRef(request, pk):
    if request.method == 'GET':
        try:
            shift_queryset = DbShift.objects.last()
            time_interval = datetime.datetime.now(tz=timezone.utc) - datetime.timedelta(hours=12)
            UnitRef = DbTubetechoperations.objects.select_related('unitref').all().filter(unitref=pk,
                                                                                          optime__gt=time_interval,
                                                                                          shiftref=shift_queryset)
            serializer = OperationTubeSerializer(UnitRef, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)


# # Получить все совершённые операции конкретным участком
# @api_view(['GET'])
# def OpUnitRefLastElement(request, pk):
#     if request.method == 'GET':
#         try:
#             UnitRef = DbTubetechoperations.objects.all().filter(unitref=pk)
#             last_element = UnitRef.select_related('unitref').last()
#             serializer = OperationTubeSerializer(last_element)
#             return Response({'data': serializer.data}, status=status.HTTP_200_OK)
#         except:
#             return Response(status=status.HTTP_204_NO_CONTENT)


# Получить и записать причины остановы конкретного участка
@api_view(['GET', 'POST'])
def downCauseOp(request, pk):
    if request.method == 'GET':
        try:
            Cause = DbTempdowntime.objects.all().filter(unit=pk)
            serializer = DownOpCauseSerializer(Cause, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'POST':
        try:
            Cause = DbTempdowntime()
            Cause.stop_cause = request.data['stop_cause']
            Cause.time_of_stoppage = request.data['time_of_stoppage']
            Cause.time_of_resume = request.data['time_of_resume']
            Cause.worker = request.data['worker_id']
            Cause.unit = pk
            Cause.save()
            return Response(status=status.HTTP_201_CREATED)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
