import uuid
from datetime import datetime

from sqlalchemy import DateTime, Integer, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Progress(Base):
    __tablename__ = "progress"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), index=True, nullable=False)
    quiz_score: Mapped[int] = mapped_column(Integer, nullable=False)
    submissions_on_time: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    total_submissions: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    engagement_score: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    completion_status: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    recorded_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    week_number: Mapped[int] = mapped_column(Integer, index=True, nullable=False)
