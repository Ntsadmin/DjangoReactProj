import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ntsbackend.settings')

app = Celery('ntsbackend')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

app.conf.beat_schedule= {
        'shift': {
            'task': 'add_shift',
            'schedule': crontab(hour='6, 18')
            }
        }
