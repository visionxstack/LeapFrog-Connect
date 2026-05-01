import uuid
from datetime import datetime

from sqlalchemy import String, DateTime, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class AIResultLog(Base):
    __tablename__ = "ai_result_logs"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    endpoint: Mapped[str] = mapped_column(String, nullable=False)
    input_payload: Mapped[dict] = mapped_column(JSONB, default=dict)
    output_payload: Mapped[dict] = mapped_column(JSONB, default=dict)
    mode: Mapped[str] = mapped_column(String, nullable=False, default="demo")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    note: Mapped[str | None] = mapped_column(Text, nullable=True)
