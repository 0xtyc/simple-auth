from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tortoise.contrib.fastapi import register_tortoise
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# CORS if needed for your frontend domain/port
origins = [
    "http://localhost:4200" # Angular local frontend
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import and include auth routes
from app.routes import auth
app.include_router(auth.router)


# Database configuration
DB_URL = os.getenv("DATABASE_URL", "sqlite://./local.db")
register_tortoise(
    app,
    db_url=DB_URL,
    modules={"models": ["app.models"]},
    generate_schemas=True,
    add_exception_handlers=True,
)