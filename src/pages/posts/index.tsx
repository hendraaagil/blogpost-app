import { useGetPosts } from '@/lib/posts'
import useUserStore from '@/stores/user'
import { Button, Table, Typography } from 'antd'

export default function Post() {
  const name = useUserStore((state) => state.name)
  const { data: posts } = useGetPosts()

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ]

  return (
    <section className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <p className="text-xl font-medium">Welcome, {name} 👋</p>
        <Button type="primary">Create Post</Button>
      </div>
      <Table
        className="mt-4"
        dataSource={posts ?? []}
        columns={columns}
        pagination={{ position: [] }}
      />
    </section>
  )
}
