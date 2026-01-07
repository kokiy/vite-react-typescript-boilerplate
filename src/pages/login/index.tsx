import { useCallback } from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Card, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router';

import { authService } from '@/services/auth';
import { storeSelector } from '@/store';
import type { LoginParams } from '@/types/user';

import './index.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const login = storeSelector.use.login();
  const initPermissions = storeSelector.use.initPermissions();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: data => {
      login(data.token, data.user);
      initPermissions(data.user.role);
      message.success('登录成功');
      navigate('/');
    },
    onError: () => {
      message.error('登录失败，请检查用户名和密码');
    },
  });

  const handleLogin = useCallback(
    (values: LoginParams) => {
      loginMutation.mutate(values);
    },
    [loginMutation],
  );

  return (
    <div className="login-container">
      <Card className="login-card" title="CMS 后台管理系统">
        <Form
          name="login"
          onFinish={handleLogin}
          autoComplete="off"
          size="large"
          initialValues={{ username: 'admin', password: 'admin123' }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loginMutation.isPending}
            >
              登录
            </Button>
          </Form.Item>
        </Form>

        <div className="login-tips">
          <p>测试账号：</p>
          <p>超级管理员：admin / admin123</p>
          <p>编辑：editor / editor123</p>
          <p>访客：viewer / viewer123</p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
