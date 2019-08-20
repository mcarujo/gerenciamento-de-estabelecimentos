import mysql.connector

mydb = mysql.connector.connect(
    host="database",
    user="root",
    passwd="flask",
    database="flask"
)
mycursor = mydb.cursor()
query = "INSERT INTO user (login, senha) VALUES ('flask', 'flask')"
mycursor.execute(query)
mydb.commit()
