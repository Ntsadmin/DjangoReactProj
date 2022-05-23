from django.db import models

# Create your models here.
import datetime
from django.db import models


# Модель регистрации смен
class DbShift(models.Model):
    shiftnum = models.IntegerField()
    time_date = models.DateTimeField(default=datetime.datetime.now)

    class Meta:
        db_table = 'db_shift'

    def __str__(self):
        return str(self.id)


# Модель представления всех уникальных стеллажей цеха
class DbUniqueStorage(models.Model):
    storageref = models.IntegerField(unique=True)
    storage_name = models.CharField(max_length=255)

    class Meta:
        db_table = 'db_unique_storage'

    def __str__(self):
        return str(self.storageref)


# Модель представления заполненности стеллажей
class DbStorage(models.Model):
    storage_time = models.DateTimeField()
    storage_ref = models.ForeignKey(DbUniqueStorage, to_field='storageref', on_delete=models.RESTRICT,
                                    db_column='storage_ref', null=True)
    status = models.IntegerField(blank=False, null=False, default=0)

    class Meta:
        db_table = 'db_storage'

    def __str__(self):
        return f"{self.storage_ref}: {self.status}"


# Модель представления доступных диаметров труб
class DbTubediameter(models.Model):
    diameter = models.IntegerField(unique=True)

    class Meta:
        db_table = 'db_tubediameter'

    def __str__(self):
        return f"{self.diameter}"


# Модель представления должностей
class DbWorkerPost(models.Model):
    post_name = models.CharField(max_length=100)
    salary = models.IntegerField(default=0)

    class Meta:
        db_table = 'db_worker_post'


# Модель представления уникальных участков
class DbUniqueWorkunits(models.Model):
    unit_name = models.CharField(unique=True, max_length=255)

    class Meta:
        db_table = 'db_unique_workunits'

    def __str__(self):
        return f"{self.id}"


# Модель представления работников
class DbWorker(models.Model):
    fullname = models.CharField(max_length=200)
    post = models.ForeignKey(DbWorkerPost, on_delete=models.RESTRICT, blank=True, null=True)

    class Meta:
        db_table = 'db_worker'

    def __str__(self):
        return str(self.id)


# Модель представления участков цеха
class DbWorkunits(models.Model):
    unit_name = models.CharField(unique=True, max_length=255)
    unit_plan = models.IntegerField(blank=True, null=False, default=200)
    online_accessible = models.BooleanField()
    is_productive = models.IntegerField(default=0, null=True, blank=True)
    unit_ref = models.IntegerField(unique=True, blank=True, null=True)
    unitref = models.ForeignKey(DbUniqueWorkunits, on_delete=models.RESTRICT, db_column='unitref', blank=True,
                                null=True)

    class Meta:
        db_table = 'db_workunits'

    def __str__(self):
        return str(self.unit_ref)


# Модель представления замечания по участкам
class DbProps(models.Model):
    unit = models.ForeignKey(DbWorkunits, on_delete=models.RESTRICT)
    prop_text = models.CharField(max_length=255)

    class Meta:
        db_table = 'db_props'


# Модель представления причин останова участков
class DbTempdowntime(models.Model):
    worker = models.ForeignKey(DbWorker, on_delete=models.RESTRICT, to_field='id')
    stop_cause = models.CharField(max_length=255)
    time_of_stoppage = models.DateTimeField(blank=False, null=False, default=datetime.datetime.now)
    time_of_resume = models.DateTimeField(blank=False, null=False, default=datetime.datetime.now)
    unit = models.ForeignKey(DbWorkunits, on_delete=models.RESTRICT, to_field='unit_ref')

    class Meta:
        db_table = 'db_tempdowntime'

    def __str__(self):
        return f"{self.worker}: {self.stop_cause[:20]} - {self.unit}"


# Модель представления совершённых операции
class DbTubetechoperations(models.Model):
    diameterref = models.ForeignKey(DbTubediameter, on_delete=models.RESTRICT, db_column='diameterref', blank=True,
                                    null=True)
    unitref = models.ForeignKey(DbWorkunits, on_delete=models.RESTRICT, db_column='unitref', blank=True, null=True,
                                to_field='unit_ref')
    workerref = models.ForeignKey(DbWorker, on_delete=models.RESTRICT, db_column='workerref', blank=True, null=True,
                                  to_field='id')
    shiftref = models.ForeignKey(DbShift, on_delete=models.RESTRICT, db_column='shiftref', blank=True, null=True,
                                 to_field='id')
    opresult = models.IntegerField(blank=True, null=True)
    optime = models.DateTimeField()
    unit_regime = models.CharField(max_length=255)

    class Meta:
        db_table = 'db_tubetechoperations'
