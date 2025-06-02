from fastapi import FastAPI, HTTPException
from fastapi import APIRouter
from fastapi.middleware.cors import CORSMiddleware
import requests
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="NewsHub API", version="1.0.0")
router = APIRouter()

def setup_cors(app):
    origins = [
        "*"
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

setup_cors(app)

NEWS_API_KEY = os.getenv("NEWS_API_KEY")
NEWS_API_BASE_URL = os.getenv("NEWS_API_BASE_URL")

CATEGORY_MAPPING = {
    "saude": "health",
    "tecnologia": "technology", 
    "esportes": "sports",
    "ciencia": "science",
    "negocios": "business",
    "entretenimento": "entertainment"
}

COUNTRY_MAPPING = {
    "brasil": "br",
    "eua": "us",
    "reino_unido": "gb"
}

def build_news_url(endpoint: str, params: dict) -> str:
    """Constrói URL da NewsAPI com parâmetros"""
    base_url = f"{NEWS_API_BASE_URL}/{endpoint}"
    params["apiKey"] = NEWS_API_KEY

    query_params = "&".join([f"{k}={v}" for k, v in params.items() if v])
    return f"{base_url}?{query_params}"

def make_news_request(url: str) -> dict:
    """Faz requisição para NewsAPI com tratamento de erro"""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar notícias: {str(e)}")

@router.get("/")
def get_top_headlines():
    """Retorna as principais manchetes do Brasil"""
    params = {
        "country": "br",
        "pageSize": 20
    }
    url = build_news_url("top-headlines", params)
    return make_news_request(url)

@router.get("/{busca}")
def get_filtrar(busca: str, page: int = 1, pageSize: int = 20, sortBy: str = "publishedAt"):
    """
    Busca notícias por categoria ou palavra-chave

    Args:
        busca: Categoria ou palavra-chave para buscar
        page: Página dos resultados (padrão: 1)
        pageSize: Número de artigos por página (máximo: 100)
        sortBy: Ordenação (publishedAt, relevancy, popularity)
    """

    # Limita pageSize para evitar sobrecarga
    pageSize = min(pageSize, 100)

    params = {
        "page": page,
        "pageSize": pageSize,
        "sortBy": sortBy
    }

    # Verifica se é uma categoria conhecida
    if busca.lower() in CATEGORY_MAPPING:
        params["category"] = CATEGORY_MAPPING[busca.lower()]
        params["country"] = "br"  # Para categorias, usa país Brasil
        endpoint = "top-headlines"
    else:
        # Para buscas gerais, usa everything endpoint
        params["q"] = busca.lower()
        params["language"] = "pt"
        # Filtra por data (últimos 30 dias para everything endpoint)
        from_date = (datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d")
        params["from"] = from_date
        endpoint = "everything"

    url = build_news_url(endpoint, params)
    return make_news_request(url)

@router.get("/sources/")
def get_sources(country: str = "br", language: str = "pt"):
    """Retorna fontes de notícias disponíveis"""
    params = {
        "country": country,
        "language": language
    }
    url = build_news_url("sources", params)
    return make_news_request(url)

@router.get("/trending/{topic}")
def get_trending_topic(topic: str, days: int = 7):
    """
    Busca notícias sobre um tópico específico nos últimos dias

    Args:
        topic: Tópico para buscar (ex: "bitcoin", "petrobras")
        days: Número de dias para buscar (padrão: 7)
    """
    from_date = (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")

    params = {
        "q": topic,
        "language": "pt",
        "from": from_date,
        "sortBy": "popularity",
        "pageSize": 50
    }

    url = build_news_url("everything", params)
    return make_news_request(url)

app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
