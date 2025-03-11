import { Button, Input, Space, Table, TableProps, Tooltip } from 'antd'
import { useRouter } from 'next/router'
import { useQueryState } from 'nuqs'
import { DeleteOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons'

import { Post } from '@/types/post'
import { PageContainer } from '@/components/layouts'
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
    <PageContainer
      title={`Welcome, ${name || '...'} 👋`}
      action={
        <Button type="primary" onClick={() => router.push('/posts/create')}>
          Create post
        </Button>
      }
    >
      <Input
        placeholder="Search by post title ..."
        prefix={<SearchOutlined />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        allowClear
      />
      <Table
        className="mt-4"
        dataSource={posts?.data ?? []}
        columns={columns}
        loading={isLoading}
        pagination={{ position: [] }}
      />
    </PageContainer>
  )
}
