import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Proptypes from "prop-types";
import { Layout, Menu, Button, theme, Modal } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  UsergroupDeleteOutlined,
  LoginOutlined,
} from "@ant-design/icons";

import "./AdminLayout.css";
import IS_LOGIN from "../constants";

const { Header, Sider, Content } = Layout;
const AdminLayout = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logout = () => {
    Modal.confirm({
      title: "Do you want to exit ?",
      onOk: () => {
        navigate("/login");
        setIsLogin(false);
        localStorage.removeItem(IS_LOGIN);
      },
    });
  };

  return (
    <Layout>
      <Sider
        className="sider-aside"
        trigger={null}
        collapsible
        collapsed={collapsed}>
        <div className="admin-logo">Logo</div>
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
              key: "/teachers",
              icon: <UserOutlined />,
              label: <Link to="/teachers">Teachers</Link>,
            },
            {
              key: "/students",
              icon: <UsergroupDeleteOutlined />,
              label: <Link to="/students">Students</Link>,
            },
            {
              key: "4",
              icon: <LoginOutlined />,
              label: <Link onClick={logout}>Logout</Link>,
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

AdminLayout.Proptypes = {
  setIsLogin: Proptypes.func,
};
export default AdminLayout;

// 1001
