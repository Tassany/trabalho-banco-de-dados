import psycopg2

con = psycopg2.connect(database="db_test", user="carlos", password="", host="/var/run/postgresql", port="5432")

print("Database opened successfully")

cur = con.cursor()
# cur.execute("INSERT INTO users (name, email, password, description) VALUES(\'dollynho\', \'dollynho02001@gmail.com\', \'10283\', \'eu sou o seu amiguinho.\');")
cur.execute("SELECT * FROM users WHERE name=\'dollynho\';")

rows = cur.fetchall()
print(rows[0][5])
# print(str(rows[0][6]).split(' ')[0])
# con.commit()
con.close();
