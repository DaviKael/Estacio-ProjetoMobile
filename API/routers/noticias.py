from fastapi import APIRouter
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()
router = APIRouter()


parameters = 'q=elon'
url = (
    'https://newsapi.org/v2/top-headlines?' +
    parameters + 
    '&apiKey=51e20c02a1a94a058dba51999e2109be'
)

noticias = requests.get(url).json()

@router.get("/noticias")
def home():
    return noticias

@router.get("/noticias/esportes")
def custom_query():
    return noticias

# @app.get("/")
# def home():
#     return requests.get(url).json()

def setup_cors(app):
    origins = [
        "http://localhost.tiangolo.com",
        "https://localhost.tiangolo.com",
        "http://localhost",
        "http://localhost:8080",
        "http://localhost:8081",
        "http://127.0.0.1:8000",
        "http://127.0.0.1:8081"
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(router)
setup_cors(app)
