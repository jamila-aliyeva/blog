import { useContext, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  UsergroupDeleteOutlined,
  LoginOutlined,
} from "@ant-design/icons";

import { Layout, Menu, Button, theme, Modal } from "antd";

import "./style.scss";
import { AuthContext } from "../../../context/AuthContext";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        className="admin-aside"
        trigger={null}
        collapsible
        collapsed={collapsed}>
        <div className="admin-logo">{collapsed ? "LMS" : "LMS admin"}</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/dashboard",
              icon: <HomeOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "/categories",
              icon: <UserOutlined />,
              label: <Link to="/categories">Categories</Link>,
            },
            {
              key: "/adminPost",
              icon: <UsergroupDeleteOutlined />,
              label: <Link to="/adminPost">Posts</Link>,
            },
            {
              icon: <LoginOutlined />,
              label: (
                <Button
                  danger
                  type="primary"
                  onClick={() =>
                    Modal.confirm({
                      title: "Do you want to exit ?",
                      onOk: () => logout(navigate),
                    })
                  }>
                  Logout
                </Button>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="admin-header"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          className="admin-main"
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
