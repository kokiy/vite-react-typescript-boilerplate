import { useState } from 'react';

import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  type TableProps,
  Tag,
  message,
} from 'antd';

import { queryKeys } from '@/lib/query-keys';
import { userService } from '@/services/user';
import { storeSelector } from '@/store';
import type { CreateUserDto, User, UserListParams } from '@/types/user';

const UserListPage = () => {
  const queryClient = useQueryClient();
  const hasPermission = storeSelector.use.hasPermission();
  const [form] = Form.useForm();

  const [params, setParams] = useState<UserListParams>({
    page: 1,
    pageSize: 10,
    keyword: '',
    role: undefined,
    status: undefined,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>();

  // 获取用户列表
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.user.list(params),
    queryFn: () => userService.getList(params),
  });

  // 删除用户
  const deleteMutation = useMutation({
    mutationFn: userService.delete,
    onSuccess: () => {
      message.success('删除成功');
      queryClient.invalidateQueries({ queryKey: queryKeys.user.lists() });
    },
    onError: () => {
      message.error('删除失败');
    },
  });

  // 创建/更新用户
  const saveMutation = useMutation({
    mutationFn: (data: { id?: string; values: CreateUserDto }) => {
      if (data.id) {
        return userService.update(data.id, data.values);
      }
      return userService.create(data.values);
    },
    onSuccess: () => {
      message.success(editingUser ? '更新成功' : '创建成功');
      queryClient.invalidateQueries({ queryKey: queryKeys.user.lists() });
      setIsModalOpen(false);
      form.resetFields();
      setEditingUser(undefined);
    },
    onError: () => {
      message.error(editingUser ? '更新失败' : '创建失败');
    },
  });

  // 打开新建/编辑弹窗
  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      form.setFieldsValue({
        username: user.username,
        email: user.email,
        nickname: user.nickname,
        role: user.role,
        status: user.status,
      });
    } else {
      setEditingUser(undefined);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  // 提交表单
  const handleSubmit = (values: CreateUserDto) => {
    saveMutation.mutate({
      id: editingUser?.id,
      values,
    });
  };

  // 表格列定义
  const columns: TableProps<User>['columns'] = [
    {
      title: '头像',
      dataIndex: 'avatar',
      width: 80,
      render: (avatar: string, record: User) => (
        <Avatar src={avatar} icon={<UserOutlined />}>
          {record.username[0].toUpperCase()}
        </Avatar>
      ),
    },
    {
      title: '用户名',
      dataIndex: 'username',
      width: 150,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      width: 150,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 200,
    },
    {
      title: '角色',
      dataIndex: 'role',
      width: 120,
      render: (role: string) => {
        const roleMap: Record<string, { label: string; color: string }> = {
          super_admin: { label: '超级管理员', color: 'red' },
          admin: { label: '管理员', color: 'orange' },
          editor: { label: '编辑', color: 'blue' },
          viewer: { label: '访客', color: 'default' },
        };
        const roleInfo = roleMap[role] || { label: role, color: 'default' };
        return <Tag color={roleInfo.color}>{roleInfo.label}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: string) => {
        const statusMap: Record<string, { label: string; color: string }> = {
          active: { label: '正常', color: 'success' },
          inactive: { label: '禁用', color: 'default' },
          banned: { label: '封禁', color: 'error' },
        };
        const statusInfo = statusMap[status] || {
          label: status,
          color: 'default',
        };
        return <Tag color={statusInfo.color}>{statusInfo.label}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 180,
      render: (date: string) => new Date(date).toLocaleString('zh-CN'),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_text: unknown, record: User) => (
        <Space>
          {hasPermission('user:edit') && (
            <Button
              type="link"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleOpenModal(record)}
            >
              编辑
            </Button>
          )}
          {hasPermission('user:delete') && (
            <Popconfirm
              title="确定要删除吗？"
              onConfirm={() => deleteMutation.mutate(record.id)}
            >
              <Button
                type="link"
                size="small"
                danger
                icon={<DeleteOutlined />}
                loading={deleteMutation.isPending}
              >
                删除
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        title="用户管理"
        extra={
          hasPermission('user:create') && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleOpenModal()}
            >
              新建用户
            </Button>
          )
        }
      >
        {/* 搜索筛选 */}
        <Space style={{ marginBottom: 16 }}>
          <Input.Search
            placeholder="搜索用户名、邮箱或昵称"
            style={{ width: 300 }}
            onSearch={value =>
              setParams({ ...params, keyword: value, page: 1 })
            }
            allowClear
          />
          <Select
            placeholder="角色筛选"
            style={{ width: 150 }}
            allowClear
            onChange={value => setParams({ ...params, role: value, page: 1 })}
          >
            <Select.Option value="super_admin">超级管理员</Select.Option>
            <Select.Option value="admin">管理员</Select.Option>
            <Select.Option value="editor">编辑</Select.Option>
            <Select.Option value="viewer">访客</Select.Option>
          </Select>
          <Select
            placeholder="状态筛选"
            style={{ width: 120 }}
            allowClear
            onChange={value => setParams({ ...params, status: value, page: 1 })}
          >
            <Select.Option value="active">正常</Select.Option>
            <Select.Option value="inactive">禁用</Select.Option>
            <Select.Option value="banned">封禁</Select.Option>
          </Select>
        </Space>

        {/* 表格 */}
        <Table
          columns={columns}
          dataSource={data?.data}
          rowKey="id"
          loading={isLoading}
          pagination={{
            current: params.page,
            pageSize: params.pageSize,
            total: data?.total,
            showSizeChanger: true,
            showTotal: total => `共 ${total} 条`,
            onChange: (page, pageSize) =>
              setParams({ ...params, page, pageSize }),
          }}
        />
      </Card>

      {/* 新建/编辑用户弹窗 */}
      <Modal
        title={editingUser ? '编辑用户' : '新建用户'}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setEditingUser(undefined);
        }}
        footer={undefined}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" disabled={!!editingUser} />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱' },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          {!editingUser && (
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
          )}

          <Form.Item label="昵称" name="nickname">
            <Input placeholder="请输入昵称" />
          </Form.Item>

          <Form.Item
            label="角色"
            name="role"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择角色">
              <Select.Option value="super_admin">超级管理员</Select.Option>
              <Select.Option value="admin">管理员</Select.Option>
              <Select.Option value="editor">编辑</Select.Option>
              <Select.Option value="viewer">访客</Select.Option>
            </Select>
          </Form.Item>

          {editingUser && (
            <Form.Item label="状态" name="status">
              <Select placeholder="请选择状态">
                <Select.Option value="active">正常</Select.Option>
                <Select.Option value="inactive">禁用</Select.Option>
                <Select.Option value="banned">封禁</Select.Option>
              </Select>
            </Form.Item>
          )}

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={saveMutation.isPending}
              >
                {editingUser ? '保存' : '创建'}
              </Button>
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  form.resetFields();
                  setEditingUser(undefined);
                }}
              >
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserListPage;
