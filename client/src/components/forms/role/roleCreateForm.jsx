import { Button, Checkbox, Form, Input, message, Tag } from "antd";
import {
  useCreateRoleMutation,
  useGetRoleByIdQuery,
} from "../../../features/roles/rolesApi";
import React, { useEffect } from "react";
import { useState } from "react";

const RoleCreateForm = ({ id, onSuccess }) => {
  const [create, { data, isSuccess, error: responseError }] =
    useCreateRoleMutation();
  const formRef = React.useRef(null);
  const [form] = Form.useForm();
  const [error, setError] = useState("");
  const { data: role, isSuccess: isroleFetchSuccess } = useGetRoleByIdQuery(
    id ?? ""
  );

  console.log(id);

  const onFinish = (value) => {
    create({
      role: value.role,
      permissions: value.permissions,
      id: id,
    });
  };

  const options = [
    { label: "createUser", value: "createUser" },
    { label: "updateUser", value: "updateUser" },
    { label: "deleteUser", value: "deleteUser" },
    { label: "viewUser", value: "viewUser" },
  ];

  useEffect(() => {
    if (isroleFetchSuccess) {
      form.setFieldsValue({
        role: role.role,
        permissions: role.permissions,
      });
      console.log(role);
    } else {
      form.setFieldsValue({ role: "", permissions: "" });
    }
  }, [role, isroleFetchSuccess, id]);

  useEffect(() => {
    if (isSuccess) {
      formRef.current?.resetFields();
      onSuccess();
      message.success("Role Created Successfully");
      setError("");
    }

    if (responseError) {
      console.log(responseError);
      setError(responseError.data.message);
    }
  }, [data, responseError, error, isSuccess]);

  return (
    <div>
      <Form
        name="wrap"
        labelAlign="left"
        labelWrap
        onFinish={onFinish}
        layout="vertical"
        ref={formRef}
        form={form}
      >
        <Form.Item
          label="Role name"
          name="role"
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
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Role name"
          name="permissions"
          rules={[
            {
              required: true,
              message: "Please select permissions",
            },
          ]}
        >
          <Checkbox.Group options={options} />
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

export default RoleCreateForm;
