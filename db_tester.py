import datetime
import psycopg2
import json

try:
    connection = psycopg2.connect(
        database='ntsdb',
        user='postgres',
        password='asu180422',
        host='192.100.1.108',
        port=5432
    )

    current_timeDate = datetime.datetime.now()
    sql_insert_time = current_timeDate.strftime("%Y-%m-%d %H:%M:%S")

    print(sql_insert_time)

    current_time = current_timeDate.time()

    if 8 <= current_time.hour < 20:
        shift_number = 1
    else:
        shift_number = 2

    print(shift_number)

    cursor = connection.cursor()
    cursor.execute(
        "insert into db_shift (shiftnum, time_date)"
        f"values ({shift_number}, '{sql_insert_time}')"
    )

    connection.commit()
    connection.close()

except psycopg2.Error as e:
    print(e)
