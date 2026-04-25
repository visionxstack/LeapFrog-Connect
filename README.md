# 🇳🇵 LeapFrog Connect

> **Skills-to-Jobs Platform for Nepal** — Learn → Get Certified → Get Hired

A full-stack, AI-powered platform connecting Nepali students with employers through verified certifications and intelligent matching. Think **LinkedIn + Udemy + AI Career Coach**, built specifically for Nepal.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [User Roles](#-user-roles)
- [Tech Stack](#-tech-stack)
- [AI Features](#-ai-features-groq-api)
- [Database Schema](#-database-schema-postgresql--supabase)
- [API Endpoints](#-api-endpoints)
- [Pages & UI](#-pages--ui-structure)
- [Project Structure](#-project-structure)
- [Setup & Installation](#-setup--installation)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Day-by-Day Build Plan](#-day-by-day-hackathon-build-plan)

---

## 🚀 Overview

LeapFrog Connect bridges the gap between students seeking career opportunities and employers looking for verified talent. The platform provides an end-to-end pipeline:

```
Student Learns → Takes Quiz → Earns Certificate → Applies for Jobs → Gets Hired
```

**Key differentiators:**
- ✅ Verified, quiz-based certificates employers can trust
- 🤖 Groq AI-powered skill gap analysis and candidate matching
- 🇳🇵 Built for Nepal's job market and tech ecosystem
- 📊 Full recruitment pipeline management for companies

---

## 👥 User Roles

### 🎓 Student / Candidate
- Create a profile with skills, education, and experience
- Browse and enroll in courses
- Take quizzes and earn verified certificates
- Apply for jobs and track application status
- Use the AI Skill Gap Analyzer to identify missing skills
- Auto-generate a professional bio via the AI Profile Builder

### 🏢 Company / Employer
- Post job openings with required skills
- Browse the verified candidate pool
- AI ranks candidates by job-fit percentage
- Manage hiring pipeline with a Kanban board (`Applied → Interview → Hired`)

### 👨‍💼 Admin (LeapFrog Staff)
- Manage all users, courses, and job listings
- Issue and revoke certifications
- View analytics dashboard with charts and reports

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React + Vite + Tailwind CSS | Fast, responsive UI with modern tooling |
| Backend | Python FastAPI | High-performance async REST API |
| Database | PostgreSQL (Supabase) | Relational DB with auth & realtime |
| AI Engine | Groq API | Skill gap analysis, talent matching, profile builder |
| Frontend Host | Vercel | Zero-config deployment for React/Vite |
| Backend Host | Render / Railway | FastAPI container deployment |
| DB Host | Supabase Cloud | Managed PostgreSQL + Auth + Storage |

**Why this stack?**
- **FastAPI** — Async Python, 10x faster than Django REST, auto-generates OpenAPI docs
- **Supabase PostgreSQL** — Relational integrity for jobs/applications, built-in Row Level Security, free tier
- **Vite** — 10–100x faster dev server vs Create React App, instant hot module replacement
- **Groq API** — Ultra-fast LLM inference for skill gap analysis and candidate matching

---

## 🤖 AI Features (Groq API)

All AI features are FastAPI endpoints that call the Groq API using the `groq` Python SDK.

### 1. Skill Gap Analyzer
`POST /ai/skill-gap`

Student selects a job → AI compares their skill profile against job requirements → Returns structured gap analysis with course recommendations.

```python
from groq import Groq

@router.post('/ai/skill-gap')
async def skill_gap_analyzer(job_id: str, user=Depends(get_current_user)):
    student = get_student_profile(user.id)
    job = get_job(job_id)
    client = Groq()
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        max_tokens=1000,
        messages=[{
            "role": "user",
            "content": f"""
                Student skills: {student.skills}
                Job requires: {job.skills_required}
                Return JSON: {{missing_skills, recommended_courses, match_percent}}
            """
        }]
    )
    return parse_ai_response(response)
```

### 2. AI Talent Matcher
`POST /ai/match-candidates`

Company posts a job → AI scores all candidate profiles and ranks them by fit percentage → Returns sorted list with reasoning.

### 3. AI Profile Builder
`POST /ai/build-profile`

Student fills a simple form (skills, education, goals) → AI generates a professional bio and skill summary → Auto-saved to their profile.

### 4. Course Recommender
`POST /ai/recommend-courses`

Based on student's career goal → AI analyzes available courses → Returns a prioritized learning roadmap.

| Feature | Endpoint | Input → Output |
|---|---|---|
| Skill Gap Analyzer | `POST /ai/skill-gap` | Student + Job → Gap + Courses |
| Talent Matcher | `POST /ai/match-candidates` | Job + All Students → Ranked List |
| Profile Builder | `POST /ai/build-profile` | Form Data → Professional Bio |
| Course Recommender | `POST /ai/recommend-courses` | Career Goal → Course Roadmap |

---

## 🗃️ Database Schema (PostgreSQL / Supabase)

All tables use UUID primary keys. Supabase Auth handles authentication.

### `users`
```sql
CREATE TABLE users (
  id          UUID PRIMARY KEY REFERENCES auth.users(id),
  name        TEXT NOT NULL,
  email       TEXT UNIQUE NOT NULL,
  role        TEXT CHECK (role IN ('student','company','admin')) NOT NULL,
  bio         TEXT,
  skills      TEXT[],
  education   TEXT,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### `courses`
```sql
CREATE TABLE courses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT,
  instructor  TEXT,
  duration    TEXT,
  modules     TEXT[],
  has_quiz    BOOLEAN DEFAULT TRUE,
  has_cert    BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### `jobs`
```sql
CREATE TABLE jobs (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title            TEXT NOT NULL,
  company_id       UUID REFERENCES users(id),
  company_name     TEXT,
  skills_required  TEXT[],
  location         TEXT,
  description      TEXT,
  deadline         DATE,
  is_active        BOOLEAN DEFAULT TRUE,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);
```

### `applications`
```sql
CREATE TABLE applications (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id   UUID REFERENCES users(id),
  job_id       UUID REFERENCES jobs(id),
  status       TEXT CHECK (status IN (
               'Applied','Interview','Hired','Rejected')) DEFAULT 'Applied',
  ai_score     NUMERIC(5,2),
  applied_at   TIMESTAMPTZ DEFAULT NOW()
);
```

### `certificates`
```sql
CREATE TABLE certificates (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id  UUID REFERENCES users(id),
  course_id   UUID REFERENCES courses(id),
  issued_at   TIMESTAMPTZ DEFAULT NOW(),
  badge_url   TEXT
);
```

### `enrollments`
```sql
CREATE TABLE enrollments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id  UUID REFERENCES users(id),
  course_id   UUID REFERENCES courses(id),
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  completed   BOOLEAN DEFAULT FALSE
);
```

---

## 📡 API Endpoints

**Base URL:** `https://api.leapfrogconnect.com/api/v1`  
**Auth:** All protected endpoints require `Authorization: Bearer <supabase_jwt>`

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register new user (student/company) |
| `POST` | `/auth/login` | Login and receive Supabase JWT |
| `GET` | `/auth/me` | Get current authenticated user |

### Student
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/students/profile` | Get student profile |
| `PATCH` | `/students/profile` | Update profile (skills, bio, education) |
| `GET` | `/courses` | List all available courses |
| `POST` | `/courses/{id}/enroll` | Enroll in a course |
| `POST` | `/courses/{id}/submit-quiz` | Submit quiz answers |
| `GET` | `/certificates/mine` | Get all my certificates |
| `GET` | `/jobs` | Browse all job listings |
| `POST` | `/jobs/{id}/apply` | Apply for a job |
| `GET` | `/applications/mine` | Get my application history |

### Company
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/jobs` | Post a new job listing |
| `GET` | `/jobs/mine` | Get company's own job listings |
| `GET` | `/jobs/{id}/applicants` | View all applicants for a job |
| `PATCH` | `/applications/{id}/status` | Update application status |

### Admin
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/admin/users` | List all users |
| `POST` | `/admin/certificates/issue` | Issue certificate manually |
| `GET` | `/admin/analytics` | Platform analytics data |

### AI
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/ai/skill-gap` | Analyze skill gap for a job |
| `POST` | `/ai/match-candidates` | AI-rank candidates for a job |
| `POST` | `/ai/build-profile` | Generate professional bio |
| `POST` | `/ai/recommend-courses` | Get personalized course roadmap |

---

## 🗂️ Pages & UI Structure

### Public (No Login)
- **Home** — Hero section, features, CTA buttons
- **Course Catalog** — Browse all courses with filters
- **Job Board** — Browse all open positions
- **Login & Register** — Role selection: Student / Company

### Student Pages
- **Dashboard** — Progress tracker, applied jobs, earned certificates
- **My Profile** — Skills, education, experience, AI-generated bio
- **Course Detail + Enrollment** — Course info, modules, enroll button
- **Quiz / Assessment** — Take quiz to earn certificate
- **My Certificates** — Gallery of earned certificates
- **Job Listings + Apply** — Search, filter, and apply
- **AI Skill Gap Checker** — Select a job, see your skill gaps + course recommendations

### Company Pages
- **Dashboard** — Overview of posted jobs and applicant stats
- **Post a Job** — Form to create new listing with required skills
- **Candidate Pool** — Browse all verified students with skill filters
- **AI Talent Matcher** — Run AI ranking for any posted job
- **Recruitment Funnel** — Kanban board: `Applied → Interview → Hired`

### Admin Pages
- **Dashboard** — Analytics charts (users, jobs, applications, certificates)
- **Manage Users** — View, edit, deactivate any account
- **Manage Courses** — Create, edit, publish courses
- **Manage Jobs** — Moderate job listings
- **Issue Certificates** — Manually issue or revoke certificates

---

## 📁 Project Structure

### Backend (FastAPI)
```
leapfrog-backend/
├── main.py               # FastAPI app entry point
├── .env                  # Environment variables (never commit!)
├── requirements.txt
├── routers/
│   ├── auth.py           # /auth endpoints
│   ├── students.py       # /students endpoints
│   ├── jobs.py           # /jobs endpoints
│   ├── courses.py        # /courses endpoints
│   ├── ai.py             # /ai endpoints (Groq API)
│   └── admin.py          # /admin endpoints
├── models/
│   ├── user.py           # Pydantic schemas
│   ├── job.py
│   └── course.py
└── utils/
    ├── auth.py           # JWT verification
    ├── supabase.py       # Supabase client
    └── ai.py             # Groq API helpers
```

### Frontend (React + Vite)
```
leapfrog-frontend/
├── src/
│   ├── main.jsx          # Entry point
│   ├── App.jsx           # Routes
│   ├── lib/
│   │   └── supabase.js   # Supabase client init
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── student/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── SkillGap.jsx
│   │   ├── company/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Kanban.jsx
│   │   └── admin/
│   │       └── Dashboard.jsx
│   └── components/
│       ├── Navbar.jsx
│       ├── CourseCard.jsx
│       └── JobCard.jsx
└── tailwind.config.js
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+
- Python 3.11+
- [Supabase](https://supabase.com) account (free)
- [Groq API key](https://console.groq.com)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/leapfrog-connect.git
cd leapfrog-connect
```

### 2. Frontend Setup
```bash
# Create Vite + React project
npm create vite@latest leapfrog-frontend -- --template react
cd leapfrog-frontend

# Install dependencies
npm install
npm install axios react-router-dom recharts
npm install @supabase/supabase-js
npm install @hello-pangea/dnd

# Setup Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Start dev server
npm run dev
```

### 3. Backend Setup
```bash
cd ../leapfrog-backend

# Create virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn[standard]
pip install supabase python-dotenv
pip install groq
pip install python-jose[cryptography] passlib[bcrypt]
pip install httpx pydantic pydantic-settings

# Run development server
uvicorn main:app --reload --port 8000
```

### 4. Database Setup (Supabase)
1. Create a new project at [supabase.com](https://supabase.com)
2. Run all SQL schemas from the [Database Schema](#-database-schema-postgresql--supabase) section above
3. Enable Row Level Security (RLS) on all tables
4. Enable Supabase Auth → configure email sign-up

---

## 🔐 Environment Variables

### Backend `.env`
```env
# Supabase
SUPABASE_URL=https://xyzproject.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Groq
GROQ_API_KEY=gsk_...

# App
ENVIRONMENT=development
ALLOWED_ORIGINS=http://localhost:5173,https://leapfrogconnect.vercel.app
```

### Frontend `.env.local`
```env
VITE_SUPABASE_URL=https://xyzproject.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

> ⚠️ **Never commit `.env` or `.env.local` to Git.** Add them to `.gitignore` immediately.

---

## 📦 Full Dependency List

### Python (`requirements.txt`)
```
fastapi==0.111.0
uvicorn[standard]==0.29.0
supabase==2.4.6
groq==0.9.0
python-dotenv==1.0.1
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
httpx==0.27.0
pydantic==2.7.1
pydantic-settings==2.2.1
```

### Node / React
```
react                     ^18.3.0
react-dom                 ^18.3.0
react-router-dom          ^6.23.0
axios                     ^1.7.0
@supabase/supabase-js     ^2.43.0
recharts                  ^2.12.0
@hello-pangea/dnd         ^16.6.0

# Dev
vite                      ^5.2.0
@vitejs/plugin-react      ^4.3.0
tailwindcss               ^3.4.0
postcss                   ^8.4.0
autoprefixer              ^10.4.0
```

---

## 🚀 Deployment

### Frontend → Vercel
1. Push frontend code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Framework: **Vite** | Root Directory: `leapfrog-frontend`
4. Add environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_BASE_URL`
5. Click Deploy

### Backend → Render
1. Push backend code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service → Connect repo
3. **Build Command:** `pip install -r requirements.txt`
4. **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add all environment variables from `.env` in the Render dashboard
6. Set `ALLOWED_ORIGINS` to include your Vercel domain

### System Architecture
```
User (Browser)
      │
      ▼
React + Vite (Vercel)
      │
      ├─── Supabase JS SDK ──► Supabase Auth + PostgreSQL
      │
      └─── REST API calls ───► FastAPI (Render)
                                     │
                                     └──► Groq API (AI features)
```

---

## 🗓️ Day-by-Day Hackathon Build Plan

### Day 1 — Foundation
| Time | Task |
|---|---|
| AM | Set up Supabase → create all tables → configure Row Level Security |
| AM | Scaffold FastAPI backend → connect Supabase → test DB connection |
| AM | Create Vite + React app → configure Tailwind → set up React Router |
| PM | Build Login & Register pages → integrate Supabase Auth → role-based redirect |
| PM | Student profile page → display and edit skills/education |
| PM | Course catalog page → fetch and display courses |
| PM | Job board page → fetch and display all active job listings |

### Day 2 — Core Features
| Time | Task |
|---|---|
| AM | Course enrollment + quiz page + automatic certificate on pass |
| AM | Job application system → student applies → status tracking |
| PM | Company: post job form → view applicants → update status |
| PM | Recruitment Kanban board → drag-and-drop with `@hello-pangea/dnd` |
| PM | Admin dashboard → Recharts graphs for users, jobs, apps, certs |

### Day 3 — AI Features + Polish + Deploy
| Time | Task |
|---|---|
| AM | AI Skill Gap Analyzer → FastAPI `/ai/skill-gap` → Groq integration |
| AM | AI Talent Matcher → `/ai/match-candidates` → ranked candidate UI |
| AM | AI Profile Builder → `/ai/build-profile` → auto-populate student bio |
| PM | UI polish → mobile responsive → loading states → error handling |
| PM | Deploy backend to Render → deploy frontend to Vercel → test E2E |
| PM | Demo prep → seed test data → record demo video / prepare slides |

---

## 🔮 Future Roadmap

**Short Term**
- SMS notifications via Sparrow SMS (Nepal-local gateway)
- PDF resume generator from student profile
- Mobile app (React Native)

**Medium Term**
- Employer verification system with company document upload
- Multi-language support (Nepali / English)
- Integration with Nepali universities for academic verification

**Long Term**
- Payment integration (eSewa / Khalti) for premium courses
- Mentorship marketplace
- Government partnership for nationally recognized digital certificates
- Expansion to other South Asian markets

---

## 🤝 Team

Built with ❤️ for Nepal at Hackathon 2025.

---

*LeapFrog Connect — Empowering Nepal's next generation of tech talent.*
