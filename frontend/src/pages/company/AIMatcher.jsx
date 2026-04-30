import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/common/DashboardLayout'
import api, { AIAPI, JobAPI } from '../../services/api'
import { FiCpu, FiStar } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function AIMatcher() {
  const [jobs, setJobs] = useState([])
  const [candidates, setCandidates] = useState([])
  const [selectedJob, setSelectedJob] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)

  useEffect(() => {
    Promise.all([JobAPI.myJobs ? JobAPI.myJobs() : JobAPI.list(), api.get('/users/public/students')])
      .then(([j, s]) => {
        const jobsList = j.data.data || []
        setJobs(jobsList)
        setSelectedJob(jobsList[0]?.id || '')
        setCandidates(s.data.data || [])
      })
      .catch(() => {})
  }, [])

  const handleMatch = async () => {
    if (loading) return
    setLoading(true)
    try {
      const job = jobs.find((j) => j.id === selectedJob)
      const res = await AIAPI.talentMatch({
        job_title: job?.title || '',
        job_requirements: job?.required_skills || [],
        candidates: candidates.slice(0, 12),
      })
      setResults(res.data.data?.ranked_candidates || [])
      toast.success('Matching complete')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'AI matching failed')
    } finally {
      setLoading(false)
    }
  }

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'High': return 'bg-green-100 text-green-700'
      case 'Medium': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-error/10 text-error'
    }
  }

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-serif font-black text-navy mb-2">AI Talent Matcher</h2>
      <p className="text-secondary mb-8">
        Enter job requirements and candidate profiles to get AI-powered match scores.
      </p>

      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-soft p-8">
          <label className="block text-sm font-semibold text-navy mb-2">Select Job Post</label>
          <select value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:ring-2 focus:ring-electric outline-none mb-6 bg-white">
            {jobs.map((j) => <option key={j.id} value={j.id}>{j.title} - {j.location}</option>)}
          </select>
          <button
            onClick={handleMatch}
            disabled={loading}
            className="w-full bg-navy text-white py-3.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 active:scale-[0.98]"
          >
            <FiCpu size={18} />
            {loading ? 'Matching...' : 'Run AI Matcher'}
          </button>
        </div>

        <div>
          {loading ? (
            <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-soft p-12 text-center">
              <div className="w-10 h-10 border-4 border-electric border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-bold text-navy mb-2">Matching candidates...</h3>
            </div>
          ) : results ? (
            <div className="space-y-4">
              {results.map((r, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-outline-variant/30 shadow-soft p-6 card-hover"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-navy text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-navy text-sm">{r.name || r.candidate_id}</h4>
                        <p className="text-xs text-secondary">{r.gap_notes}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getBadgeColor(r.fit_percentage >= 80 ? 'High' : r.fit_percentage >= 65 ? 'Medium' : 'Low')}`}>
                      {r.fit_percentage >= 80 ? 'High' : r.fit_percentage >= 65 ? 'Medium' : 'Low'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiStar size={16} className="text-tertiary" />
                    <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full bg-electric transition-all"
                        style={{ width: `${r.fit_percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-navy">{r.fit_percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-soft p-12 text-center">
              <FiCpu size={48} className="text-outline mx-auto mb-4" />
              <h3 className="text-lg font-bold text-navy mb-2">AI Match Results</h3>
              <p className="text-secondary text-sm">
                Enter job requirements and candidate profiles to see ranked results.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
