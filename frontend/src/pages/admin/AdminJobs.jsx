import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/common/DashboardLayout'
import EmptyState from '../../components/common/EmptyState'
import { AdminAPI } from '../../services/api'
import { FiBriefcase, FiMapPin, FiClock, FiTrash2 } from 'react-icons/fi'
import { SkeletonCard } from '../../components/common/Skeleton'
import toast from 'react-hot-toast'

export default function AdminJobs() {
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)
  const [localJobs, setLocalJobs] = useState([])

  const fetchJobs = () => {
    setLoading(true)
    AdminAPI.jobs()
      .then((res) => {
        setLocalJobs(res.data.map((j) => ({ ...j, review: 'Approved' })))
      })
      .catch(() => toast.error('Failed to load jobs'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const handleDelete = async (id) => {
    if (deleting) return
    if (!confirm('Remove this job post?')) return
    setDeleting(id)
    try {
      await AdminAPI.deleteJob(id)
      toast.success('Job removed')
      fetchJobs()
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to remove job')
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <SkeletonCard count={6} />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-serif font-black text-navy mb-8">Manage Jobs</h2>
      {localJobs.length === 0 ? (
        <EmptyState title="No jobs" message="No jobs have been posted yet." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {localJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-outline-variant/30 shadow-soft p-6 card-hover hover:shadow-card transition-all flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center font-bold text-navy text-sm">
                  <FiBriefcase size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-navy text-sm">{job.title}</h3>
                  <p className="text-xs text-secondary flex items-center gap-1">
                    <FiMapPin size={12} /> {job.location || 'Nepal'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setLocalJobs((p) => p.map((x) => x.id === job.id ? { ...x, review: x.review === 'Approved' ? 'Rejected' : 'Approved' } : x))} className="text-xs px-2 py-1 rounded bg-surface-container-low font-semibold">{job.review}</button>
                  <button onClick={() => handleDelete(job.id)} disabled={deleting === job.id} className="text-error hover:bg-error/10 p-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"><FiTrash2 size={16} /></button>
                </div>
              </div>
              <p className="text-secondary text-sm line-clamp-2 mb-4">{job.description}</p>
              <div className="flex flex-wrap gap-2 mb-4 flex-1">
                {job.skills_required?.map((s) => (
                  <span key={s} className="bg-surface-container text-secondary text-[10px] px-2 py-1 rounded-full font-bold uppercase">
                    {s}
                  </span>
                )) || <span className="bg-surface-container text-secondary text-[10px] px-2 py-1 rounded-full font-bold uppercase">General</span>}
              </div>
              <div className="flex items-center justify-between text-xs text-secondary pt-4 border-t border-outline-variant/30">
                <span className="flex items-center gap-1">
                  <FiClock size={12} /> {job.job_type || 'Full-time'}
                </span>
                <span>{new Date(job.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
