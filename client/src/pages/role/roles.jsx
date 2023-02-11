import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  message,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
} from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import RoleCreateForm from "../../components/forms/role/roleCreateForm";
import Container from "../../components/ui/atom/container";
import {
  useDeleteRoleMutation,
  useGetRolesQuery,
} from "../../features/roles/rolesApi";

const Roles = () => {
  const { data: roles, isError, isLoading, error } = useGetRolesQuery({});
  const [roleId, setRoleId] = useState("");
  const [drawerTitle, setDrawerTitle] = useState("");
  const [open, setOpen] = useState(false);

  const [
    deleteRole,
    {
      isSuccess: deleteSuccess,
      isError: deleteError,
      error: deleteErrorMessage,
    },
  ] = useDeleteRoleMutation();

  const showDrawer = (content) => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const afterRoleCreate = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (deleteSuccess) {
      message.success("Deleted successfully");
    }

    if (deleteError) {
      message.error(deleteErrorMessage?.data?.message);
    }
  }, [deleteError, deleteSuccess]);

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
          <Popconfirm
            title="Delete"
            description="Do you really want to delete this ?"
            onConfirm={() => {
              deleteRole(record.id);
            }}
          >
            <Button icon={<DeleteOutlined />} type="dashed" danger>
              Delete
            </Button>
          </Popconfirm>
          <Button
            onClick={() => {
              setRoleId(record.id);
              setDrawerTitle("Update Role");
              showDrawer();
            }}
            type="link"
          >
            Update Role
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row align="middle">
        <Col span={20}>
          <Title level={2}>Roles</Title>
        </Col>
        <Col span={4}>
          <Button
            type="primary"
            onClick={() => {
              showDrawer();
              setRoleId(null);
              setDrawerTitle("New Role");
            }}
            icon={<PlusOutlined />}
          >
            New role
          </Button>
        </Col>
      </Row>
      <Container>
        <Table columns={columns} dataSource={roles?.data} loading={isLoading} />
      </Container>
      <Drawer
        title={drawerTitle}
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
        <RoleCreateForm id={roleId} onSuccess={afterRoleCreate} />
      </Drawer>
    </div>
  );
};

export default Roles;
