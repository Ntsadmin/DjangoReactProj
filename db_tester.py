import datetime
import psycopg2
import json

try:
    shift_num = 1
    current_timeDate = datetime.datetime.now()
    sql_insert_time = current_timeDate.strftime("%Y-%m-%d %H:%M:%S")

    connection = psycopg2.connect(
         database='ntsdb',
         user='postgres',
         password='asu180422',
         host='localhost',
         port=5432
     )

    cursor = connection.cursor()
    cursor.execute(
           f"insert into db_shift (shiftnum, time_date) values ({shift_num}, '{sql_insert_time}')"
            )
    connection.commit()
    connection.close

except psycopg2.Error as e:
     print(e)

print(datetime.datetime.now())

