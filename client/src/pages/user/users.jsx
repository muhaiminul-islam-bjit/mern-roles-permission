import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../features/auth/authSlice";
import {
  useDeleteUsersMutation,
  useGetUsersQuery,
} from "../../features/users/usersApi";
import { Button, message, Popconfirm, Typography } from "antd";
import Container from "../../components/ui/atom/container";
import { Space, Table, Tag } from "antd";
const { Title } = Typography;

const Users = () => {
  const dispatch = useDispatch();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const {
    data: users,
    isError,
    isLoading,
    error,
  } = useGetUsersQuery({
    pageNumber: tableParams.pagination.current,
    limit: tableParams.pagination.pageSize,
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
    });
  };

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

  const deleteUser = (id) =>
    new Promise((resolve) => {
      deleteUserData({ id });
    });

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
      title: "websitePhone",
      dataIndex: "websitePhone",
      key: "websitePhone",
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Delete"
            description="Do you really want to delete this ?"
            onConfirm={() => {
              deleteUser(record.id);
            }}
          >
            <Button type="dashed">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>User</Title>
      <Container>
        <Table
          columns={columns}
          dataSource={users?.data}
          loading={isLoading}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
        />
      </Container>
    </div>
  );
};

export default Users;
