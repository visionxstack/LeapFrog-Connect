import client from './client'

export async function register({ email, password, full_name, role }) {
  const res = await client.post('/auth/register', { email, password, full_name, role })
  return res.data.data
}

export async function login({ email, password }) {
  const res = await client.post('/auth/login', { email, password })
  return res.data.data
}

export async function me() {
  const res = await client.get('/auth/me')
  return res.data.data
}

export async function logout(refresh_token) {
  const res = await client.post('/auth/logout', { refresh_token })
  return res.data.data
}

