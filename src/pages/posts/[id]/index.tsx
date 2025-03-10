import { Button, Skeleton, Typography } from 'antd'
import { useRouter } from 'next/router'

import { PageContainer } from '@/components/layouts'
import { useGetPost } from '@/lib/posts'

export default function Detail() {
  const router = useRouter()
  const { isLoading, data: post } = useGetPost(
    router.query.id ? Number(router.query.id) : 0,
  )

  return (
    <PageContainer
      title="Detail post"
      action={<Button onClick={() => router.back()}>Back</Button>}
    >
      {isLoading && <Skeleton active />}
      {post && (
        <article>
          <Typography.Title level={3}>{post.title}</Typography.Title>
          <p>{post.body}</p>
        </article>
      )}
    </PageContainer>
  )
}
