import axios from 'axios'

export const ax = () => {
  const client = axios.create({
    withCredentials: true,
  }) as typeof axios

  client.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      const message = error?.response?.data?.error
      error.message = message || error.message
      throw error
    }
  )
  return client
}
