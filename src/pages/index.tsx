import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button, Form, Input, Modal } from 'antd'

import useUserStore from '@/stores/user'

export default function Home() {
  const { name, token, setUser } = useUserStore()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsOpen(true)
  }, [])

  const handleSubmit = (values: Record<string, string>) => {
    setUser(values.name, values.token)
    router.push('/posts')
  }

  return (
    <Modal
      title="Fill the form below to proceed"
      open={isOpen}
      footer={[]}
      closeIcon={null}
      centered
    >
      <Form
        layout="vertical"
        className="mt-8"
        onFinish={handleSubmit}
        initialValues={{ name, token }}
      >
        <Form.Item
          name="name"
          label="Name"
          tooltip="This is a required field"
          required
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input placeholder="Input your name" />
        </Form.Item>
        <Form.Item
          name="token"
          label="Go Rest Token"
          tooltip="This is a required field"
          required
          rules={[
            { required: true, message: 'Please input your Go Rest Token!' },
          ]}
        >
          <Input placeholder="Input your Go Rest Token" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full py-5">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
