import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error)
    return Promise.reject(error)
  }
)

export async function fetchLatestAds(limit = 5) {
  const response = await apiClient.get(`/posts`, {
    params: {
      _limit: limit,
      _sort: 'id',
      _order: 'desc'
    }
  })
  return response.data
}

export async function requestLoginCode(email) {
  const response = await apiClient.post('/api/auth/request-code', {
    email
  })
  return response.data
}

export async function verifyLoginCode(email, code) {
  const response = await apiClient.post('/api/auth/verify-code', {
    email,
    code
  })
  return response.data
}

export async function fetchMyAds() {
  // For localhost:3000, use mock data instead of API call
  if (window.location.hostname === 'localhost' && window.location.port === '3000') {
    const { mockMyAds } = await import('../data/mockMyAds')
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockMyAds), 300) // Simulate API delay
    })
  }
  const response = await apiClient.get('/api/ads/my')
  return response.data
}

export default apiClient

