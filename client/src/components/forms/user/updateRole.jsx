import { Button, Checkbox, Form, Input, message, Select, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useGetRolesPulldownQuery } from "../../../features/roles/rolesApi";
import {
  useGetUserByIdQuery,
  useUpdateUsersMutation,
} from "../../../features/users/usersApi";

const UpdateRole = ({ id, onSuccess }) => {
  const {
    data: user,
    isSuccess: isFetchSuccess,
    error: responseError,
  } = useGetUserByIdQuery({ id });
  const [update, { error: updateError, isSuccess }] = useUpdateUsersMutation();
  const { data: roles } = useGetRolesPulldownQuery({});
  const [error, setError] = useState("");
  const [form] = Form.useForm();

  const onFinish = (value) => {
    console.log("test")
    update({
      id,
      roles: value.roles,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Updated successfully");
      onSuccess();
    }

    if (error) {
      setError(error.message);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (isFetchSuccess) {
      const userRoles = user.data.roles.map((item) => {
        return { label: item.role, value: item._id };
      });
      form.setFieldsValue({
        username: user.data.username,
        phone: user.data.phone,
        roles: userRoles,
      });
      console.log("Hello");
      setError("");
    }
    if (responseError) {
      setError(responseError.data.message);
    }
  }, [responseError, error, isFetchSuccess, user, id]);

  return (
    <div>
      <Form
        name="wrap"
        labelAlign="left"
        labelWrap
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="User name"
          name="username"
          rules={[
            {
              required: true,
              message: "Please enter role name",
            },
            {
              pattern: /^\S*$/,
              message: "Space not allowed",
            },
          ]}
        >
          <Input size="large" disabled />
        </Form.Item>
        <Form.Item label="Phone" name="phone">
          <Input size="large" disabled type="number" />
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

export default UpdateRole;
