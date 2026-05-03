## ⚠️ Disclaimer

This project is still under active development.  
It may contain bugs, unfinished features, or unstable behavior.

**Do not use this in production environments.**  
I'm still working on improving reliability, fixing issues, and refining the overall architecture.

# Under Testing

## Kill Backend (8000)
Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }

## Kill Frontend (3000)
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }

## RUNN
cd backend
.\venv\Scripts\python.exe -m uvicorn main:app --port 8000 --reload
