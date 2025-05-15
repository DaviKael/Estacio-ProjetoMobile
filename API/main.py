from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

url = (
    'https://newsapi.org/v2/top-headlines?'
    'country=us&'
    'apiKey=51e20c02a1a94a058dba51999e2109be'
)

noticias = requests.get(url).json()

@app.get("/")
def home():
    return noticias

def setup_cors(app):
    origins = [
        "http://localhost.tiangolo.com",
        "https://localhost.tiangolo.com",
        "http://localhost",
        "http://localhost:8080",
        "http://localhost:8081",
        "http://127.0.0.1:8000",
        "http://127.0.0.1:8000/",
        "http://127.0.0.1:8081/",
        "http://0.0.0.0:8000",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

setup_cors(app)
