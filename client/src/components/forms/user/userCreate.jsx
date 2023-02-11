import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Select, Tag } from "antd";
import { useRegisterMutation } from "../../../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { useGetRolesPulldownQuery } from "../../../features/roles/rolesApi";
import { useSelector } from "react-redux";
import { useGetStorePullDownQuery } from "../../../features/store/storeApi";

const UserCreate = ({ onSuccess }) => {
  const [register, { data, isSuccess, error: responseError }] =
    useRegisterMutation();
  const authUser = useSelector((state) => state.auth);
  console.log(authUser);
  const { data: roles } = useGetRolesPulldownQuery({});
  const { data: stores } = useGetStorePullDownQuery();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const formRef = React.useRef(null);

  useEffect(() => {
    if (isSuccess) {
      formRef.current?.resetFields();
      onSuccess();
      message.success("Role Created Successfully");
      setError("");
    }

    if (responseError?.data) {
      setError(responseError.data.message);
    }
    if (data?.accessToken && data?.user) {
      navigate("/");
    }
    console.log("Render test")
  }, [data, responseError, navigate, isSuccess,]);

  console.log(stores);

  const onFinish = (values) => {
    register({
      username: values.username,
      email: values.email,
      password: values.password,
      phone: values.phone,
      storeId: values.storeId,
      roles: values.roles,
    });
  };

  return (
    <div>
      <Form
        name="wrap"
        labelAlign="left"
        labelWrap
        onFinish={onFinish}
        layout="vertical"
        ref={formRef}
      >
        <Form.Item
          label="User Name"
          name="username"
          rules={[
            {
              required: true,
              message: "Please enter Username",
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
          label="Store Name"
          name="storeId"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select a store"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={stores}
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
      {error !== "" && <Tag color="magenta">{error}</Tag>}
    </div>
  );
};

export default UserCreate;
