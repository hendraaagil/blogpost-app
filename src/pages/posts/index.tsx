import { Button, Input, Space, Table, TableProps, Tooltip } from 'antd'
import { useRouter } from 'next/router'
import { useQueryState } from 'nuqs'
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
} from '@ant-design/icons'

import { Post } from '@/types/post'
import { useGetPosts } from '@/lib/posts'
import useDebounce from '@/hooks/use-debounce'
import useUserStore from '@/stores/user'

export default function Posts() {
  const router = useRouter()
  const name = useUserStore((state) => state.name)

  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
    clearOnDefault: true,
  })
  const debouncedSearch = useDebounce(search, 500)
  const { isLoading, data: posts } = useGetPosts({
    search: debouncedSearch,
  })

  const handleView = (post: Post) => {
    router.push(`/posts/${post.id}`)
  }

  const handleUpdate = (post: Post) => {
    console.log('Update post', post)
  }

  const handleDelete = (post: Post) => {
    console.log('Delete post', post)
  }

  const columns: TableProps<Post>['columns'] = [
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
      render: (_, row) => (
        <Space>
          <Tooltip title="View detail post">
            <Button
              color="blue"
              variant="outlined"
              onClick={() => handleView(row)}
              aria-label="View detail post"
            >
              <EyeOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Update post">
            <Button
              color="green"
              variant="outlined"
              onClick={() => handleUpdate(row)}
              aria-label="Update post"
            >
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Delete post">
            <Button
              color="danger"
              variant="solid"
              onClick={() => handleDelete(row)}
              aria-label="Delete post"
            >
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ]

  return (
    <section className="container mx-auto p-4">
      <div className="flex justify-between items-center py-4 mb-4 border-b">
        <p className="text-xl font-medium">Welcome, {name || '...'} 👋</p>
        <Button type="primary">Create Post</Button>
      </div>
      <Input
        placeholder="Search by post title ..."
        prefix={<SearchOutlined />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table
        className="mt-4"
        dataSource={posts?.data ?? []}
        columns={columns}
        loading={isLoading}
        pagination={{ position: [] }}
      />
    </section>
  )
}
