from rest_framework import serializers
from .models import DbUniqueWorkunits, DbWorkunits, DbTubetechoperations, DbTempdowntime, DbShift


class UniqueUnitsSerializer(serializers.ModelSerializer):
    """
    API представления для уникальных участков
    """

    class Meta:
        model = DbUniqueWorkunits
        fields = ('id', 'unit_name')


class UnitSerializer(serializers.ModelSerializer):
    """
    API представления для каждого участка
    """

    class Meta:
        model = DbWorkunits
        fields = '__all__'


class OperationTubeSerializer(serializers.ModelSerializer):
    """
    API представления для совершённых операции
    """

    class Meta:
        model = DbTubetechoperations
        fields = '__all__'


class DownOpCauseSerializer(serializers.ModelSerializer):
    """
    API представления для причин останов участков
    """

    class Meta:
        model = DbTempdowntime
        fields = ('id', 'worker', 'unit', 'stop_cause', 'time_of_stoppage', 'time_of_resume')


class ShiftSerializer(serializers.ModelSerializer):
    """
    API представления для каждой регистрированной смены
    """

    class Meta:
        model = DbShift
        fields = '__all__'
