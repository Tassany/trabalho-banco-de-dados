from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import psycopg2

app = FastAPI()

# Conectando-se à base de dados
con = psycopg2.connect(database="db_test", user="carlos", password="", host="/var/run/postgresql", port="5432")

print("Base de dados aberta com sucesso.")

# pasta dos templates html
templates = Jinja2Templates(directory="templates")
# arquivos estáticos (que não são templates)
app.mount("/static", StaticFiles(directory="static"), name="static")

cur = con.cursor()

@app.get("/usuario/{usuario_nome}", response_class=HTMLResponse)
async def read_items(request: Request, usuario_nome: str):
    print(usuario_nome)
    cur.execute("SELECT * FROM users WHERE name=\'" + usuario_nome + "\';")
    linhas = cur.fetchall()
    descricao = linhas[0][5]
    data_criacao = str(linhas[0][6]).split(' ')[0] 

    data = {
            "usuario_nome": usuario_nome,
            "descricao": descricao,
            "data_criacao": data_criacao
    }
    return templates.TemplateResponse("usuario.html", {"request": request, "data": data})
