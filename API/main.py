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

indice = "country=us"
key = "51e20c02a1a94a058dba51999e2109be"
url = f"https://newsapi.org/v2/top-headlines?{indice}&apiKey={key}"

request = requests.get(url).json()


@app.get("/")
def get_home():
    return request


@router.get("/{busca}")
def get_filtrar(busca: str):
    if busca.lower() == "saude":
        indice = "category=health"

    elif busca.lower() == "tecnologia":
        indice = "category=technology"

    elif busca.lower() == "esportes":
        indice = "category=sports"

    elif busca.lower() == "ciencia":
        indice = "category=science"
    else:
        indice = "q=" + busca.lower()
    url = f"https://newsapi.org/v2/top-headlines?{indice}&apiKey={key}"

    return requests.get(url).json()


app.include_router(router)
