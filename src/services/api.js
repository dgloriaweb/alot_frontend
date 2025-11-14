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

export default apiClient

