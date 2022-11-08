import datetime
import threading
import pytz

from rest_framework import generics, status
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import DbUniqueWorkunits, DbWorkunits, DbTubetechoperations, \
    DbShift
from .serializers import UniqueUnitsSerializer, UnitSerializer, \
    OperationTubeSerializer, ShiftSerializer
from .utils import save_data_into_unit


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

    # Тут мы просто сортируем по конкретному полю,
    # чтобы запрос возвращал нам сортированный ответ
    queryset = DbWorkunits.objects.all().order_by('unit_ref')
    serializer_class = UnitSerializer


@api_view(['GET'])
def get_units_view(request):
    """
    Получаем список всех доступных участков, а также дополняем значения
    суммарных обработанных труб + производительность
    """
    try:
        if request.method == 'GET':
            units = DbWorkunits.objects.select_related('unitref').all(). \
                filter(online_accessible=True).order_by('unit_ref')
            last_shift = DbShift.objects.last()

            zone = pytz.timezone('Europe/Moscow')
            time_interval = datetime.datetime.now(zone) + datetime.\
                timedelta(hours=1)

            threads = list()
            for unit in units:
                x = threading.Thread(target=save_data_into_unit,
                                     args=(unit,
                                           last_shift, time_interval))
                threads.append(x)
                x.start()
            for thread in threads:
                thread.join()

            serializer = UnitSerializer(units, many=True)
            return Response({'data': serializer.data},
                            status=status.HTTP_200_OK)
    except APIException:
        return Response({'message': 'not authorized!'},
                        status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
def get_unit_ref(request, pk):
    """
    Получить информацию по каждому участку по отдельности (Дублируем предыдущее вью, но для конкретного участка)
    """
    if request.method == 'GET':
        try:
            unit = DbWorkunits.objects.get(unit_ref=pk)
            serializer = UnitSerializer(unit, many=True)
            return Response({'data': serializer.data},
                            status=status.HTTP_200_OK)
        except DbWorkunits.DoesNotExist:
            return Response({'data': 'not content!'},
                            status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def get_all_operations(request):
    """
    Получаем все проведённые операции за последнюю смену
    """
    if request.method == 'GET':
        try:
            last_shift = DbShift.objects.last()
            queryset = DbTubetechoperations.objects.\
                select_related('unitref').all().\
                filter(shiftref=last_shift).order_by('optime')
            serializer = OperationTubeSerializer(queryset, many=True)

            return Response({'data': serializer.data},
                            status=status.HTTP_200_OK)
        except APIException:
            return Response(status=status.HTTP_403_FORBIDDEN,
                            headers=None)


class OperationUnit(generics.ListAPIView):
    """
    Данные по всем участкам за текущую смену
    """
    shift_queryset = DbShift.objects.last()
    queryset = DbTubetechoperations.objects.select_related('unitref')\
        .all().filter(shiftref=shift_queryset)
    serializer_class = OperationTubeSerializer


@api_view(['GET'])
def get_unit_operations(request, pk):
    """
    Получить все совершённые операции конкретным участком
    """
    if request.method == 'GET':
        try:
            shift_queryset = DbShift.objects.last()
            unit_operations = DbTubetechoperations.objects.\
                select_related('unitref').all().\
                filter(unitref=pk, shiftref=shift_queryset)
            serializer = OperationTubeSerializer(unit_operations,
                                                 many=True)
            return Response({'data': serializer.data},
                            status=status.HTTP_200_OK)
        except DbTubetechoperations.DoesNotExist:
            return Response({'data': 'No content!'},
                            status=status.HTTP_204_NO_CONTENT,
                            headers=None)


@api_view(['GET'])
def get_unit_last_operation(request, pk):
    """
    Получить последнюю операцию совершённую на уникальном участке
    """
    if request.method == 'GET':
        try:
            unit_operations = DbTubetechoperations.objects.all().filter(unitref=pk)
            last_operation = unit_operations.select_related('unitref').last()
            serializer = OperationTubeSerializer(last_operation)
            return Response({'data': serializer.data},
                            status=status.HTTP_200_OK,
                            headers=None)
        except DbTubetechoperations.DoesNotExist:
            return Response({'data': 'No content!'},
                            status=status.HTTP_204_NO_CONTENT,
                            headers=None)


class ShiftUnit(generics.ListCreateAPIView):
    """
    Тестовая View для GET-POST request по сменам
    """
    queryset = DbShift.objects.all()
    serializer_class = ShiftSerializer


@api_view(['GET'])
def get_shift_info(request, pk):
    """
    Получить информацию про выбранную смену
    """
    if request.method == 'GET':
        try:
            # Pk передаёт основные параметры, которые и будут фильтровать наш запрос
            params = pk.split("_")

            # Мера принята для того, чтобы не сбивался Django c datetime
            zone = pytz.timezone('Europe/Moscow')

            # Из второй части запроса берём выбранную дату
            datetime_params = datetime.datetime.strptime(params[1],
                                                         "%Y-%m-%d")
            datetime_params = zone.localize(datetime_params)

            # Интервал на целый день, чтобы попасть использовать between
            interval_datetime_params = datetime_params + datetime.\
                timedelta(days=1)

            # Получаем результат запроса в БД
            selected_shift = DbShift.objects.\
                get(shiftnum=int(params[0]),
                    time_date__gt=datetime_params,
                    time_date__lt=interval_datetime_params)

            # Устанавливаем ID
            shift_ref = selected_shift.id

            # Суммарное количество труб на отвороте первой линии (вход)
            measuring_process_total_tubes = DbTubetechoperations.objects.\
                filter(shiftref=shift_ref, unitref=12).count()

            # Количество бракованных труб
            total_bad_tubes = DbTubetechoperations.objects.\
                filter(shiftref=shift_ref, opresult=2).count()

            # Количество труб пройдены через маркировку первой линии (выход)
            marked_total_tubes = DbTubetechoperations.objects.\
                filter(shiftref=shift_ref, unitref=17).count()

            # Суммарное количество труб на входе отворота второй линии (Вход 2)
            lapel_process_total_tubes = DbTubetechoperations.objects.\
                filter(shiftref=shift_ref, unitref=52).count()

            # Количество годных труб после НК2 (Выход 2)
            nk_total_good_tubes = DbTubetechoperations.objects.\
                filter(shiftref=shift_ref, opresult=1, unitref=53).count()

            return Response({'data': {
                "enter_tubes": measuring_process_total_tubes,
                'factory_bad_tubes': total_bad_tubes,
                "exit_tubes": marked_total_tubes,
                'enter_line2': lapel_process_total_tubes,
                'exit_line2': nk_total_good_tubes
            }}, status=status.HTTP_200_OK)

        except DbShift.DoesNotExist:
            return Response({'data': 'No content!'},
                            status=status.HTTP_204_NO_CONTENT,
                            headers=None)


# class downCauseUnit(generics.ListAPIView):
#     """
#     Причины остановы участков
#     """
#     queryset = DbTempdowntime.objects.select_related('worker', 'unit').all()
#     serializer_class = DownOpCauseSerializer
#
#
# @api_view(['GET', 'POST'])
# def downCauseOp(request, pk):
#     """
#     Получить и записать причины остановы уникального участка
#     """
#     if request.method == 'GET':
#         try:
#             Cause = DbTempdowntime.objects.all().filter(unit=pk)
#             serializer = DownOpCauseSerializer(Cause, many=True)
#             return Response({'data': serializer.data}, status=status.HTTP_200_OK)
#         except:
#             return Response(status=status.HTTP_400_BAD_REQUEST)
#
#     elif request.method == 'POST':
#         try:
#             Cause = DbTempdowntime()
#             Cause.stop_cause = request.data['stop_cause']
#             Cause.time_of_stoppage = request.data['time_of_stoppage']
#             Cause.time_of_resume = request.data['time_of_resume']
#             Cause.worker = request.data['worker_id']
#             Cause.unit = pk
#             Cause.save()
#             return Response(status=status.HTTP_201_CREATED)
#         except:
#             return Response(status=status.HTTP_400_BAD_REQUEST)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
