from __future__ import absolute_import, unicode_literals
from celery import shared_task
import datetime
import psycopg2


@shared_task(name='add_shift')
def add_shift():

    # Получает время в цеху (разница в 2 часа), затем превращаем в формат для SQL 
    current_factory_datetime = datetime.datetime.now() + datetime.timedelta(hours=2)
    sql_insert_time = current_factory_datetime.strftime("%Y-%m-%d %H:%M:%S")

    # Далее будем брать время для того, чтобы добавить смены 
    current_factory_time = current_factory_datetime.time()
    if 8 <= current_factory_time.hour < 20:
        shift_num = 1
    else:
        shift_num = 2

    # print(shift_num)

    # Подключаемся к базе данных 
    try:
        connection = psycopg2.connect(
                database='ntsdb',
                user='postgres',
                password='asu180422',
                host='localhost',
                port='5432'
                )

        cursor = connection.cursor()
        cursor.execute(
                f"insert into db_shift (shiftnum, time_date) values ({shift_num}, '{sql_insert_time}')"
                )
       #  print("success over here!")
        
        connection.commit()
        connection.close()
    except psycopg2.Error as e:
        print(e)
