import { useCallback, useState } from 'react';

import {
  FileTextOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TagOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Avatar, Button, Dropdown, Layout, Menu, message, theme } from 'antd';
import type { MenuProps } from 'antd';
import { Outlet, useNavigate } from 'react-router';

import { authService } from '@/services/auth';
import { storeSelector } from '@/store';

const { Header, Sider, Content } = Layout;

const LayoutComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const userInfo = storeSelector.use.userInfo();
  const logout = storeSelector.use.logout();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logout();
      message.success('已退出登录');
      navigate('/login');
    },
    onError: () => {
      message.error('登出失败');
    },
  });

  const handleLogout = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  // 用户下拉菜单
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  // 侧边栏菜单
  const sideMenuItems: MenuProps['items'] = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '首页',
      onClick: () => navigate('/'),
    },
    {
      key: '/content',
      icon: <FileTextOutlined />,
      label: '内容管理',
      onClick: () => navigate('/content/list'),
    },
    {
      key: '/user',
      icon: <TeamOutlined />,
      label: '用户管理',
      onClick: () => navigate('/user/list'),
    },
    {
      key: '/tag',
      icon: <TagOutlined />,
      label: '标签管理',
      onClick: () => navigate('/tag/list'),
    },
    {
      key: '/hello',
      icon: <UserOutlined />,
      label: 'Hello',
      onClick: () => navigate('/hello'),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={undefined} collapsible collapsed={collapsed}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: collapsed ? 14 : 18,
            fontWeight: 'bold',
          }}
        >
          {collapsed ? 'CMS' : 'CMS 后台'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/']}
          items={sideMenuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: 24,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <Avatar
                  src={userInfo?.avatar}
                  icon={<UserOutlined />}
                  style={{ marginRight: 8 }}
                />
                <span>{userInfo?.nickname || userInfo?.username}</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
