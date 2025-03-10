import axios from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

type Post = {
  id: number
  title: string
  body: string
  user_id: number
}

const getPosts = async () => {
  try {
    const { data } = await axios.get<Post[]>('/posts')
    return data.map((post) => ({
      ...post,
      key: post.id,
    }))
  } catch (error) {
    console.error(error)
    return []
  }
}

export const useGetPosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })
}
