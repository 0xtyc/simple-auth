import jwt
from datetime import datetime, timedelta, timezone
import os

class AuthService:
    SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    ALGORITHM = "HS256"

    @staticmethod
    def create_jwt_token(user_id: int) -> str:
        expiration = datetime.now(timezone.utc) + timedelta(hours=24)
        payload = {
            "sub": str(user_id),
            "exp": int(expiration.timestamp())
        }
        token = jwt.encode(payload, AuthService.SECRET_KEY, algorithm=AuthService.ALGORITHM)
        return token
    
    @staticmethod
    def verify_jwt_token(token: str) -> int:
        print("SECRET_KEY", AuthService.SECRET_KEY)
        try:
            jwt.decode(token, AuthService.SECRET_KEY, algorithms=[AuthService.ALGORITHM])
            return True

        except Exception as e:
            print("Error verifying token", e)
            return False
