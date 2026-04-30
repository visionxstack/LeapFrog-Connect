import client from './client'

export async function listJobs() {
  const res = await client.get('/jobs')
  return res.data.data
}

export async function postJob(payload) {
  const res = await client.post('/jobs', payload)
  return res.data.data
}

export async function myJobs() {
  const res = await client.get('/jobs/my')
  return res.data.data
}

