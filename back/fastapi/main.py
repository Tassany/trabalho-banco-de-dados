from fastapi import FastAPI, Request, Form
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

def PegarUsuarios(usuario_nome):
    cur = con.cursor()
    cur.execute("SELECT t.name, t.url_pic_perfil FROM (SELECT *, REGEXP_MATCHES(name, \'^" + usuario_nome + "[A-Za-z0-9_]*\') FROM users) t;")
    lista_usuarios = cur.fetchall()
    cur.close()

    for i in range(len(lista_usuarios)):
        if lista_usuarios[i][1] == None:
            lista_usuarios[i] = (lista_usuarios[i][0], 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg')

    usuarios_encontrados = {
            "lista_usuarios":lista_usuarios 
    }

    return usuarios_encontrados


def PegarUsuario(usuario_nome):
    cur = con.cursor()
    cur.execute("SELECT * FROM users WHERE name=\'" + usuario_nome + "\';")
    usuario_info = cur.fetchone()

    descricao = usuario_info[5]
    data_criacao = str(usuario_info[6]).split(' ')[0] 
    url_foto_perfil = usuario_info[2];
    if url_foto_perfil == None:
        url_foto_perfil = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'

    usuario_dados = {
            "usuario_nome": usuario_nome,
            "descricao": descricao,
            "data_criacao": data_criacao,
            "url_foto_perfil": url_foto_perfil
    }

    cur.close()

    return usuario_dados

def PegarPostagens(usuario_nome):
    cur = con.cursor()
    cur.execute("""SELECT 
DISTINCT ON (posts.id_post)
pictures.url_picture, posts.id_post FROM 
pictures 
INNER JOIN 
posts 
ON posts.id_post = pictures.id_post 
INNER JOIN 
users 
ON posts.id_user = users.id_user
WHERE
users.name =\'""" + usuario_nome + "\' ORDER BY posts.id_post DESC;");

    lista_postagens = cur.fetchall();

    usuario_postagens = {
            "lista_postagens":lista_postagens
    }

    cur.close();

    return usuario_postagens

def PegarSeguindo(usuario_nome, flag_seguindo):
    cur = con.cursor()
    if flag_seguindo:
        cur.execute("SELECT b.name,b.url_pic_perfil FROM users a INNER JOIN rel_user_user ON a.id_user = rel_user_user.id_user INNER JOIN users b ON b.id_user = rel_user_user.id_follow WHERE a.name = \'" + usuario_nome +"\';")
    else:
        cur.execute("SELECT a.name,b.url_pic_perfil FROM users a INNER JOIN rel_user_user ON a.id_user = rel_user_user.id_user INNER JOIN users b ON b.id_user = rel_user_user.id_follow WHERE b.name = \'" + usuario_nome +"\';")

    lista_seguindo = cur.fetchall()
    cur.close()


    print(lista_seguindo)

    for i in range(len(lista_seguindo)):
        if lista_seguindo[i][1] == None:
            lista_seguindo[i] = (lista_seguindo[i][0], 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg')

    usuario_seguindo = {
            "lista_seguindo":lista_seguindo
            }

    return usuario_seguindo

def PegarPostagensTag(tag_nome):
    cur = con.cursor()
    cur.execute("WITH post_thumb AS (SELECT ROW_NUMBER() OVER (PARTITION BY id_post ORDER BY pics.id_picture ASC) m, pics.url_picture, pics.id_post FROM pictures pics) SELECT post_thumb.url_picture, p.id_post FROM post_thumb INNER JOIN posts p ON p.id_post = post_thumb.id_post INNER JOIN rel_tag_post rtp ON rtp.id_post = post_thumb.id_post INNER JOIN tags t ON t.id_tag = rtp.id_tag WHERE m = 1 AND name = \'" + tag_nome + "\' ORDER BY p.create_date DESC;")
    
    lista_postagens = cur.fetchall()
    cur.close()

    print(lista_postagens)

    postagens_tag = {
            "lista_postagens":lista_postagens,
            "tag_nome":tag_nome
            }

    return postagens_tag

@app.get("/u/{usuario_nome}", response_class=HTMLResponse)
async def get_user(request: Request, usuario_nome: str):
    usuario_dados = PegarUsuario(usuario_nome)
    usuario_postagens = PegarPostagens(usuario_nome)
    return templates.TemplateResponse("usuario_postagens.html", {"request": request, "data": usuario_dados, "usuario_postagens": usuario_postagens})


@app.get("/u/{usuario_nome}/seguindo", response_class=HTMLResponse)
async def get_user_following(request: Request, usuario_nome: str):
    usuario_dados = PegarUsuario(usuario_nome)
    usuario_seguindo = PegarSeguindo(usuario_nome, True)
    return templates.TemplateResponse("usuario_seguindo.html", {"request": request, "data": usuario_dados, "usuario_seguindo": usuario_seguindo})

@app.get("/u/{usuario_nome}/seguidores", response_class=HTMLResponse)
async def get_user_followers(request: Request, usuario_nome: str):
    usuario_dados = PegarUsuario(usuario_nome)
    usuario_seguindo = PegarSeguindo(usuario_nome, False)
    return templates.TemplateResponse("usuario_seguindo.html", {"request": request, "data": usuario_dados, "usuario_seguindo": usuario_seguindo})

@app.get("/t/{tag_nome}", response_class=HTMLResponse)
async def get_tag_posts(request: Request, tag_nome: str):
    postagens_tag = PegarPostagensTag(tag_nome)
    return templates.TemplateResponse("tag.html", {"request": request, "postagens_tag": postagens_tag})

@app.get("/s/{usuario_nome}", response_class=HTMLResponse)
async def search_user(request: Request, usuario_nome: str):
    usuarios = PegarUsuarios(usuario_nome)
    return templates.TemplateResponse("usuario.html", {"request": request, "usuarios": usuarios})

@app.post("/pesquisar")
async def search(request: Request, nome: str = Form(...)):
    if nome[0] == '#':
        postagens_tag = PegarPostagensTag(nome[1:])
        return templates.TemplateResponse("tag.html", {"request": request, "postagens_tag": postagens_tag})
    if nome[0] == '@':
        usuarios = PegarUsuarios(nome[1:])
        return templates.TemplateResponse("usuario.html", {"request": request, "usuarios": usuarios})
