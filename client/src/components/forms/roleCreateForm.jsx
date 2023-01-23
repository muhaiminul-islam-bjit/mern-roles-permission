import { Button, Checkbox, Form, Input } from "antd";
import { useCreateRoleMutation } from "../../features/roles/rolesApi";
import Error from "../../components/ui/Error";
import React from "react";

const RoleCreateForm = ({ onSuccess }) => {
  const [create, { data, isLoading, error }] = useCreateRoleMutation();
  const formRef = React.useRef(null);

  const onFinish = (value) => {
    create({
      role: value.role,
      permissions: value.permissions,
    });
    formRef.current?.resetFields();
    onSuccess();
  };

  const options = [
    { label: "createUser", value: "createUser" },
    { label: "updateUser", value: "updateUser" },
    { label: "deleteUser", value: "deleteUser" },
    { label: "viewUser", value: "viewUser" },
  ];

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
          label="Role name"
          name="role"
          rules={[
            {
              required: true,
              message: "Please enter role name",
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
          <Checkbox.Group options={options} defaultValue={["Apple"]} />
        </Form.Item>

        <Form.Item label=" ">
          <Button type="default" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {error !== "" && <Error message={error} />}
    </div>
  );
};

export default RoleCreateForm;
