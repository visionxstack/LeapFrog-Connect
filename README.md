# Backend
cd backend
pip install -r requirements.txt
cp .env.example .env   # add your DATABASE_URL and GROQ_API_KEY
alembic upgrade head
uvicorn app.main:app --reload --port 8000

# Frontend
cd frontend
npm install
cp .env.example .env   # set VITE_API_URL=http://localhost:8000
npm run dev
