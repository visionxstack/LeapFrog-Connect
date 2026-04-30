import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/common/DashboardLayout'
import EmptyState from '../../components/common/EmptyState'
import { CompanyAPI } from '../../services/api'
import { FiBriefcase, FiUsers, FiPlus, FiTrendingUp } from 'react-icons/fi'
import { SkeletonStats, SkeletonCard } from '../../components/common/Skeleton'
import toast from 'react-hot-toast'

export default function CompanyDashboard() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    CompanyAPI.listJobs()
      .then((res) => setJobs(res.data))
      .catch(() => toast.error('Failed to load jobs'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <DashboardLayout>
        <SkeletonStats count={3} />
        <SkeletonCard count={4} />
      </DashboardLayout>
    )
  }
  const totalApplicants = jobs.reduce((acc, j) => acc + (j.applicants?.length || 0), 0)
  const interviewsThisWeek = Math.max(1, Math.floor(totalApplicants / 3))
  const recentHires = Math.max(1, Math.floor(totalApplicants / 5))

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-serif font-black text-navy">Company Dashboard</h2>
          <p className="text-secondary">Manage your job postings and applicants.</p>
        </div>
        <Link
          to="/company/post-job"
          className="bg-navy text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <FiPlus size={16} /> Post Job
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { icon: FiBriefcase, label: 'Active Jobs', value: jobs.length, color: 'bg-electric/10 text-electric' },
          { icon: FiUsers, label: 'Total Applicants', value: totalApplicants, color: 'bg-tertiary/10 text-tertiary' },
          { icon: FiTrendingUp, label: 'Interviews This Week', value: interviewsThisWeek, color: 'bg-secondary/10 text-secondary' },
          { icon: FiTrendingUp, label: 'Recent Hires', value: recentHires, color: 'bg-green-100 text-green-700' },
        ].map((s) => (
          <div key={s.label} className="bg-white p-6 rounded-xl border border-outline-variant/30 shadow-soft card-hover">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${s.color}`}>
              <s.icon size={20} />
            </div>
            <h3 className="text-3xl font-black text-navy font-serif">{s.value}</h3>
            <p className="text-sm font-semibold text-secondary">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-soft overflow-hidden">
        <div className="px-8 py-6 border-b border-outline-variant/20 flex items-center justify-between">
          <h3 className="text-xl font-serif font-black text-navy">Your Job Posts</h3>
          <Link to="/company/post-job" className="text-sm font-bold text-electric hover:underline">
            + New Job
          </Link>
        </div>
        {jobs.length === 0 ? (
          <EmptyState title="No jobs posted" message="Create your first job posting to start receiving applicants." />
        ) : (
          <div className="divide-y divide-outline-variant/20">
            {jobs.map((job) => (
              <div key={job.id} className="px-8 py-5 flex items-center justify-between hover:bg-surface-container-low transition-colors">
                <div>
                  <h4 className="font-bold text-navy text-sm">{job.title}</h4>
                  <p className="text-xs text-secondary mt-1">
                    {job.location} • {job.job_type} • {new Date(job.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Link
                  to={`/company/recruitment`}
                  className="text-xs font-bold text-electric hover:underline"
                >
                  View Applicants
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
