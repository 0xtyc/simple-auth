import pytest
from fastapi.testclient import TestClient
from tortoise.contrib.fastapi import register_tortoise
from app.main import app
from tortoise.contrib.test import finalizer, initializer

@pytest.fixture(scope="session", autouse=True)
def test_client():
    register_tortoise(
        app,
        db_url="sqlite://:memory:",  # Use an in-memory SQLite database for testing
        modules={"models": ["app.models"]},
        generate_schemas=True,
        add_exception_handlers=True,
    )
    
    with TestClient(app) as client:
        yield client
