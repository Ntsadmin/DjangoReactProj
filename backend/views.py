import datetime
import pytz
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import DbUniqueWorkunits, DbWorkunits, DbTubetechoperations, DbTempdowntime, DbShift
from .serializers import UniqueUnitsSerializer, UnitSerializer, OperationTubeSerializer, DownOpCauseSerializer, \
    ShiftSerializer


class UniqueUnitView(generics.ListAPIView):
    """
    Уникальные участки по названию и ID
    """
    queryset = DbUniqueWorkunits.objects.all()
    serializer_class = UniqueUnitsSerializer


class UnitView(generics.ListAPIView):
    """
    Все доступные участки в цеху и дополнительной информации по производительности
    """

    # Тут мы просто сортируем по конкретному полю, чтобы запрос возвращал нам сортированный ответ
    queryset = DbWorkunits.objects.all().order_by('unit_ref')
    serializer_class = UnitSerializer


@api_view(['GET'])
def getUnitView(request):
    if request.method == 'GET':
        units = DbWorkunits.objects.select_related('unitref').all().filter(online_accessible=True).order_by('unit_ref')
        last_shift = DbShift.objects.last()

        zone = pytz.timezone('Europe/Moscow')
        time_interval = datetime.datetime.now(zone) + datetime.timedelta(hours=1)

        for unit in units:
            machine = DbWorkunits.objects.get(unit_ref=unit.unit_ref)

            # Обновляем значения каждого участка в БД
            # Расчёт суммарное количество труб
            machine.total_treated_tubes = DbTubetechoperations.objects.select_related('unitref'). \
                all().filter(unitref=unit.unit_ref,
                             shiftref=last_shift).count()

            # Расчёт производительности
            machine.is_productive = DbTubetechoperations.objects.select_related('unitref'). \
                all().filter(unitref=unit.unit_ref,
                             shiftref=last_shift,
                             optime__gt=time_interval).count()

            machine.save()

        serializer = UnitSerializer(units, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)


@api_view(['GET'])
def getUnitRef(request, pk):
    """
    Получить информацию по каждому участку по отдельности (Дублируем предыдущее вью, но для конкретного участка)
    """
    if request.method == 'GET':
        try:
            Unique = DbWorkunits.objects.all().filter(unit_ref=pk)
            serializer = UnitSerializer(Unique, many=True)

            return Response({'data': serializer.data}, status=status.HTTP_200_OK)

        except:
            return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def OperationFullUnits(request):
    if request.method == 'GET':
        try:
            last_shift = DbShift.objects.last()
            queryset = DbTubetechoperations.objects.select_related('unitref').all()\
                .filter(shiftref=last_shift).order_by('-optime')
            serializer = OperationTubeSerializer(queryset, many=True)

            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class OperationUnit(generics.ListAPIView):
    """
    Данные по всем участкам за текущую смену
    """
    shift_queryset = DbShift.objects.last()
    queryset = DbTubetechoperations.objects.select_related('unitref').all().filter(shiftref=shift_queryset)
    serializer_class = OperationTubeSerializer


@api_view(['GET'])
def OpUnitRef(request, pk):
    """
    Получить все совершённые операции конкретным участком
    """
    if request.method == 'GET':
        try:
            shift_queryset = DbShift.objects.last()
            UnitRef = DbTubetechoperations.objects.select_related('unitref').all().filter(unitref=pk,
                                                                                          shiftref=shift_queryset)
            serializer = OperationTubeSerializer(UnitRef, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def OpUnitRefLastElement(request, pk):
    """
    Получить последнюю операцию совершённую на уникальном участке
    """
    if request.method == 'GET':
        try:
            UnitRef = DbTubetechoperations.objects.all().filter(unitref=pk)
            last_element = UnitRef.select_related('unitref').last()
            serializer = OperationTubeSerializer(last_element)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)


class ShiftUnit(generics.ListCreateAPIView):
    """
    Тестовая вьюха для GET-POST request по сменам
    """
    queryset = DbShift.objects.all()
    serializer_class = ShiftSerializer


class downCauseUnit(generics.ListAPIView):
    """
    Причины остановы участков
    """
    queryset = DbTempdowntime.objects.select_related('worker', 'unit').all()
    serializer_class = DownOpCauseSerializer


@api_view(['GET', 'POST'])
def downCauseOp(request, pk):
    """
    Получить и записать причины остановы уникального участка
    """
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
        token['username'] = user.username

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
