import {
  Button,
  Input,
  Modal,
  notification,
  Pagination,
  Space,
  Table,
  TableProps,
  Tooltip,
} from 'antd'
import { DeleteOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { useQueryState } from 'nuqs'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Post } from '@/types/post'
import { PageContainer } from '@/components/layouts'
import { deletePost as deletePostFn, useGetPosts } from '@/lib/posts'
import useDebounce from '@/hooks/use-debounce'
import useUserStore from '@/stores/user'

export default function Posts() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const name = useUserStore((state) => state.name)

  const [modal, modalContext] = Modal.useModal()
  const [toast, notificationContext] = notification.useNotification()

  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
    clearOnDefault: true,
  })
  const [currentPage, setCurrentPage] = useQueryState('page', {
    defaultValue: '1',
    clearOnDefault: true,
  })
  const [perPage, setPerPage] = useQueryState('per_page', {
    defaultValue: '10',
    clearOnDefault: true,
  })

  const debouncedSearch = useDebounce(search, 500)
  const { isLoading, data: posts } = useGetPosts({
    search: debouncedSearch,
    page: currentPage,
    per_page: perPage,
  })

  const { mutate: deletePost } = useMutation({
    mutationFn: deletePostFn,
    onSuccess: () => {
      toast.success({
        message: 'Success',
        description: 'Post successfully deleted!',
        placement: 'top',
        duration: 3,
      })
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      })
    },
    onError: (error) => {
      toast.error({
        message: 'Error',
        description:
          error instanceof Error ? error.message : 'Something went wrong',
        placement: 'top',
        duration: 3,
      })
    },
  })

  const handleView = (post: Post) => {
    router.push(`/posts/${post.id}`)
  }

  const handleDelete = (post: Post) => {
    modal.confirm({
      title: 'Delete post',
      content: `Are you sure you want to delete post "${post.title}"?`,
      onOk: () => {
        deletePost(post.id)
      },
    })
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
        pagination={{
          position: [],
          pageSize: Number(perPage),
        }}
      />
      <Pagination
        className="mt-4 flex justify-end"
        showSizeChanger
        defaultPageSize={Number(perPage)}
        onShowSizeChange={(_, size) => setPerPage(size.toString())}
        defaultCurrent={Number(currentPage)}
        onChange={(page) => setCurrentPage(page.toString())}
        total={posts?.meta?.pagination.total}
        showTotal={(total, [start, end]) =>
          `Showing ${start} to ${end} of ${total} posts`
        }
      />
      {modalContext}
      {notificationContext}
    </PageContainer>
  )
}
