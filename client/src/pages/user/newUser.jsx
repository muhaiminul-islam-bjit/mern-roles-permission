import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Select } from "antd";
import Error from "../../components/ui/Error";
import { useRegisterMutation } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { useGetRolesQuery } from "../../features/roles/rolesApi";
import { useSelector } from "react-redux";

const NewUser = () => {
  const [register, { data, isLoading, error: responseError }] =
    useRegisterMutation();
  const authUser = useSelector((state) => state.auth);
  console.log(authUser);
  const { data: roles } = useGetRolesQuery({
    websiteId: authUser?.user.websiteId,
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data.message);
    }
    if (data?.accessToken && data?.user) {
      navigate("/");
    }
  }, [data, responseError, navigate]);

  const onFinish = (values) => {
    setError("");
    register({
      username: values.username,
      email: values.email,
      password: values.password,
      phone: values.phone,
      websiteName: values.websiteName,
      storeName: values.storeName,
      roles: values.roles,
    });

    navigate("/users");
  };

  return (
    <Col className="gutter-row" span={12}>
      <Form
        name="wrap"
        labelCol={{
          flex: "110px",
        }}
        labelAlign="left"
        labelWrap
        wrapperCol={{
          flex: 1,
        }}
        colon={false}
        onFinish={onFinish}
      >
        <Form.Item
          label="User Name"
          name="username"
          rules={[
            {
              required: true,
              message: "Please enter Username"
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="email" size="large" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" size="large" />
        </Form.Item>

        <Form.Item
          label="Website Name"
          name="websiteName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Store Name"
          name="storeName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            placeholder="Store name"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Roles"
          name="roles"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Please select"
            style={{ width: "100%" }}
            options={roles}
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="password" size="large" />
        </Form.Item>

        <Form.Item label=" ">
          <Button type="default" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {error !== "" && <Error message={error} />}
    </Col>
  );
};

export default NewUser;
