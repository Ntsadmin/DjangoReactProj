from django.db import transaction
from django.db.models import Count

from .models import DbTubetechoperations, DbWorkunits, DbShift


def save_data_into_unit(unit: DbWorkunits,
                        last_shift: DbShift,
                        time_interval):
    """
    Выделяем отдельную функцию, которая добавляет значения внутри
    каждой модели участков
    """
    with transaction.atomic():
        # Обновляем значения каждого участка в БД
        # Расчёт суммарное количество труб
        total_tubes = DbTubetechoperations.objects.select_related('unitref').\
            filter(unitref=unit.unit_ref,
                   shiftref=last_shift).aggregate(total_tubes=Count('id'))
        # Расчёт производительности
        productivity = DbTubetechoperations.objects.select_related('unitref').\
            filter(unitref=unit.unit_ref,
                   shiftref=last_shift,
                   optime__gt=time_interval).\
            aggregate(productivity=Count('id'))
        unit.total_treated_tubes = total_tubes.get('total_tubes')
        unit.is_productive = productivity.get('productivity')
        return unit.save()
