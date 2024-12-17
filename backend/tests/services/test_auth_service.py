import jwt
from app.services.auth_service import AuthService

def test_create_jwt_token(monkeypatch):
    monkeypatch.setattr('app.services.auth_service.AuthService.SECRET_KEY', 'test_secret')
    user_id = 123
    token = AuthService.create_jwt_token(user_id)
    
    # Decode the token to verify its contents
    decoded_payload = jwt.decode(token, 'test_secret', algorithms=[AuthService.ALGORITHM])
    
    assert decoded_payload['sub'] == str(user_id)
    assert 'exp' in decoded_payload

def test_verify_jwt_token_valid(monkeypatch):
    monkeypatch.setattr('app.services.auth_service.AuthService.SECRET_KEY', 'test_secret')
    user_id = 123
    token = AuthService.create_jwt_token(user_id)
    
    # Verify the token
    is_valid = AuthService.verify_jwt_token(token)
    
    assert is_valid

def test_verify_jwt_token_invalid(monkeypatch):
    monkeypatch.setattr('app.services.auth_service.AuthService.SECRET_KEY', 'test_secret')
    # Create a token with a different secret
    token = jwt.encode({'sub': '123'}, 'wrong_secret', algorithm=AuthService.ALGORITHM)
    
    # Verify the token
    is_valid = AuthService.verify_jwt_token(token)
    
    assert not is_valid