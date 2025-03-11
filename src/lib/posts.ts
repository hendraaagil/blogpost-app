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

const getPost = async (id: number): Promise<Post> => {
  try {
    const { data } = await axios.get<Post>(`/posts/${id}`)
    return data
  } catch (error) {
    console.error(error)
    return {} as Post
  }
}

export const useGetPost = (id: number) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id),
    enabled: id > 0,
  })
}

export const updatePost = async (id: number, values: Partial<Post>) => {
  try {
    const { data } = await axios.put<Post>(`/posts/${id}`, values)
    return data
  } catch (error) {
    throw error
  }
}

export const createPost = async (
  values: Pick<Post, 'body' | 'title' | 'user_id'>,
) => {
  try {
    const { data } = await axios.post<Post>(
      `/users/${values.user_id}/posts`,
      values,
    )
    return data
  } catch (error) {
    throw error
  }
}
