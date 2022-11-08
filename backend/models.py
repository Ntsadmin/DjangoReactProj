"""
Многие модели не были использованы в дальнейшим,
но имеют своё представление для будущего пользования
"""

import datetime

from django.db import models


class DbShift(models.Model):
    """
    Модель регистрации смен
    """
    shiftnum = models.IntegerField()
    time_date = models.DateTimeField(default=datetime.datetime.now)

    class Meta:
        db_table = 'db_shift'

    def __str__(self):
        return str(self.id)


class DbUniqueStorage(models.Model):
    """
    Модель представления всех уникальных стеллажей цеха
    """
    storageref = models.IntegerField(unique=True)
    storage_name = models.CharField(max_length=255)

    class Meta:
        db_table = 'db_unique_storage'

    def __str__(self):
        return str(self.storageref)


class DbStorage(models.Model):
    """
    Модель представления заполненности стеллажей
    """
    storage_time = models.DateTimeField()
    storage_ref = models.ForeignKey(DbUniqueStorage,
                                    to_field='storageref',
                                    on_delete=models.RESTRICT,
                                    db_column='storage_ref', null=True)
    status = models.IntegerField(blank=False, null=False, default=0)

    class Meta:
        db_table = 'db_storage'

    def __str__(self):
        return f"{self.storage_ref}: {self.status}"


class DbTubediameter(models.Model):
    """
    Модель представления доступных диаметров труб
    """
    diameter = models.IntegerField(unique=True)

    class Meta:
        db_table = 'db_tubediameter'

    def __str__(self):
        return f"{self.diameter}"


class DbWorkerPost(models.Model):
    """
    Модель представления должностей и зарплатами
    """
    post_name = models.CharField(max_length=100)
    salary = models.IntegerField(default=0)

    class Meta:
        db_table = 'db_worker_post'


class DbWorker(models.Model):
    """
    Модель представления работников
    """
    fullname = models.CharField(max_length=200)
    post = models.ForeignKey(DbWorkerPost,
                             on_delete=models.RESTRICT,
                             blank=True,
                             null=True)

    class Meta:
        db_table = 'db_worker'

    def __str__(self):
        return str(self.id)


class DbUniqueWorkunits(models.Model):
    """
    Модель представления уникальных участков
    """
    unit_name = models.CharField(unique=True, max_length=255)

    class Meta:
        db_table = 'db_unique_workunits'

    def __str__(self):
        return f"{self.id}"


class DbWorkunits(models.Model):
    """
    Модель представления участков цеха
    """
    unit_name = models.CharField(unique=True, max_length=255)
    unit_plan = models.IntegerField(blank=True, null=False, default=200)
    online_accessible = models.BooleanField()
    unit_ref = models.IntegerField(unique=True, blank=True, null=True)
    unitref = models.ForeignKey(DbUniqueWorkunits,
                                on_delete=models.RESTRICT,
                                db_column='unitref',
                                blank=True,
                                null=True)

    is_productive = models.IntegerField(blank=True, null=True)
    total_treated_tubes = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'db_workunits'

    def __str__(self):
        return str(self.unit_ref)


class DbProps(models.Model):
    """
    Модель представления замечания по участкам
    """
    unit = models.ForeignKey(DbWorkunits, on_delete=models.RESTRICT)
    prop_text = models.CharField(max_length=255)

    class Meta:
        db_table = 'db_props'


class DbTempdowntime(models.Model):
    """
    Модель представления причин останова участков
    """
    worker = models.ForeignKey(DbWorker,
                               on_delete=models.RESTRICT,
                               to_field='id')
    stop_cause = models.CharField(max_length=255)
    time_of_stoppage = models.DateTimeField(blank=False,
                                            null=False,
                                            default=datetime.datetime.now)
    time_of_resume = models.DateTimeField(blank=False,
                                          null=False,
                                          default=datetime.datetime.now)
    unit = models.ForeignKey(DbWorkunits,
                             on_delete=models.RESTRICT,
                             to_field='unit_ref')

    class Meta:
        db_table = 'db_tempdowntime'

    def __str__(self):
        return f"{self.worker}: {self.stop_cause[:20]} - {self.unit}"


class DbTubetechoperations(models.Model):
    """
    Модель представления совершённых операции
    """
    diameterref = models.ForeignKey(DbTubediameter,
                                    on_delete=models.RESTRICT,
                                    db_column='diameterref',
                                    blank=True,
                                    null=True)
    unitref = models.ForeignKey(DbWorkunits,
                                on_delete=models.RESTRICT,
                                db_column='unitref',
                                blank=True,
                                null=True,
                                to_field='unit_ref')
    workerref = models.ForeignKey(DbWorker,
                                  on_delete=models.RESTRICT,
                                  db_column='workerref',
                                  blank=True,
                                  null=True,
                                  to_field='id')
    shiftref = models.ForeignKey(DbShift,
                                 on_delete=models.RESTRICT,
                                 db_column='shiftref',
                                 blank=True,
                                 null=True,
                                 to_field='id')
    opresult = models.IntegerField(blank=True, null=True)
    optime = models.DateTimeField()
    unit_regime = models.CharField(max_length=255)

    class Meta:
        db_table = 'db_tubetechoperations'
