import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/common/DashboardLayout'
import Loader from '../../components/common/Loader'
import EmptyState from '../../components/common/EmptyState'
import { SkeletonTable } from '../../components/common/Skeleton'
import { AdminAPI } from '../../services/api'
import { FiTrash2, FiUsers, FiLock, FiUnlock, FiEye, FiAlertCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null)

  const fetchUsers = () => {
    setLoading(true)
    AdminAPI.users()
      .then((res) => setUsers(res.data))
      .catch(() => toast.error('Failed to load users'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSuspend = async (id) => {
    if (!confirm('Suspend this user? They will not be able to log in.')) return
    setActionLoading(id)
    try {
      await AdminAPI.suspendUser(id)
      toast.success('User suspended')
      fetchUsers()
    } catch {
      toast.error('Failed to suspend user')
    } finally {
      setActionLoading(null)
    }
  }

  const handleActivate = async (id) => {
    setActionLoading(id)
    try {
      await AdminAPI.activateUser(id)
      toast.success('User activated')
      fetchUsers()
    } catch {
      toast.error('Failed to activate user')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('PERMANENTLY remove this user? This cannot be undone.')) return
    setActionLoading(id)
    try {
      await AdminAPI.deleteUser(id)
      toast.success('User permanently removed')
      fetchUsers()
    } catch {
      toast.error('Failed to delete user')
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <h2 className="text-3xl font-serif font-black text-navy mb-8">Manage Users</h2>
        <SkeletonTable rows={6} />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-serif font-black text-navy mb-2">Manage Users</h2>
      <p className="text-secondary mb-8">Suspend or permanently remove users from the platform.</p>

      {users.length === 0 ? (
        <EmptyState title="No users" message="No registered users yet." />
      ) : (
        <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container text-xs uppercase tracking-wider text-secondary font-bold">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-navy text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {u.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-bold text-navy">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
                        u.role === 'admin'
                          ? 'bg-error/10 text-error'
                          : u.role === 'company'
                          ? 'bg-tertiary/10 text-tertiary'
                          : 'bg-electric/10 text-electric'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {u.is_active ? (
                        <span className="flex items-center gap-1 text-xs text-green-600 font-bold">
                          <FiUnlock size={12} /> Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-error font-bold">
                          <FiLock size={12} /> Suspended
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary">
                      {u.created_at ? new Date(u.created_at).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Link
                          to={`/profile/${u.id}`}
                          className="p-2 text-secondary hover:text-navy hover:bg-surface-container rounded-lg transition-colors"
                          title="View Profile"
                        >
                          <FiEye size={14} />
                        </Link>
                        {u.is_active ? (
                          <button
                            onClick={() => handleSuspend(u.id)}
                            disabled={actionLoading === u.id}
                            className="text-xs font-bold px-3 py-1.5 rounded border border-outline text-secondary hover:bg-surface-container transition-colors disabled:opacity-50"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => handleActivate(u.id)}
                            disabled={actionLoading === u.id}
                            className="text-xs font-bold px-3 py-1.5 rounded border border-green-600 text-green-600 hover:bg-green-50 transition-colors disabled:opacity-50"
                          >
                            Activate
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(u.id)}
                          disabled={actionLoading === u.id}
                          className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors disabled:opacity-50"
                          title="Permanently Remove"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
