import psycopg2


try:
    connection = psycopg2.connect(
        database='ntsdb',
        user='postgres',
        password='asu180422',
        host='192.100.1.108',
        port=5432
    )

    cursor = connection.cursor()
    cursor.execute(
        "Select id from db_shift order by id desc limit 1"
    )
    for element in cursor:
        print(element[0])

except psycopg2.Error as e:
    print(e)