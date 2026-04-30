import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/common/DashboardLayout'
import { AdminAPI } from '../../services/api'
import { FiUsers, FiBook, FiBriefcase, FiAward, FiTrendingUp, FiUserCheck } from 'react-icons/fi'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { SkeletonStats } from '../../components/common/Skeleton'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AdminAPI.stats()
      .then((res) => setAnalytics(res.data.data))
      .catch(() => toast.error('Failed to load analytics'))
      .finally(() => setLoading(false))
  }, [])

  const chartData = analytics
    ? [
        { name: 'Students', value: analytics.total_students },
        { name: 'Companies', value: analytics.total_companies },
        { name: 'Courses', value: analytics.total_courses },
        { name: 'Jobs', value: analytics.total_jobs },
        { name: 'Applications', value: analytics.total_applications },
      ]
    : []

  if (loading) {
    return (
      <DashboardLayout>
        <SkeletonStats count={6} />
        <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-soft p-8 mt-6 animate-pulse">
          <div className="h-6 bg-surface-container rounded w-1/4 mb-6" />
          <div className="h-80 bg-surface-container rounded-xl" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-serif font-black text-navy mb-2">Admin Dashboard</h2>
      <p className="text-secondary mb-8">Platform overview and key metrics.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        {[
          { icon: FiUsers, label: 'Total Students', value: analytics?.total_students || 0, color: 'bg-electric/10 text-electric' },
          { icon: FiUserCheck, label: 'Employers', value: analytics?.total_employers || 0, color: 'bg-tertiary/10 text-tertiary' },
          { icon: FiBook, label: 'Courses', value: analytics?.total_courses || 0, color: 'bg-secondary/10 text-secondary' },
          { icon: FiBriefcase, label: 'Jobs', value: analytics?.total_jobs || 0, color: 'bg-navy/10 text-navy' },
          { icon: FiTrendingUp, label: 'Applications', value: analytics?.total_applications || 0, color: 'bg-green-100 text-green-700' },
          { icon: FiAward, label: 'Certificates', value: analytics?.total_certificates || 0, color: 'bg-orange-100 text-orange-700' },
        ].map((s) => (
          <div key={s.label} className="bg-white p-6 rounded-xl border border-outline-variant/30 shadow-soft card-hover hover:shadow-card transition-all">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${s.color}`}>
              <s.icon size={20} />
            </div>
            <h3 className="text-3xl font-black text-navy font-serif">{s.value}</h3>
            <p className="text-sm font-semibold text-secondary">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-soft p-8">
        <h3 className="text-lg font-serif font-black text-navy mb-6">Platform Activity</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e1e3" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#585f6c' }} />
              <YAxis tick={{ fontSize: 12, fill: '#585f6c' }} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #c8c5cd', background: '#fff' }}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  )
}
