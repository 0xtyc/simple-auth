import pytest
from app.models import User

@pytest.fixture
def user():
    # Fixture to create a User instance
    return User(name="Test User", email="test@example.com")

def test_set_password(user):
    password = "securepassword"
    user.set_password(password)
    
    # Check that the password is hashed and not equal to the plain password
    assert user.password_hash != password

def test_verify_password(user):
    password = "securepassword"
    user.set_password(password)
    
    # Verify the correct password
    assert user.verify_password(password) is True
    # Verify an incorrect password
    assert user.verify_password("wrongpassword") is False