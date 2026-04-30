import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/common/DashboardLayout'
import EmptyState from '../../components/common/EmptyState'
import { SkeletonCard } from '../../components/common/Skeleton'
import { AdminAPI, CourseAPI } from '../../services/api'
import { FiPlus, FiTrash2, FiCheckCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function AdminCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    category: '',
    level: 'Beginner',
    price: 0,
    modules: [],
    has_quiz: false,
    has_certificate: false,
  })
  const [moduleInput, setModuleInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [rejectModal, setRejectModal] = useState({ open: false, courseId: '', reason: '' })

  const fetchCourses = () => {
    setLoading(true)
    AdminAPI.courses()
      .then((res) => setCourses(res.data))
      .catch(() => toast.error('Failed to load courses'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const addModule = () => {
    if (moduleInput.trim() && !form.modules.includes(moduleInput.trim())) {
      setForm((prev) => ({ ...prev, modules: [...prev.modules, moduleInput.trim()] }))
      setModuleInput('')
    }
  }

  const handleApprove = async (id) => {
    try {
      await CourseAPI.updateStatus(id, { status: 'approved' })
      toast.success('Course approved')
      fetchCourses()
    } catch {
      toast.error('Failed to approve course')
    }
  }

  const handleReject = async () => {
    if (!rejectModal.reason.trim()) {
      toast.error('Please provide a rejection reason')
      return
    }
    try {
      await CourseAPI.updateStatus(rejectModal.courseId, { status: 'rejected', rejection_reason: rejectModal.reason })
      toast.success('Course rejected')
      setRejectModal({ open: false, courseId: '', reason: '' })
      fetchCourses()
    } catch {
      toast.error('Failed to reject course')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this course permanently?')) return
    try {
      await CourseAPI.delete(id)
      toast.success('Course deleted')
      fetchCourses()
    } catch {
      toast.error('Failed to delete course')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) {
      toast.error('Title is required')
      return
    }
    setSaving(true)
    try {
      await CourseAPI.create(form)
      toast.success('Course created and approved')
      setShowForm(false)
      setForm({
        title: '',
        description: '',
        instructor: '',
        duration: '',
        category: '',
        level: 'Beginner',
        price: 0,
        modules: [],
        has_quiz: false,
        has_certificate: false,
      })
      fetchCourses()
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to create course')
    } finally {
      setSaving(false)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500 text-white'
      case 'rejected':
        return 'bg-error text-white'
      case 'pending':
      default:
        return 'bg-orange-500 text-white'
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <h2 className="text-3xl font-serif font-black text-navy mb-8">Manage Courses</h2>
        <SkeletonCard count={6} />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-serif font-black text-navy">Manage Courses</h2>
          <p className="text-secondary">Review and approve courses submitted by companies.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-navy text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.98]"
        >
          <FiPlus size={16} /> {showForm ? 'Cancel' : 'Add Course'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-outline-variant/30 shadow-soft p-8 space-y-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Title *</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:ring-2 focus:ring-electric outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Instructor</label>
              <input
                value={form.instructor}
                onChange={(e) => setForm({ ...form, instructor: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:ring-2 focus:ring-electric outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Duration</label>
              <input
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder="e.g. 12 Weeks"
                className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:ring-2 focus:ring-electric outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Level</label>
              <select
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:ring-2 focus:ring-electric outline-none bg-white"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:ring-2 focus:ring-electric outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Modules</label>
            <div className="flex gap-2 mb-3">
              <input
                value={moduleInput}
                onChange={(e) => setModuleInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addModule())}
                placeholder="Add module and press Enter"
                className="flex-1 px-4 py-2 rounded-lg border border-outline-variant focus:ring-2 focus:ring-electric outline-none text-sm"
              />
              <button
                type="button"
                onClick={addModule}
                className="px-4 py-2 bg-electric text-white rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
              >
                <FiPlus size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.modules.map((m, i) => (
                <span key={i} className="bg-surface-container text-navy text-xs px-3 py-1.5 rounded-full font-medium">
                  {m}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={form.has_quiz}
                onChange={(e) => setForm({ ...form, has_quiz: e.target.checked })}
                className="rounded border-outline-variant text-electric focus:ring-electric"
              />
              Has Quiz
            </label>
            <label className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={form.has_certificate}
                onChange={(e) => setForm({ ...form, has_certificate: e.target.checked })}
                className="rounded border-outline-variant text-electric focus:ring-electric"
              />
              Has Certificate
            </label>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-navy text-white py-3.5 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50 active:scale-[0.98]"
          >
            {saving ? 'Creating...' : 'Create Course'}
          </button>
        </form>
      )}

      {courses.length === 0 ? (
        <EmptyState title="No courses" message="No courses have been submitted yet." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-outline-variant/30 shadow-soft overflow-hidden card-hover hover:shadow-card transition-all"
            >
              <div className="h-32 bg-gradient-to-br from-primary-container to-navy relative overflow-hidden p-6">
                <div className="absolute inset-0 flex items-center justify-center text-white/20 font-serif text-5xl font-black">
                  {c.title?.charAt(0)}
                </div>
                <span className={`relative z-10 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusBadge(c.status)}`}>
                  {c.status}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold font-serif text-navy mb-2">{c.title}</h3>
                <p className="text-secondary text-sm line-clamp-2 mb-4">{c.description}</p>
                <div className="flex flex-wrap gap-2 text-xs text-secondary mb-4">
                  <span className="bg-surface-container px-2 py-1 rounded font-medium">{c.level}</span>
                  <span className="bg-surface-container px-2 py-1 rounded font-medium">{c.duration}</span>
                </div>

                {c.status === 'rejected' && c.rejection_reason && (
                  <div className="mb-4 p-3 bg-error/5 rounded-lg text-xs text-error flex items-start gap-2">
                    <FiAlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                    <span>{c.rejection_reason}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-4 border-t border-outline-variant/30">
                  {c.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(c.id)}
                        className="flex-1 bg-green-600 text-white text-xs font-bold py-2 rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-1 active:scale-[0.98]"
                      >
                        <FiCheckCircle size={12} /> Approve
                      </button>
                      <button
                        onClick={() => setRejectModal({ open: true, courseId: c.id, reason: '' })}
                        className="flex-1 bg-error text-white text-xs font-bold py-2 rounded hover:bg-error/90 transition-colors flex items-center justify-center gap-1 active:scale-[0.98]"
                      >
                        <FiXCircle size={12} /> Reject
                      </button>
                    </>
                  )}
                  {c.status === 'approved' && (
                    <button
                      onClick={() => {
                        CourseAPI.updateStatus(c.id, { status: 'rejected', rejection_reason: 'Unpublished by admin' })
                          .then(() => { toast.success('Course unpublished'); fetchCourses() })
                          .catch(() => toast.error('Failed'))
                      }}
                      className="flex-1 border border-outline text-secondary text-xs font-bold py-2 rounded hover:bg-surface-container transition-colors active:scale-[0.98]"
                    >
                      Unpublish
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="px-3 py-2 text-error hover:bg-error/10 rounded transition-colors active:scale-[0.98]"
                    title="Delete"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      {rejectModal.open && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-card border border-outline-variant/30 w-full max-w-lg p-6">
            <h3 className="text-lg font-bold text-navy mb-2">Reject Course</h3>
            <p className="text-secondary text-sm mb-4">Provide a reason for rejection. This will be visible to the company.</p>
            <textarea
              value={rejectModal.reason}
              onChange={(e) => setRejectModal((p) => ({ ...p, reason: e.target.value }))}
              rows={3}
              placeholder="e.g. Content does not meet our quality standards..."
              className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:ring-2 focus:ring-electric outline-none text-sm mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setRejectModal({ open: false, courseId: '', reason: '' })}
                className="flex-1 px-4 py-2.5 rounded-lg border border-outline text-secondary font-semibold text-sm hover:bg-surface-container transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="flex-1 px-4 py-2.5 rounded-lg bg-error text-white font-semibold text-sm hover:opacity-90 transition-opacity active:scale-[0.98]"
              >
                Reject Course
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
