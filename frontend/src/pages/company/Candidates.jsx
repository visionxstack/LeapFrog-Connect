import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/common/DashboardLayout'
import EmptyState from '../../components/common/EmptyState'
import { SkeletonCard } from '../../components/common/Skeleton'
import api from '../../services/api'
import { FiSearch, FiCheckCircle, FiExternalLink } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function Candidates() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [minScore, setMinScore] = useState(0)

  useEffect(() => {
    api
      .get('/users/public/students')
      .then((res) => {
        setUsers(res.data.data || [])
      })
      .catch(() => toast.error('Failed to load candidates'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = users.filter((u) => {
    const score = u.readiness_score || 0
    const textMatch =
      !search ||
      u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.skills?.some((s) => s.toLowerCase().includes(search.toLowerCase()))
    return textMatch && score >= minScore
  })

  if (loading) {
    return (
      <DashboardLayout>
        <h2 className="text-3xl font-serif font-black text-navy mb-8">Verified Students</h2>
        <SkeletonCard count={6} />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-serif font-black text-navy mb-2">Verified Students</h2>
      <p className="text-secondary mb-8">Browse and discover talented students on the platform.</p>

      <div className="relative mb-8">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or skill..."
          className="w-full max-w-lg pl-12 pr-4 py-3 bg-white border border-outline-variant rounded-xl shadow-sm focus:ring-2 focus:ring-electric outline-none transition-shadow"
        />
      </div>
      <div className="mb-8 max-w-sm">
        <label className="text-sm font-semibold text-navy">Minimum Readiness Score: {minScore}</label>
        <input type="range" min="0" max="100" value={minScore} onChange={(e) => setMinScore(Number(e.target.value))} className="w-full" />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No candidates found" message="Try a different search term." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((u) => {
            const score = u.readiness_score || 0
            return (
            <div
              key={u.id}
              className="bg-white rounded-2xl border border-outline-variant/30 shadow-soft p-6 card-hover hover:shadow-card transition-all group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-navy text-white rounded-full flex items-center justify-center text-xl font-black font-serif">
                  {u.full_name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-navy truncate">{u.full_name}</h3>
                  <p className="text-xs text-secondary truncate">{u.email}</p>
                </div>
                <Link
                  to={`/profile/${u.id}`}
                  className="text-secondary hover:text-electric transition-colors p-1 opacity-0 group-hover:opacity-100"
                  title="View Profile"
                >
                  <FiExternalLink size={16} />
                </Link>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {(u.skills || []).slice(0, 5).map((skill) => (
                  <span
                    key={skill}
                    className="bg-surface-container text-navy text-[10px] px-2 py-1 rounded-full font-bold uppercase"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-secondary">
                <FiCheckCircle size={14} className="text-green-600" />
                <span>Verified Student</span>
                <span className="ml-auto bg-navy text-white px-2 py-0.5 rounded-full text-[10px] font-bold">Readiness {score}</span>
              </div>
            </div>
            )
          })}
        </div>
      )}
    </DashboardLayout>
  )
}
