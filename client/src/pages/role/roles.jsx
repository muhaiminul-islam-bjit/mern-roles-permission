import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Row, Space, Table, Tag } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import RoleCreateForm from "../../components/forms/role/roleCreateForm";
import Container from "../../components/ui/atom/container";
import { useGetRolesQuery } from "../../features/roles/rolesApi";

const columns = [
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Psermissions",
    dataIndex: "permissions",
    key: "permissions",
    render: (_, { permissions }) => (
      <>
        {permissions.map((permissioin) => {
          let color = "green";
          return <Tag color={color}>{permissioin.toUpperCase()}</Tag>;
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
];

const Roles = () => {
  const { data: roles, isError, isLoading, error } = useGetRolesQuery({});
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const afterRoleCreate = () => {
    setOpen(false);
  };

  return (
    <div>
      <Row align="middle">
        <Col span={20}>
          <Title level={2}>Roles</Title>
        </Col>
        <Col span={4}>
          <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
            New role
          </Button>
        </Col>
      </Row>

      <Container>
        <Table columns={columns} dataSource={roles?.data} loading={isLoading} />
      </Container>
      <Drawer
        title="Create a new role"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="default">
              Submit
            </Button>
          </Space>
        }
      >
        <RoleCreateForm onSuccess={afterRoleCreate} />
      </Drawer>
    </div>
  );
};

export default Roles;
