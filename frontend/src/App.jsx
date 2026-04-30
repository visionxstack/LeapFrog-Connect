import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'

import LandingPage from './pages/public/LandingPage'
import LoginPage from './pages/public/LoginPage'
import RegisterPage from './pages/public/RegisterPage'
import ForgotPasswordPage from './pages/public/ForgotPasswordPage'
import CourseCatalog from './pages/public/CourseCatalog'
import JobBoard from './pages/public/JobBoard'

import StudentDashboard from './pages/student/StudentDashboard'
import StudentProfile from './pages/student/StudentProfile'
import StudentCourses from './pages/student/StudentCourses'
import CourseDetail from './pages/student/CourseDetail'
import QuizPage from './pages/student/QuizPage'
import StudentCertificates from './pages/student/StudentCertificates'
import StudentJobs from './pages/student/StudentJobs'
import StudentApplications from './pages/student/StudentApplications'
import AISkillGap from './pages/student/AISkillGap'
import AICourseRecommender from './pages/student/AICourseRecommender'

import CompanyDashboard from './pages/company/CompanyDashboard'
import PostJob from './pages/company/PostJob'
import Candidates from './pages/company/Candidates'
import AIMatcher from './pages/company/AIMatcher'
import Recruitment from './pages/company/Recruitment'
import CompanyCourses from './pages/company/CompanyCourses'
import InterviewPrep from './pages/company/InterviewPrep'

import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminCourses from './pages/admin/AdminCourses'
import AdminJobs from './pages/admin/AdminJobs'
import AdminCertificates from './pages/admin/AdminCertificates'
import AdminAlerts from './pages/admin/AdminAlerts'

import ProfileView from './pages/public/ProfileView'
import DemoRoleSwitcher from './components/common/DemoRoleSwitcher'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        <Routes location={location}>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/courses" element={<CourseCatalog />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/jobs" element={<JobBoard />} />
          <Route path="/profile/:id" element={<ProfileView />} />

          {/* Student */}
          <Route path="/student/dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/profile" element={<ProtectedRoute role="student"><StudentProfile /></ProtectedRoute>} />
          <Route path="/student/courses" element={<ProtectedRoute role="student"><StudentCourses /></ProtectedRoute>} />
          <Route path="/student/course/:id" element={<ProtectedRoute role="student"><CourseDetail /></ProtectedRoute>} />
          <Route path="/student/quiz/:id" element={<ProtectedRoute role="student"><QuizPage /></ProtectedRoute>} />
          <Route path="/student/certificates" element={<ProtectedRoute role="student"><StudentCertificates /></ProtectedRoute>} />
          <Route path="/student/jobs" element={<ProtectedRoute role="student"><StudentJobs /></ProtectedRoute>} />
          <Route path="/student/applications" element={<ProtectedRoute role="student"><StudentApplications /></ProtectedRoute>} />
          <Route path="/student/ai-skill-gap" element={<ProtectedRoute role="student"><AISkillGap /></ProtectedRoute>} />
          <Route path="/student/ai-course-recommender" element={<ProtectedRoute role="student"><AICourseRecommender /></ProtectedRoute>} />

          {/* Company */}
          <Route path="/company/dashboard" element={<ProtectedRoute role="company"><CompanyDashboard /></ProtectedRoute>} />
          <Route path="/company/post-job" element={<ProtectedRoute role="company"><PostJob /></ProtectedRoute>} />
          <Route path="/company/candidates" element={<ProtectedRoute role="company"><Candidates /></ProtectedRoute>} />
          <Route path="/company/ai-matcher" element={<ProtectedRoute role="company"><AIMatcher /></ProtectedRoute>} />
          <Route path="/company/recruitment" element={<ProtectedRoute role="company"><Recruitment /></ProtectedRoute>} />
          <Route path="/company/courses" element={<ProtectedRoute role="company"><CompanyCourses /></ProtectedRoute>} />
          <Route path="/company/interview-prep" element={<ProtectedRoute role="company"><InterviewPrep /></ProtectedRoute>} />

          {/* Admin */}
          <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/courses" element={<ProtectedRoute role="admin"><AdminCourses /></ProtectedRoute>} />
          <Route path="/admin/jobs" element={<ProtectedRoute role="admin"><AdminJobs /></ProtectedRoute>} />
          <Route path="/admin/certificates" element={<ProtectedRoute role="admin"><AdminCertificates /></ProtectedRoute>} />
          <Route path="/admin/alerts" element={<ProtectedRoute role="admin"><AdminAlerts /></ProtectedRoute>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{ className: 'font-body' }} />
      <DemoRoleSwitcher />
      <AnimatedRoutes />
    </AuthProvider>
  )
}

export default App
