import { DashboardOutlined, DesktopOutlined, FileOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { userLoggedOut } from '../../../features/auth/authSlice';
import Logo from '../atom/logo';
import './dashboard.css';
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
    const [current, setCurrent] = useState('mail');
    const selectedKey = useLocation().pathname
    const navigate = useNavigate();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    const items = [
        {
            key: '0',
            icon: <DashboardOutlined />,
            label: "Dashboard",
            onClick: () => { navigate('/') }
        },
        getItem('Option 1', '1', <PieChartOutlined />),
        getItem('Option 2', '2', <DesktopOutlined />),
        getItem('User', 'sub1', <UserOutlined />, [
            {
                key: '3',
                label: "Create New",
                onClick: () => { navigate('/user/create') }
            },
        ]),
        getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
        getItem('Files', '9', <FileOutlined />),
    ];
    const highlight = () => {
        if (selectedKey === '/') {
            return ['0']
        } else if (selectedKey === '/inbox') {
            return ['0']
        } else if(selectedKey === '/user/create'){
            return ['3']
        }
    }
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(userLoggedOut());
        localStorage.clear();
    }
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible theme='light' width={'250px'} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Logo />
                <Menu theme="light" defaultSelectedKeys={['1']} selectedKeys={highlight()} onClick={onClick} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Header className='dash__header'
                    style={{
                        padding: 20,
                        display: 'flex',
                        background: 'lightsteelblue',
                        justifyContent: 'space-between'
                    }}
                >
                    <div className='dash__icons'>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </div>
                    <div className='dash__icons'>
                        <LogoutOutlined className='dash__logout' onClick={logout} />
                    </div>

                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
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
                        textAlign: 'center',
                    }}
                >
                    Product of World Wide Software Limited
                </Footer>
            </Layout>
        </Layout>
    );
};
export default Dashboard;