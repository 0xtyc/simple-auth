from fastapi.testclient import TestClient
from fastapi import status
from app.main import app 

def test_signup():
    with TestClient(app) as client:
        response = client.post("/signup", json={
            "name": "Test User",
            "email": "testuser@example.com",
            "password": "securepassword"
        })
        assert response.status_code == status.HTTP_200_OK
        assert "access_token" in response.json()

        response = client.post("/signup", json={
            "name": "Test User",
            "email": "testuser@example.com",
            "password": "securepassword"
        })
        assert response.status_code == status.HTTP_400_BAD_REQUEST  
  

def test_login():
    with TestClient(app) as client:
        client.post("/signup", json={
            "name": "Test User",
            "email": "testuser@example.com",
            "password": "securepassword"
        })
        response = client.post("/login", json={
            "email": "testuser@example.com",
            "password": "securepassword"
        })
        assert response.status_code == status.HTTP_200_OK
        assert "access_token" in response.json()


def test_get_users():
    with TestClient(app) as client:
        signup_response = client.post("/signup", json={
            "name": "Test User",
            "email": "testuser@example.com",
            "password": "securepassword"
        })
        token = signup_response.json()["access_token"]

        # Use the token to access the protected route
        response = client.get("/users", headers={"Authorization": f"Bearer {token}"})
        assert response.status_code == status.HTTP_200_OK
        assert "users" in response.json()
        assert len(response.json()["users"]) == 1

def test_get_users_unauthorized():
    with TestClient(app) as client:
        response = client.get("/users")
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
