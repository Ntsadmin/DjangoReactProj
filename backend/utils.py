from .models import DbTubetechoperations, DbWorkunits, DbShift


def save_data_into_unit(unit: DbWorkunits,
                        last_shift: DbShift,
                        time_interval):
    """
    Выделяем отдельную функцию, которая добавляет значения внутри
    каждой модели участков
    """
    # Обновляем значения каждого участка в БД
    # Расчёт суммарное количество труб
    unit.total_treated_tubes = DbTubetechoperations.objects.\
        select_related('unitref').all().filter(
                        unitref=unit.unit_ref,
                        shiftref=last_shift).count()
    # Расчёт производительности
    unit.is_productive = DbTubetechoperations.objects.\
        select_related('unitref').all().filter(
                        unitref=unit.unit_ref,
                        shiftref=last_shift,
                        optime__gt=time_interval).count()
    return unit.save()
