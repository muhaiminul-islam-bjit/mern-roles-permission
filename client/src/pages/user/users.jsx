import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../features/auth/authSlice";
import {
  useDeleteUsersMutation,
  useGetUsersQuery,
} from "../../features/users/usersApi";
import { Typography } from "antd";
import Container from "../../components/ui/atom/container";
const { Title } = Typography;
import { Space, Table, Tag } from "antd";

const Users = () => {
  const dispatch = useDispatch();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 0,
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

  const [deleteUserData, { data: userDel }] = useDeleteUsersMutation();

  useEffect(() => {
    if (error) {
      if (error.status === 401) {
        dispatch(userLoggedOut());
        localStorage.clear();
      }
    }
  }, [error]);

  const deleteUser = (id) => {
    deleteUserData({ id });
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
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
          <a>Invite {record.username}</a>
          <a
            onClick={() => {
              console.log(record);
              deleteUser(record.id);
            }}
          >
            Delete
          </a>
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
          pagination={{ current: 1, pageSize: 10, total: users?.total }}
        />
      </Container>
    </div>
  );
};

export default Users;
