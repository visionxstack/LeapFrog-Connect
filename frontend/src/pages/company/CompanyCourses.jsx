import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/common/DashboardLayout'
import { CompanyAPI } from '../../services/api'
import toast from 'react-hot-toast'

export default function CompanyCourses() {
  const [jobs, setJobs] = useState([])

  const fetchJobs = () => {
    CompanyAPI.listJobs().then((res) => setJobs(res.data)).catch(() => toast.error('Failed to load jobs'))
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-serif font-black text-navy mb-6">My Job Posts</h2>
      <div className="bg-white rounded-xl border border-outline-variant/30 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container text-xs uppercase text-secondary"><tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Applicants</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Actions</th></tr></thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.id} className="border-t border-outline-variant/20">
                <td className="px-4 py-3">{j.title}</td>
                <td className="px-4 py-3">{j.applicants?.length || 0}</td>
                <td className="px-4 py-3">
                  <button onClick={() => setJobs((p) => p.map((x) => x.id === j.id ? { ...x, status: x.status === 'Active' ? 'Closed' : 'Active' } : x))} className="px-3 py-1 rounded-full bg-surface-container-low text-xs font-semibold">{j.status}</button>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => toast.success('Edit form opened (demo)')} className="text-xs mr-3 font-semibold text-electric">Edit</button>
                  <button onClick={() => setJobs((p) => p.filter((x) => x.id !== j.id))} className="text-xs font-semibold text-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
