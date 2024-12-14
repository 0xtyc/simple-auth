from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    name: str = Field()
    email: EmailStr = Field()
    password: str = Field()

class UserLogin(BaseModel):
    email: EmailStr = Field()
    password: str = Field()
