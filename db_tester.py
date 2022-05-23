import psycopg2
import json


m = b'{\r\n"ID_CMD":10,\r\n"ID_UNIT":13,\r\n"Result":1,\r\n"Mode":1,\r\n"DateTime":"20.05.2022T16:35:32"\r\n}{\r\n"ID_CMD":10,\r\n"ID_UNIT":12,\r\n"Result":1,\r\n"Mode":1,\r\n"DateTime":"20.05.2022T16:35:32"\r\n}'

n = m.decode('utf-8')
print(type(n))



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
#         "Select id from db_shift order by id desc limit 1"
#     )
#     for element in cursor:
#         print(element[0])
#
# except psycopg2.Error as e:
#     print(e)
