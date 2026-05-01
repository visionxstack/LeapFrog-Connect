from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import (
    users, jobs, applications, readiness, ai, payments, admin, courses
)
from app.auth.router import router as auth_router
from app.database import async_session, Base, engine
from database.seed import seed_demo_data

app = FastAPI(
    title="LeapFrog Connect API",
    version="1.0.0",
    description="Skills-to-Jobs Platform for Nepal",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in settings.allowed_origins.split(",") if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(courses.router, prefix="/courses", tags=["Courses"])
app.include_router(jobs.router, prefix="/jobs", tags=["Jobs"])
app.include_router(applications.router, prefix="/applications", tags=["Applications"])
app.include_router(readiness.router, prefix="/readiness", tags=["Readiness"])
app.include_router(ai.router, prefix="/ai", tags=["AI"])
app.include_router(payments.router, prefix="/payments", tags=["Payments"])
app.include_router(admin.router, prefix="/admin", tags=["Admin"])


@app.get("/")
def root():
    return {"message": "LeapFrog Connect API", "status": "running", "version": "1.0.0"}


@app.get("/health")
def health():
    return {"status": "healthy", "mode": settings.app_mode}


@app.on_event("startup")
async def startup_tasks():
    if settings.database_url:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    if settings.app_mode == "demo" and async_session is not None:
        await seed_demo_data()

