"""
Над админкой не будут вестись кардинальные изменения, поскольку нет надобности
"""

from django.contrib import admin
from .models import DbShift, DbWorker, DbWorkerPost, DbWorkunits, DbUniqueWorkunits, DbProps, DbTubediameter, \
    DbTempdowntime, DbStorage, DbTubetechoperations, DbUniqueStorage


admin.site.register(DbShift)
admin.site.register(DbWorker)
admin.site.register(DbWorkerPost)
admin.site.register(DbWorkunits)
admin.site.register(DbUniqueWorkunits)
admin.site.register(DbProps)
admin.site.register(DbTubediameter)
admin.site.register(DbTempdowntime)
admin.site.register(DbStorage)
admin.site.register(DbTubetechoperations)
admin.site.register(DbUniqueStorage)
