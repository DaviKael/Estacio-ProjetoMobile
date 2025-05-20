from fastapi import FastAPI
from fastapi import APIRouter
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()
router = APIRouter()

def setup_cors(app):
    origins = [
        "http://localhost",
        "http://localhost:8080",
        "http://localhost:8081",
        "http://127.0.0.1:8000",
        "http://127.0.0.1:8000/",
        "http://127.0.0.1:8081/",
        "http://0.0.0.0:8000",
        "http://10.0.3.2:8000/",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

setup_cors(app)

url = (
    'https://newsapi.org/v2/top-headlines?'
    'country=us&'
    'apiKey=51e20c02a1a94a058dba51999e2109be'
)

noticias = requests.get(url).json()

getEsportes = (
    'https://newsapi.org/v2/top-headlines?'
    'category=sports&'
    'apiKey=51e20c02a1a94a058dba51999e2109be'
)

getSaude = (
    'https://newsapi.org/v2/top-headlines?'
    'category=health&'
    'apiKey=51e20c02a1a94a058dba51999e2109be'
)

getCiencia = (
    'https://newsapi.org/v2/top-headlines?'
    'category=science&'
    'apiKey=51e20c02a1a94a058dba51999e2109be'
)

getTecnologia = (
    'https://newsapi.org/v2/top-headlines?'
    'category=technology&'
    'apiKey=51e20c02a1a94a058dba51999e2109be'
)

esportes = requests.get(getEsportes).json()
saude = requests.get(getSaude).json()
ciencia = requests.get(getCiencia).json()
tecnologia = requests.get(getTecnologia).json()

@app.get("/")
def get_home():
    return noticias

@app.get("/esportes")
def get_esportes():
    return esportes

@app.get("/saude")
def get_saude():
    return saude

@app.get("/ciencia")
def get_ciencia():
    return ciencia

@app.get("/tecnologia")
def get_tecnologia():
    return tecnologia

@router.get("/noticias")
def get_noticias():
    return noticias
