from typing import Union
from fastapi import FastAPI
import requests

app = FastAPI()
url = (
    'https://newsapi.org/v2/top-headlines?'
    'country=us&'
    'apiKey=51e20c02a1a94a058dba51999e2109be'
)

response = requests.get(url)

@app.get("/")
def home():
    return requests.get(url).json()
