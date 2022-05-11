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


# Причины остановы участков
class downCauseUnit(generics.ListCreateAPIView):
    queryset = DbTempdowntime.objects.all()
    serializer_class = DownOpCauseSerializer


# Тестовая вьюха для POST request
class ShiftUnit(generics.ListCreateAPIView):
    queryset = DbShift.objects.all()
    serializer_class = ShiftSerializer


# Получить все совершённые операции
@api_view(['GET'])
def Operationunits(request):
    if request.method == 'GET':
        try:
            Tubes = DbTubetechoperations.objects.all()
            serializer = OperationTubeSerializer(Tubes, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


# Получить все совершённые операции конкретным участком
@api_view(['GET'])
def OpUnitRef(request, pk):
    if request.method == 'GET':
        try:
            UnitRef = DbTubetechoperations.objects.all().filter(unitref=pk)
            serializer = OperationTubeSerializer(UnitRef, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)


# Получить информацию по каждому участку по отдельности
@api_view(['GET'])
def getUnitRef(request, pk):
    if request.method == 'GET':
        try:
            Unique = DbUniqueWorkunits.objects.all().filter(id=pk)
            serializer = UniqueUnitsSerializer(Unique, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)

        except:
            return Response(status=status.HTTP_204_NO_CONTENT)


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
            return Response(status=status.HTTP_502_BAD_GATEWAY)


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
