import { Form, Button, Input } from "antd";
import { Link } from "react-router-dom";
import WelcomeContent from "../common/welcomeContent";

function LoginPage() {

  const onFinsh = (values) => {
    console.log('Values from login page', values);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <WelcomeContent />
      <div className="h-screen flex items-center justify-center">
        <Form className="flex flex-col gap-5" layout="vertical" onFinish={onFinsh}>
          <h1 className="text-2xl font-bold text-gray-600">Login your account</h1>
          <Form.Item name='email' required label='Email' rules={[{ required: true }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name='password' required label='Password' rules={[{ required: true }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
          <Link to='/register'>Don't have an account? Register</Link>
        </Form>
      </div>
    </div>
  )
}

export default LoginPage