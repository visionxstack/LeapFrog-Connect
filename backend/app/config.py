from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # Database
    database_url: str = ""

    # Auth
    jwt_secret_key: str = ""
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 7

    # AI
    groq_api_key: str = ""

    # Email (Gmail SMTP for OTP)
    email_user: str = ""
    email_pass: str = ""
    email_from_name: str = "LeapFrog Connect"

    # App
    app_mode: str = "demo"  # demo | production
    app_env: str = "development"
    frontend_url: str = "http://localhost:5173"
    backend_url: str = "http://localhost:8000"
    allowed_origins: str = "http://localhost:5173"

    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()
