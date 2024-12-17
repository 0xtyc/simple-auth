from fastapi import APIRouter, HTTPException, Header
from app.schemas import UserCreate, UserLogin
from app.models import User
from app.services.auth_service import AuthService
router = APIRouter()

@router.post("/signup")
async def signup(user_data: UserCreate):
    existing_user = await User.filter(email=user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already in use")

    user = User(
        name=user_data.name,
        email=user_data.email
    )
    user.set_password(user_data.password)
    await user.save()
    token = AuthService.create_jwt_token(user.id)
    return {"access_token": token, "token_type": "bearer"}

@router.post("/login")
async def login(login_data: UserLogin):
    user = await User.filter(email=login_data.email).first()
    if not user or not user.verify_password(login_data.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    token = AuthService.create_jwt_token(user.id)
    return {"access_token": token, "token_type": "bearer"}

@router.get("/users")
async def get_users(authorization: str = Header(None)):
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
    else:
        raise HTTPException(status_code=401, detail="Invalid authorization header format")

    if not AuthService.verify_jwt_token(token):
        raise HTTPException(status_code=401, detail="Invalid token")
   
    users = await User.all()
    return {"users": [{'id': user.id, 'name': user.name, 'email': user.email} for user in users]}
