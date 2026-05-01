-- LeapFrog Connect MVP schema
-- Core loop only: progress -> readiness -> matching -> hiring
create extension if not exists "uuid-ossp";

create table if not exists public.users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  hashed_password text not null,
  full_name text not null,
  role text not null check (role in ('student','employer','admin')),
  phone text,
  location text,
  bio text,
  skills text[] default '{}',
  profile_picture_url text,
  is_profile_public boolean default true,
  is_active boolean default true,
  email_verified boolean default false,
  notifications_enabled boolean default true,
  deleted_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.progress (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references public.users(id) on delete cascade,
  quiz_score integer not null check (quiz_score >= 0 and quiz_score <= 100),
  submissions_on_time integer not null default 0,
  total_submissions integer not null default 0,
  engagement_score integer not null check (engagement_score >= 0 and engagement_score <= 100),
  completion_status boolean not null default false,
  week_number integer not null,
  recorded_at timestamptz default now()
);

create table if not exists public.courses (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  category text,
  created_by uuid references public.users(id) on delete set null,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.enrollments (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references public.users(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  progress_percent integer default 0,
  enrolled_at timestamptz default now(),
  completed_at timestamptz
);

create table if not exists public.readiness_scores (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references public.users(id) on delete cascade,
  score numeric not null,
  avg_assessment_score numeric not null,
  submission_rate numeric not null,
  mentor_quality_rating numeric not null,
  computed_at timestamptz default now(),
  week_number integer not null
);

create table if not exists public.jobs (
  id uuid primary key default uuid_generate_v4(),
  employer_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  description text,
  required_skills text[] default '{}',
  experience_level text,
  salary_min_npr integer,
  salary_max_npr integer,
  location text,
  is_active boolean default true,
  is_approved boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.applications (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references public.users(id) on delete cascade,
  job_id uuid not null references public.jobs(id) on delete cascade,
  status text default 'Applied',
  kanban_column text default 'applied',
  applied_at timestamptz default now(),
  updated_at timestamptz default now(),
  notes text
);

create table if not exists public.refresh_tokens (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  token text unique not null,
  created_at timestamptz default now(),
  revoked_at timestamptz
);

create table if not exists public.registration_requests (
  id uuid primary key default uuid_generate_v4(),
  email text not null,
  payload jsonb default '{}'::jsonb,
  code text not null,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

create table if not exists public.ai_result_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete set null,
  endpoint text not null,
  input_payload jsonb default '{}'::jsonb,
  output_payload jsonb default '{}'::jsonb,
  mode text not null default 'demo',
  note text,
  created_at timestamptz default now()
);

create index if not exists idx_progress_student on public.progress(student_id);
create index if not exists idx_progress_week on public.progress(week_number);
create index if not exists idx_courses_active on public.courses(is_active);
create index if not exists idx_enrollments_student on public.enrollments(student_id);
create index if not exists idx_enrollments_course on public.enrollments(course_id);
create index if not exists idx_readiness_student on public.readiness_scores(student_id);
create index if not exists idx_readiness_week on public.readiness_scores(week_number);
create index if not exists idx_jobs_employer on public.jobs(employer_id);
create index if not exists idx_applications_student on public.applications(student_id);
create index if not exists idx_applications_job on public.applications(job_id);
create index if not exists idx_ai_logs_user on public.ai_result_logs(user_id);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_users_updated_at on public.users;
create trigger trg_users_updated_at before update on public.users
for each row execute procedure public.set_updated_at();

