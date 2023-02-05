import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../features/auth/authSlice";
import Container from "../../components/ui/atom/container";
import { Space, Table, Tag } from "antd";
import {
  CloseCircleOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import UserCreate from "../../components/forms/user/userCreate";
import {
  useDeleteUsersMutation,
  useGetUsersQuery,
} from "../../features/users/usersApi";
import {
  Button,
  Col,
  Drawer,
  Input,
  message,
  Popconfirm,
  Row,
  Typography,
} from "antd";
import UpdateRole from "../../components/forms/user/updateRole";

const Users = () => {
  const { Title } = Typography;
  const { Search } = Input;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState();
  const [userId, setUserId] = useState(null);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const contents = {
    createUser: "createUser",
    updateUser: "updateUser",
  };

  const drawerTitle = {
    createUser: "Create new user",
    updateUser: "Update user",
  };

  const showDrawer = (content) => {
    setContent(content);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const afterCreate = () => {
    setOpen(false);
  };

  const {
    data: users,
    isLoading,
    error,
  } = useGetUsersQuery({
    pageNumber: tableParams.pagination.current,
    limit: tableParams.pagination.pageSize,
    search: searchText,
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
    });
  };

  const onSearch = (value) => {
    setSearchText(value);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: 1,
      },
    });
  };

  const handleClear = () => {
    setSearchText("");
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: 1,
      },
    });
  };

  const deleteUser = (id) =>
    new Promise((resolve) => {
      deleteUserData({ id });
    });

  const [
    deleteUserData,
    {
      isSuccess: deleteSuccess,
      isError: deleteError,
      error: deleteErrorMessage,
    },
  ] = useDeleteUsersMutation();

  useEffect(() => {
    if (deleteSuccess) {
      message.success("Deleted successfully");
    }

    if (deleteError) {
      message.error(deleteErrorMessage?.data?.message);
    }
  }, [deleteError, deleteSuccess]);

  useEffect(() => {
    if (error) {
      if (error.status === 401) {
        dispatch(userLoggedOut());
        localStorage.clear();
      }
    }

    if (users?.data.length) {
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: users?.total,
        },
      });
    }
  }, [dispatch, error, users]);

  const columns = [
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "store",
      dataIndex: "store",
      key: "store",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        return (
          <Tag color={text ? "green" : "error"}>
            {text ? "ACTIVE" : "INACTIVE"}
          </Tag>
        );
      },
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (_, { roles }) => (
        <>
          {roles.map((role, index) => {
            let color = "geekblue";
            return (
              <Tag color={color} key={index}>
                {role.role.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Popconfirm
            title="Delete"
            description="Do you really want to delete this ?"
            onConfirm={() => {
              deleteUser(record.id);
            }}
          >
            <Button icon={<DeleteOutlined />} type="dashed" danger>
              Delete
            </Button>
          </Popconfirm>
          <Button
            onClick={() => {
              setUserId(record.id);
              showDrawer(contents.updateUser);
            }}
            type="link"
          >
            Update Role
          </Button>
        </Space>
      ),
    },
  ];

  const drawerElement = () => {
    const elements = {
      createUser: <UserCreate onSuccess={afterCreate} />,
      updateUser: <UpdateRole id={userId} onSuccess={onClose} />,
    };
    return elements[content];
  };

  return (
    <div>
      <Row align="middle">
        <Col span={16}>
          <Title level={2}>User</Title>
        </Col>
        <Col span={4}>
          <Search
            placeholder="input search text"
            allowClear={{
              clearIcon: <CloseCircleOutlined onClick={handleClear} />,
            }}
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </Col>

        <Col span={4}>
          <Button
            type="primary"
            onClick={() => showDrawer(contents.createUser)}
            icon={<PlusOutlined />}
          >
            New User
          </Button>
        </Col>
      </Row>
      <Container>
        <Table
          columns={columns}
          dataSource={users?.data}
          loading={isLoading}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
        />
      </Container>
      <Drawer
        title={drawerTitle[content]}
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        {drawerElement()}
      </Drawer>
    </div>
  );
};

export default Users;
