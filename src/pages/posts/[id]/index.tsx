import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Skeleton,
  Space,
  Typography,
} from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Post } from '@/types/post'
import { PageContainer } from '@/components/layouts'
import { updatePost, useGetPost } from '@/lib/posts'

export default function Detail() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [toast, contextHolder] = notification.useNotification()
  const { isLoading, data: post } = useGetPost(
    router.query.id ? Number(router.query.id) : 0,
  )

  const [isModalOpen, setIsModalOpen] = useState(false)
  const { mutate, isPending } = useMutation({
    mutationFn: (values: Partial<Post>) =>
      updatePost(post?.id as number, values),
    onSuccess: () => {
      setIsModalOpen(false)
      toast.success({
        message: 'Success',
        description: 'Post successfully updated!',
        placement: 'top',
        duration: 3,
      })
      queryClient.invalidateQueries({
        queryKey: ['post', post?.id],
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

  const handleSubmit = (values: Pick<Post, 'body' | 'title'>) => {
    mutate({ ...values, id: post?.id })
  }

  return (
    <>
      {contextHolder}
      <PageContainer
        title="Detail post"
        action={
          <Space>
            <Button onClick={() => setIsModalOpen(true)}>Update</Button>
            <Button type="primary" onClick={() => router.back()}>
              Back
            </Button>
          </Space>
        }
      >
        {isLoading && <Skeleton active />}
        {post && (
          <article>
            <Typography.Title level={3}>{post.title}</Typography.Title>
            <p>{post.body}</p>
          </article>
        )}
      </PageContainer>

      <Modal
        title="Update post"
        open={isModalOpen}
        footer={[]}
        closeIcon={null}
        centered
      >
        <Form
          layout="vertical"
          className="mt-8"
          onFinish={handleSubmit}
          initialValues={{ title: post?.title, body: post?.body }}
        >
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
            <div className="flex items-center gap-2 w-full">
              <Button
                className="w-full"
                onClick={() => setIsModalOpen(false)}
                htmlType="button"
              >
                Cancel
              </Button>
              <Button
                className="w-full"
                type="primary"
                htmlType="submit"
                loading={isPending}
              >
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
