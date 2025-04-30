import { Form, Button, Input, message } from "antd";
import { Link } from "react-router-dom";
import WelcomeContent from "../common/welcomeContent";
import { register } from "../../../api-services/users-service";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  // const [messageApi] = message.useMessage();
  const navigate = useNavigate();
  const onFinsh = async (values) => {
    try {
      const response = await register(values);
      // messageApi.open({ type: "success", content: " response.message" });
      message.success(response.message);
      navigate("/login");
      console.log(response);
    } catch (error) {
      // message.error("error.response.data.message || error.message");
      // messageApi.open({ type: "error", content: " response.message" });
      message.error(error.response.data.message || error.message);
      console.log(error);
    }
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
            Register your account
          </h1>
          <Form.Item
            name="name"
            required
            label="Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
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
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
          <Link to="/login">Already have an account? Login</Link>
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;
