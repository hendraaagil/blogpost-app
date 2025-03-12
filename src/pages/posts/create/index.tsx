import { Button, Form, Input, notification, Select } from 'antd'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Post } from '@/types/post'
import { PageContainer } from '@/components/layouts'
import { useGetUsers } from '@/lib/users'
import { createPost as createPostFn } from '@/lib/posts'

export default function Create() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [toast, contextHolder] = notification.useNotification()
  const { isLoading: isLoadUsers, data: users } = useGetUsers()

  const { mutate: createPost, isPending: isSubmitting } = useMutation({
    mutationFn: (values: Pick<Post, 'body' | 'title' | 'user_id'>) =>
      createPostFn(values),
    onSuccess: () => {
      toast.success({
        message: 'Success',
        description: 'Post successfully created!',
        placement: 'top',
        duration: 3,
      })
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      })
      router.push('/posts')
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

  const handleSubmit = (values: Pick<Post, 'body' | 'title' | 'user_id'>) => {
    createPost(values)
  }

  return (
    <PageContainer
      title="Create a new post"
      action={<Button onClick={() => router.back()}>Back</Button>}
    >
      {contextHolder}
      <Form layout="vertical" className="mt-4" onFinish={handleSubmit}>
        <Form.Item
          name="user_id"
          label="Author"
          rules={[{ required: true, message: 'Please select an author!' }]}
        >
          <Select
            className="w-full"
            placeholder="Select author"
            loading={isLoadUsers}
            options={users ?? []}
            data-testid="author-select"
            optionLabelProp="label"
          />
        </Form.Item>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input post title!' }]}
        >
          <Input placeholder="Input post title" />
        </Form.Item>
        <Form.Item
          name="body"
          label="Body"
          rules={[{ required: true, message: 'Please input post body!' }]}
        >
          <Input.TextArea placeholder="Input post body" rows={10} />
        </Form.Item>
        <Form.Item>
          <div className="flex w-full items-center gap-2">
            <Button
              className="w-full"
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
            >
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </PageContainer>
  )
}
