import datetime
import psycopg2
import json

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
#
#     connection.commit()
#     connection.close()
#
# except psycopg2.Error as e:
#     print(e)

# print(datetime.datetime.now())
