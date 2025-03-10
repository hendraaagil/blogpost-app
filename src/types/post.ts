export type Meta = {
  pagination: {
    total: number
    pages: number
    page: number
    limit: number
  }
}

export type Post = {
  id: number
  key: number
  title: string
  body: string
  user_id: number
}
