import { useQuery } from '@tanstack/react-query'
import { User } from '@/types/user'
import axios from '@/lib/axios'

const getUsers = async () => {
  try {
    const { data } = await axios.get<User[]>('/users')
    return data.map((user) => ({
      value: user.id,
      label: user.name,
    }))
  } catch (error) {
    console.error(error)
    return []
  }
}

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })
}
