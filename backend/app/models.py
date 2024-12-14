from tortoise import fields
from tortoise.models import Model
from passlib.context import CryptContext

pwd_context =CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100)
    email = fields.CharField(max_length=255, unique=True, index=True)
    password_hash = fields.CharField(max_length=255)
    created_at = fields.DatetimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def set_password(self, password: str):
        self.password_hash = pwd_context.hash(password)
    
    def verify_password(self, password: str):
        return pwd_context.verify(password, self.password_hash)
    