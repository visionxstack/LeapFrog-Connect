import client from './client'

export async function listCourses() {
  const res = await client.get('/courses')
  return res.data.data
}

export async function getCourse(id) {
  const res = await client.get(`/courses/${id}`)
  return res.data.data
}

export async function enrollCourse(id) {
  const res = await client.post(`/courses/${id}/enroll`)
  return res.data.data
}

export async function myCourses() {
  const res = await client.get('/courses/my')
  return res.data.data
}

