import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/common/DashboardLayout'
import { AdminAPI } from '../../services/api'

export default function AdminAlerts() {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    AdminAPI.mentorAlerts()
      .then((res) => setAlerts(res.data.data || []))
      .catch(() => setAlerts([]))
  }, [])

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-serif font-black text-navy mb-2">Mentor Alert Dashboard</h2>
      <p className="text-secondary mb-6">Students whose readiness dropped two consecutive weeks.</p>
      <div className="bg-white rounded-xl border border-outline-variant/30 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container text-xs uppercase text-secondary">
            <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Score</th><th className="px-4 py-3">Drop</th><th className="px-4 py-3">Alert Sent</th></tr>
          </thead>
          <tbody>
            {alerts.map((a) => (
              <tr key={a.id} className="border-t border-outline-variant/20">
                <td className="px-4 py-3">{a.student_name || a.student_id}</td>
                <td className="px-4 py-3">{a.score}</td>
                <td className="px-4 py-3">-{a.drop_amount}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      const next = !a.alert_sent
                      setAlerts((p) => p.map((x) => (x.id === a.id ? { ...x, alert_sent: next } : x)))
                      AdminAPI.updateMentorAlert(a.id, next).catch(() => {})
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold ${a.alert_sent ? 'bg-green-100 text-green-700' : 'bg-error/10 text-error'}`}
                  >
                    {a.alert_sent ? 'Sent' : 'Pending'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
