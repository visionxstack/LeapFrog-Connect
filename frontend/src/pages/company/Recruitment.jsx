import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/common/DashboardLayout'
import Loader from '../../components/common/Loader'
import EmptyState from '../../components/common/EmptyState'
import { SkeletonCard } from '../../components/common/Skeleton'
import { CompanyAPI } from '../../services/api'
import toast from 'react-hot-toast'

const COLUMNS = ['Applied', 'Interview', 'Hired', 'Rejected']

export default function Recruitment() {
  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState('')
  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(null)
  const [draggedId, setDraggedId] = useState(null)

  useEffect(() => {
    CompanyAPI.listJobs()
      .then((res) => {
        setJobs(res.data)
        if (res.data.length > 0) setSelectedJob(res.data[0].id)
      })
      .catch(() => toast.error('Failed to load jobs'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!selectedJob) return
    setLoading(true)
    CompanyAPI.applicants(selectedJob)
      .then((res) => setApplicants(res.data))
      .catch(() => toast.error('Failed to load applicants'))
      .finally(() => setLoading(false))
  }, [selectedJob])

  const handleStatusChange = async (appId, newStatus) => {
    if (updating) return
    setUpdating(appId)
    try {
      await CompanyAPI.updateStatus(appId, newStatus)
      setApplicants((prev) =>
        prev.map((a) => (a.application.id === appId ? { ...a, application: { ...a.application, status: newStatus } } : a))
      )
      toast.success('Status updated')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to update status')
    } finally {
      setUpdating(null)
    }
  }

  const applicantsByColumn = (status) =>
    applicants.filter((a) => a.application.status === status || (status === 'Applied' && !a.application.status))

  const handleDrop = async (newStatus) => {
    if (!draggedId) return
    await handleStatusChange(draggedId, newStatus)
    toast.success(`Moved candidate to ${newStatus}`)
    setDraggedId(null)
  }

  if (loading && !jobs.length) {
    return (
      <DashboardLayout>
        <SkeletonCard count={4} />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-serif font-black text-navy">Recruitment Board</h2>
          <p className="text-secondary">Manage applicants through your hiring pipeline.</p>
        </div>
        {jobs.length > 0 && (
          <select
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
            className="px-4 py-2 bg-white border border-outline-variant rounded-lg text-sm focus:ring-2 focus:ring-electric outline-none"
          >
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
          </select>
        )}
      </div>

      {jobs.length === 0 ? (
        <EmptyState title="No jobs posted" message="Post a job first to start managing applicants." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {COLUMNS.map((col) => (
            <div key={col} className="bg-surface-container-low rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-navy uppercase tracking-wider">{col}</h3>
                <span className="text-xs bg-white px-2 py-0.5 rounded-full font-bold text-secondary">
                  {applicantsByColumn(col).length}
                </span>
              </div>
              <div className="space-y-3 min-h-24" onDragOver={(e) => e.preventDefault()} onDrop={() => handleDrop(col)}>
                {applicantsByColumn(col).map((a) => (
                  <div
                    key={a.application.id}
                    className="bg-white rounded-xl border border-outline-variant/30 shadow-sm p-4"
                    draggable
                    onDragStart={() => setDraggedId(a.application.id)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-navy text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {a.student.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-navy">{a.student.name}</p>
                        <p className="text-[10px] text-secondary">{a.student.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {(a.student.skills || []).slice(0, 3).map((s) => (
                        <span key={s} className="bg-surface-container text-secondary text-[10px] px-1.5 py-0.5 rounded font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] text-secondary font-medium">Drag card between columns</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
