from fastapi import APIRouter, HTTPException
from app.schemas import UserCreate, UserLogin
from app.models import User

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
    return {"message": "User created successfully"}

@router.post("/login")
async def login(login_data: UserLogin):
    user = await User.filter(email=login_data.email).first()
    if not user or not user.verify_password(login_data.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    # token = create_jwt_token(user.id)
    # return {"access_token": token, "token_type": "bearer"}
    return {"message": "User logged in successfully"}

@router.get("/users")
async def get_users():
    users = await User.all()
    return {"users": users}
