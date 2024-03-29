from rest_framework import serializers
from .models import DbUniqueWorkunits, DbWorkunits, DbTubetechoperations, DbTempdowntime, DbShift


# API представления для уникальных участков
class UniqueUnitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DbUniqueWorkunits
        fields = ('id', 'unit_name')


# API представления для каждого участка
class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = DbWorkunits
        fields = '__all__'


# API представления для совершённых операции
class OperationTubeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DbTubetechoperations
        fields = '__all__'


# API представления для причин останов участков
class DownOpCauseSerializer(serializers.ModelSerializer):
    class Meta:
        model = DbTempdowntime
        fields = ('id', 'worker', 'unit', 'stop_cause', 'time_of_stoppage', 'time_of_resume')


# API представления для каждой регистрированной смены
class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = DbShift
        fields = '__all__'
