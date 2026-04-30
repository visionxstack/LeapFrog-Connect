import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/common/DashboardLayout'
import { CompanyAPI } from '../../services/api'
import { FiPlus, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function PostJob() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    description: '',
    skills_required: [],
    location: '',
    job_type: 'Full-time',
    experienceLevel: 'Junior',
    salaryRange: 'NPR 60,000 - 90,000',
  })
  const [skillInput, setSkillInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const addSkill = () => {
    if (skillInput.trim() && !form.skills_required.includes(skillInput.trim())) {
      setForm((prev) => ({ ...prev, skills_required: [...prev.skills_required, skillInput.trim()] }))
      setSkillInput('')
    }
  }

  const removeSkill = (s) => {
    setForm((prev) => ({ ...prev, skills_required: prev.skills_required.filter((x) => x !== s) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    try {
      await CompanyAPI.postJob(form)
      toast.success('Job posted successfully')
      navigate('/company/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to post job')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-serif font-black text-navy mb-8">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="max-w-3xl bg-white rounded-2xl border border-outline-variant/30 shadow-soft p-8 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">Job Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="e.g. Senior React Developer"
            className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:ring-2 focus:ring-electric outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Describe the role, responsibilities, and ideal candidate..."
            className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:ring-2 focus:ring-electric outline-none"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Kathmandu, Nepal"
              className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:ring-2 focus:ring-electric outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Job Type</label>
            <select
              name="job_type"
              value={form.job_type}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:ring-2 focus:ring-electric outline-none bg-white"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Experience Level</label>
            <select name="experienceLevel" value={form.experienceLevel} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:ring-2 focus:ring-electric outline-none bg-white">
              <option>Junior</option>
              <option>Mid</option>
              <option>Senior</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Salary Range (NPR)</label>
            <input name="salaryRange" value={form.salaryRange} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:ring-2 focus:ring-electric outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">Required Skills</label>
          <div className="flex gap-2 mb-3">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              placeholder="Add skill and press Enter"
              className="flex-1 px-4 py-2 rounded-lg border border-outline-variant focus:ring-2 focus:ring-electric outline-none text-sm"
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-electric text-white rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
            >
              <FiPlus size={16} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.skills_required.map((s) => (
              <span
                key={s}
                className="bg-surface-container text-navy text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1"
              >
                {s}
                <button type="button" onClick={() => removeSkill(s)} className="hover:text-error">
                  <FiX size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-navy text-white py-3.5 rounded-lg font-bold hover:opacity-90 transition-all disabled:opacity-50 active:scale-[0.98]"
        >
          {loading ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </DashboardLayout>
  )
}
