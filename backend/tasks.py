from celery import shared_task
import datetime
import psycopg2


# @shared_task
# def addShift():

    # current_datetime = datetime.datetime.now()
    # print(current_datetime)
    # try:
    #     connection = psycopg2.connect(
    #         database='ntsdb',
    #         user='postgres',
    #         password='asu180422',
    #         host='192.100.1.108',
    #         port=5432
    #     )
    #
    #     cursor = connection.cursor()
    #     cursor.execute(
    #         "insert into db_shift (shiftnum, time_date)"
    #         "values ()"
    #     )
    #     connection.commit()
    #     connection.close()
    #
    # except psycopg2.Error as e:
    #     print(e)
