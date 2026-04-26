# Backend
cd backend
cmd /c "venv\Scripts\activate.bat && uvicorn app.main:app --reload --port 8000"

---

# Frontend
cd frontend 
cmd /c "npm run dev"
