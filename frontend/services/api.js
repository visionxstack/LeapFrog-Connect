import client from '../api/client'

export const AuthAPI = {
  register: (data) => client.post('/auth/register', data),
  login: (data) => client.post('/auth/login', data),
  me: () => client.get('/auth/me'),
  refresh: (refresh_token) => client.post('/auth/refresh', { refresh_token }),
  logout: (refresh_token) => client.post('/auth/logout', { refresh_token }),
}

export const CourseAPI = {
  list: () => client.get('/courses'),
  get: (id) => client.get(`/courses/${id}`),
  enroll: (id) => client.post(`/courses/${id}/enroll`),
  my: () => client.get('/courses/my'),
  updateProgress: (id, progress_percent) => client.put(`/courses/${id}/progress`, { progress_percent }),
}

export const JobAPI = {
  list: () => client.get('/jobs'),
  apply: (job_id) => client.post('/applications', { job_id }),
}

export const StudentAPI = {
  profile: () => client.get('/users/profile'),
  updateProfile: (data) => client.put('/users/profile', data),
  certificates: () => client.get('/certificates/my'),
  applications: () => client.get('/applications/my'),
  enrollments: () => client.get('/courses/my'),
}

export const CompanyAPI = {
  postJob: (data) => client.post('/jobs', data),
  listJobs: () => client.get('/jobs/my'),
  applicants: (jobId) => client.get(`/applications/job/${jobId}`),
  updateStatus: (appId, status) => client.put(`/applications/${appId}/status`, { status }),
  moveKanban: (appId, kanban_column) => client.put(`/applications/${appId}/kanban`, { kanban_column }),
  kanban: (jobId) => client.get(`/applications/kanban/${jobId}`),
}

export const AdminAPI = {
  stats: () => client.get('/admin/stats'),
  mentorAlerts: () => client.get('/admin/mentor-alerts'),
  updateMentorAlert: (id, alert_sent) => client.put(`/admin/mentor-alerts/${id}`, { alert_sent }),
}

export const AIAPI = {
  skillGap: (data) => client.post('/ai/skill-gap', data),
  talentMatch: (data) => client.post('/ai/talent-match', data),
  interviewQuestions: (data) => client.post('/ai/interview-questions', data),
  courseRecommendations: (data) => client.post('/ai/course-recommendations', data),
}
export default client
