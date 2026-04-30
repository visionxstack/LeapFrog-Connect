import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/common/DashboardLayout'
import Loader from '../../components/common/Loader'
import { AdminAPI, CourseAPI } from '../../services/api'
import { FiAward, FiCheckCircle } from 'react-icons/fi'
import { SkeletonTable } from '../../components/common/Skeleton'
import toast from 'react-hot-toast'

export default function AdminCertificates() {
  const [users, setUsers] = useState([])
  const [courses, setCourses] = useState([])
  const [certificates, setCertificates] = useState([])
  const [selectedStudent, setSelectedStudent] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const [loading, setLoading] = useState(true)
  const [issuing, setIssuing] = useState(false)
  const [revoking, setRevoking] = useState(null)

  const fetchData = async () => {
    try {
      const [usersRes, coursesRes, certsRes] = await Promise.all([
        AdminAPI.users(),
        CourseAPI.list(),
        AdminAPI.certificates()
      ])
      setUsers(usersRes.data.filter((u) => u.role === 'student'))
      setCourses(coursesRes.data)
      setCertificates(certsRes.data)
    } catch {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleIssue = async () => {
    if (issuing) return
    if (!selectedStudent || !selectedCourse) {
      toast.error('Select student and course')
      return
    }
    setIssuing(true)
    try {
      await AdminAPI.issueCertificate(selectedStudent, selectedCourse)
      toast.success('Certificate issued')
      fetchData()
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to issue certificate')
    } finally {
      setIssuing(false)
    }
  }

  const handleRevoke = async (id) => {
    if (revoking) return
    if (!confirm('Revoke this certificate?')) return
    setRevoking(id)
    try {
      await AdminAPI.revokeCertificate(id)
      toast.success('Certificate revoked')
      fetchData()
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to revoke certificate')
    } finally {
      setRevoking(null)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <SkeletonTable rows={5} />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-3xl font-serif font-black text-navy mb-8">Issue Certificates</h2>
          <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-soft p-8 mb-10">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Select Student</label>
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:ring-2 focus:ring-electric outline-none bg-white"
                >
                  <option value="">Choose a student</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.email})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Select Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:ring-2 focus:ring-electric outline-none bg-white"
                >
                  <option value="">Choose a course</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleIssue}
                disabled={issuing}
                className="w-full bg-navy text-white py-3.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 active:scale-[0.98]"
              >
                <FiAward size={18} />
                {issuing ? 'Issuing...' : 'Issue Certificate'}
              </button>
            </div>
          </div>
        </div>

        <div className="flex-[1.5]">
          <h2 className="text-3xl font-serif font-black text-navy mb-8">Recent Certificates</h2>
          <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container text-[10px] uppercase tracking-wider text-secondary font-bold">
                  <tr>
                    <th className="px-6 py-4">Verification Code</th>
                    <th className="px-6 py-4">Course</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {certificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs font-bold text-navy">{cert.verification_code}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-secondary">
                        {cert.course?.title || 'Unknown Course'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
                          cert.is_revoked ? 'bg-error/10 text-error' : 'bg-green-100 text-green-700'
                        }`}>
                          {cert.is_revoked ? 'Revoked' : 'Valid'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {!cert.is_revoked && (
                          <button
                            onClick={() => handleRevoke(cert.id)}
                            disabled={revoking === cert.id}
                            className="text-xs font-bold text-error hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {revoking === cert.id ? 'Revoking...' : 'Revoke'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {certificates.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-secondary text-sm italic">
                        No certificates issued yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
