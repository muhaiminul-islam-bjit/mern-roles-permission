import {
  DashboardOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Avatar, Breadcrumb, Layout, Menu, Popover, Space, theme } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { apiSlice } from "../../../features/api/apiSlice";
import { userLoggedOut } from "../../../features/auth/authSlice";
import Logo from "../atom/logo";
import "./dashboard.css";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const Dashboard = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("mail");
  const selectedKey = useLocation().pathname;
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const items = [
    {
      key: "0",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => {
        navigate("/");
      },
    },
    getItem("User", "user", <UserOutlined />, [
      {
        key: "1",
        label: "All User",
        onClick: () => {
          navigate("/users");
        },
      },
    ]),
    getItem("Settings", "settings", <SettingOutlined />, [
      {
        key: "2",
        label: "Roles",
        onClick: () => {
          navigate("/roles");
        },
      },
    ]),
  ];
  const highlight = () => {
    if (selectedKey === "/") {
      return ["0"];
    } else if (selectedKey === "/users") {
      return ["1"];
    } else if (selectedKey === "/roles") {
      return ["2"];
    }
  };
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(userLoggedOut());
    dispatch(apiSlice.util.resetApiState());
    localStorage.clear();
  };

  const content = (
    <div>
      <p>Change Password</p>
      <Space onClick={logout} style={{cursor: "pointer"}}>
        <UserSwitchOutlined />
        <span>Logout</span>
      </Space>
    </div>
  );

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        theme="light"
        width={"250px"}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Logo />
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          selectedKeys={highlight()}
          onClick={onClick}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="dash__header"
          style={{
            padding: 20,
            paddingRight: "40px",
            display: "flex",
            background: "#fff",
            justifyContent: "space-between",
          }}
        >
          <div className="dash__icons">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </div>
          <div className="dash__icons">
            <Popover
              content={content}
              placement="topLeft"
              title={user.username}
              trigger="click"
            >
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
            </Popover>
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Product of World Wide Software Limited
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
