import { useEffect, useState } from 'react'
import { Button, Form, Input, Modal } from 'antd'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  const handleSubmit = (values: any) => {
    console.log('Received values of form: ', values)
  }

  return (
    <Modal
      title="Fill the form below to proceed"
      open={isOpen}
      footer={[]}
      closeIcon={null}
      centered
    >
      <Form layout="vertical" className="mt-8" onFinish={handleSubmit}>
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
