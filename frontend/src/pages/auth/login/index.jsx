import React, { useState } from "react";
import { Form, Button, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import WelcomeContent from "../common/welcomeContent";
import { login } from "../../../api-services/users-service";
import Cookies from 'universal-cookie';

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();

  const onFinsh = async (values) => {
    try {
      setLoading(true);
      const response = await login(values);
      console.log(response);
      message.success(response.message);
      // cookies.set("token", response.token);
      cookies.set('token',  response.token, { path: '/' });

      navigate("/");
    } catch (error) {
      message.error(error.response.data.message || error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }

    // console.log('Values from login page', values);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <WelcomeContent />
      <div className="h-screen flex items-center justify-center">
        <Form
          className="flex flex-col gap-5"
          layout="vertical"
          onFinish={onFinsh}
        >
          <h1 className="text-2xl font-bold text-gray-600">
            Login your account
          </h1>
          <Form.Item
            name="email"
            required
            label="Email"
            rules={[{ required: true }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            required
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
          <Link to="/register">Don't have an account? Register</Link>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
