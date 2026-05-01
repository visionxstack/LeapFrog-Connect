import asyncio

from sqlalchemy import select

from app.database import async_session, Base, engine
from app.models.course import Course, Enrollment
from app.models.user import User
from app.models.job import Job
from app.models.application import Application
from app.models.progress import Progress
from app.models.readiness import ReadinessScore
from app.services.readiness_service import compute_readiness_score
from app.auth.utils import hash_password


STUDENTS = [
    {
        "full_name": "Aarav Shrestha",
        "email": "aarav@demo.com",
        "skills": ["Python", "FastAPI", "SQL"],
        "bio": "Computer Science student with strong backend development skills",
        "progress": [
            {"week_number": 15, "quiz_score": 87, "submissions_on_time": 9, "total_submissions": 10, "engagement_score": 80, "completion_status": True},
            {"week_number": 16, "quiz_score": 89, "submissions_on_time": 9, "total_submissions": 10, "engagement_score": 82, "completion_status": True},
            {"week_number": 17, "quiz_score": 90, "submissions_on_time": 9, "total_submissions": 10, "engagement_score": 80, "completion_status": True},
        ],
    },
    {
        "full_name": "Sita Sharma",
        "email": "sita@demo.com",
        "skills": ["HTML", "CSS", "Python (basic)"],
        "bio": "Self-taught learner transitioning into tech",
        "progress": [
            {"week_number": 15, "quiz_score": 58, "submissions_on_time": 6, "total_submissions": 10, "engagement_score": 50, "completion_status": False},
            {"week_number": 16, "quiz_score": 63, "submissions_on_time": 6, "total_submissions": 10, "engagement_score": 55, "completion_status": False},
            {"week_number": 17, "quiz_score": 65, "submissions_on_time": 6, "total_submissions": 10, "engagement_score": 55, "completion_status": False},
        ],
    },
    {
        "full_name": "Rohan KC",
        "email": "rohan@demo.com",
        "skills": ["Basic computer literacy"],
        "bio": "Beginner exploring programming for the first time",
        "progress": [
            {"week_number": 15, "quiz_score": 46, "submissions_on_time": 4, "total_submissions": 10, "engagement_score": 42, "completion_status": False},
            {"week_number": 16, "quiz_score": 43, "submissions_on_time": 3, "total_submissions": 10, "engagement_score": 38, "completion_status": False},
            {"week_number": 17, "quiz_score": 42, "submissions_on_time": 3, "total_submissions": 10, "engagement_score": 35, "completion_status": False},
        ],
    },
]

EMPLOYERS = [
    ("TechNova Nepal", "technova@demo.com"),
    ("Kathmandu Startup Hub", "startup@demo.com"),
]


async def seed_demo_data():
    async with async_session() as db:
        # Admin
        admin = await db.execute(select(User).where(User.email == "admin@leapfrog.com"))
        if not admin.scalar_one_or_none():
            db.add(User(email="admin@leapfrog.com", hashed_password=hash_password("Admin@123"), full_name="Leapfrog Admin", role="admin", email_verified=True))

        # Employers
        for name, email in EMPLOYERS:
            existing = (await db.execute(select(User).where(User.email == email))).scalar_one_or_none()
            if not existing:
                db.add(User(email=email, hashed_password=hash_password("Employer@123"), full_name=name, role="employer", location="Kathmandu", email_verified=True))

        # Students
        for student in STUDENTS:
            existing = (await db.execute(select(User).where(User.email == student["email"]))).scalar_one_or_none()
            if not existing:
                db.add(
                    User(
                        email=student["email"],
                        hashed_password=hash_password("Student@123"),
                        full_name=student["full_name"],
                        role="student",
                        location="Kathmandu",
                        skills=student["skills"],
                        bio=student["bio"],
                        email_verified=True,
                    )
                )

        await db.commit()

        employers = (await db.execute(select(User).where(User.role == "employer"))).scalars().all()
        jobs = (await db.execute(select(Job))).scalars().all()
        if not jobs and employers:
            e = employers[0]
            db.add(Job(employer_id=e.id, title="Backend Developer Intern", description="Build FastAPI APIs and SQL data services.", required_skills=["Python", "FastAPI", "SQL"], salary_min_npr=60000, salary_max_npr=90000, location="Kathmandu", is_active=True, is_approved=True))
            db.add(Job(employer_id=e.id, title="Frontend Developer Intern", description="Build responsive frontend features for web dashboards.", required_skills=["HTML", "CSS", "JavaScript"], salary_min_npr=35000, salary_max_npr=55000, location="Pokhara", is_active=True, is_approved=True))
            await db.commit()

        courses = (await db.execute(select(Course))).scalars().all()
        if not courses:
            db.add(Course(title="Python Fundamentals", description="Core Python and problem solving", category="Programming"))
            db.add(Course(title="Frontend Foundations", description="HTML, CSS, and JS for web apps", category="Web Development"))
            db.add(Course(title="Career Communication", description="Interview communication and teamwork", category="Soft Skills"))
            await db.commit()

        # Simple applications (no kanban workflow)
        students = (await db.execute(select(User).where(User.role == "student"))).scalars().all()
        jobs = (await db.execute(select(Job))).scalars().all()
        if students and jobs:
            existing = (await db.execute(select(Application))).scalars().first()
            if not existing:
                db.add(Application(student_id=students[0].id, job_id=jobs[0].id, status="Interview"))
                db.add(Application(student_id=students[1].id, job_id=jobs[1].id, status="Applied"))
                db.add(Application(student_id=students[2].id, job_id=jobs[1].id, status="Applied"))
                await db.commit()

        # Demo enrollments for instant dashboard
        courses = (await db.execute(select(Course))).scalars().all()
        if students and courses:
            first = students[0]
            for c in courses[:2]:
                exists = (
                    await db.execute(select(Enrollment).where(Enrollment.student_id == first.id, Enrollment.course_id == c.id))
                ).scalars().first()
                if not exists:
                    db.add(Enrollment(student_id=first.id, course_id=c.id, progress_percent=70))
            await db.commit()

        # Progress (raw signals) and computed readiness history
        if students:
            has_progress = (await db.execute(select(Progress))).scalars().first()
            if not has_progress:
                by_email = {u.email: u for u in students}
                for student in STUDENTS:
                    user = by_email.get(student["email"])
                    if not user:
                        continue
                    for p in student["progress"]:
                        db.add(
                            Progress(
                                student_id=user.id,
                                quiz_score=p["quiz_score"],
                                submissions_on_time=p["submissions_on_time"],
                                total_submissions=p["total_submissions"],
                                engagement_score=p["engagement_score"],
                                completion_status=p["completion_status"],
                                week_number=p["week_number"],
                            )
                        )
                await db.commit()

            for s in students:
                for week in [15, 16, 17]:
                    existing_score = (
                        await db.execute(
                            select(ReadinessScore).where(ReadinessScore.student_id == s.id, ReadinessScore.week_number == week)
                        )
                    ).scalars().first()
                    if not existing_score:
                        await compute_readiness_score(db, str(s.id), week_number=week)

    print("Demo seed complete.")


async def main():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    await seed_demo_data()


if __name__ == "__main__":
    asyncio.run(main())

