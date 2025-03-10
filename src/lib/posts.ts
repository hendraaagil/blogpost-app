import { useQuery } from '@tanstack/react-query'
import { Meta, Post } from '@/types/post'
import axios from '@/lib/axios'

type PostsResponse = { data: Post[]; meta: Meta }
type GetPostsParams = { search?: string }

const getPosts = async (params: GetPostsParams): Promise<PostsResponse> => {
  try {
    const { data, headers } = await axios.get<Post[]>('/posts', {
      params: { title: params.search || undefined },
    })
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

export const useGetPosts = (params: GetPostsParams) => {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => getPosts(params),
  })
}
