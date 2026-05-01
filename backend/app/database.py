from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from app.config import settings

engine = None
async_session = None

if settings.database_url:
    engine = create_async_engine(
        settings.database_url,
        echo=False,
        future=True,
    )
    async_session = async_sessionmaker(
        engine,
        class_=AsyncSession,
        expire_on_commit=False,
        autoflush=False,
        autocommit=False,
    )

Base = declarative_base()

async def get_db():
    if async_session is None:
        raise RuntimeError("DATABASE_URL is not set. Fill backend/.env then restart the server.")
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()
