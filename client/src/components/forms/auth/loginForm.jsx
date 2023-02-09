import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Tag } from "antd";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../../../features/auth/authApi";

const LoginForm = ({ onSuccess }) => {
  const [error, setError] = useState("");

  const [login, { data, isLoading, error: responseError }] = useLoginMutation();

  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data.message);
    }
    if (data?.accessToken && data?.user) {
      onSuccess();
    }
  }, [data, responseError]);

  const onFinish = (value) => {
    setError("");

    login({
      phone: value.phone,
      password: value.password,
    });
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="phone"
        rules={[{ required: true, message: "Please input your Phone!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="phone"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          size="large"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={isLoading}
          style={{ width: "100%" }}
        >
          Log in
        </Button>
      </Form.Item>
      Or <a href="">register now!</a>
      <div>{error !== "" && <Tag color="magenta">{error}</Tag>}</div>
    </Form>
  );
};

export default LoginForm;
