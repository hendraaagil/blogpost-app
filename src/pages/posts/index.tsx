import useUserStore from '@/stores/user'
import { Button, Typography } from 'antd'

export default function Post() {
  const name = useUserStore((state) => state.name)

  return (
    <section className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <Typography.Paragraph className="text-xl font-medium">
          Welcome, {name} 👋
        </Typography.Paragraph>
        <Button type="primary">Create Post</Button>
      </div>
    </section>
  )
}
