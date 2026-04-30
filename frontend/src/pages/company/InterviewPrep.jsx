import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/common/DashboardLayout'
import api, { AIAPI, JobAPI } from '../../services/api'

export default function InterviewPrep() {
  const [candidates, setCandidates] = useState([])
  const [jobs, setJobs] = useState([])
  const [candidateId, setCandidateId] = useState('')
  const [jobId, setJobId] = useState('')
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    Promise.all([api.get('/users/public/students'), JobAPI.list()])
      .then(([s, j]) => {
        const ss = s.data.data || []
        const jj = j.data.data || []
        setCandidates(ss)
        setJobs(jj)
        setCandidateId(ss[0]?.id || '')
        setJobId(jj[0]?.id || '')
      })
      .catch(() => {})
  }, [])

  const generate = async () => {
    if (loading) return
    setLoading(true)
    try {
      const candidate = candidates.find((c) => c.id === candidateId)
      const job = jobs.find((j) => j.id === jobId)
      const res = await AIAPI.interviewQuestions({
        job_title: job?.title || '',
        candidate_skills: candidate?.skills || [],
        job_requirements: job?.required_skills || [],
      })
      setQuestions(res.data.data?.questions || [])
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-serif font-black text-navy mb-2">AI Interview Prep</h2>
      <p className="text-secondary mb-6">Select candidate + job to generate personalized interview prompts.</p>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <select value={candidateId} onChange={(e) => setCandidateId(e.target.value)} className="px-4 py-3 rounded-lg border border-outline-variant bg-white">
          {candidates.map((s) => <option key={s.id} value={s.id}>{s.full_name}</option>)}
        </select>
        <select value={jobId} onChange={(e) => setJobId(e.target.value)} className="px-4 py-3 rounded-lg border border-outline-variant bg-white">
          {jobs.map((j) => <option key={j.id} value={j.id}>{j.title} - {j.location}</option>)}
        </select>
      </div>
      <button onClick={generate} className="mb-6 px-5 py-2 rounded-lg bg-navy text-white font-semibold">Generate Questions</button>
      {loading ? (
        <div className="bg-white rounded-xl border border-outline-variant/30 p-12 text-center">
          <div className="w-10 h-10 border-4 border-electric border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-secondary text-sm">Generating interview prompts...</p>
        </div>
      ) : questions.length > 0 && (
        <div className="bg-white rounded-xl border border-outline-variant/30 p-6 space-y-3">
          {questions.map((q) => <div key={q} className="p-3 bg-surface-container-low rounded-lg text-sm text-navy">{q}</div>)}
        </div>
      )}
    </DashboardLayout>
  )
}
