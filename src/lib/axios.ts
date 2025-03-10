import axios from 'axios'
import useUserStore from '@/stores/user'

const instance = axios.create({
  baseURL: 'https://gorest.co.in/public/v2',
})

instance.interceptors.request.use((config) => {
  const token = useUserStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default instance
