import axios from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

type Meta = {
  pagination: {
    total: number
    pages: number
    page: number
    limit: number
  }
}

type Post = {
  id: number
  key: number
  title: string
  body: string
  user_id: number
}

type PostsResponse = { data: Post[]; meta: Meta }

const getPosts = async (): Promise<PostsResponse> => {
  try {
    const { data, headers } = await axios.get<Post[]>('/posts')
    const meta = {
      pagination: {
        total: Number(headers['x-pagination-total']),
        pages: Number(headers['x-pagination-pages']),
        page: Number(headers['x-pagination-page']),
        limit: Number(headers['x-pagination-limit']),
      },
    }

    return {
      data: data.map((post) => ({
        ...post,
        key: post.id,
      })),
      meta,
    }
  } catch (error) {
    console.error(error)
    return {
      data: [],
      meta: { pagination: { total: 0, pages: 0, page: 0, limit: 0 } },
    }
  }
}

export const useGetPosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })
}
