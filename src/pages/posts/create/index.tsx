import { Button } from 'antd'
import { useRouter } from 'next/router'
import { PageContainer } from '@/components/layouts'

export default function Create() {
  const router = useRouter()

  return (
    <PageContainer
      title="Create a new post"
      action={
        <Button type="primary" onClick={() => router.back()}>
          Back
        </Button>
      }
    ></PageContainer>
  )
}
