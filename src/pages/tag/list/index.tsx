import { useState } from 'react';

import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Tag as AntTag,
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  type TableProps,
  message,
} from 'antd';

import { tagService } from '@/services/tag';
import type { CreateTagDto, Tag, TagListParams } from '@/types/tag';

const TagListPage = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const [params, setParams] = useState<TagListParams>({
    page: 1,
    pageSize: 10,
    keyword: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>();

  // 获取标签列表
  const { data, isLoading } = useQuery({
    queryKey: ['tags', params],
    queryFn: () => tagService.getList(params),
  });

  // 删除标签
  const deleteMutation = useMutation({
    mutationFn: tagService.delete,
    onSuccess: () => {
      message.success('删除成功');
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });

  // 保存标签
  const saveMutation = useMutation({
    mutationFn: (data: { id?: string; values: CreateTagDto }) => {
      if (data.id) {
        return tagService.update(data.id, data.values);
      }
      return tagService.create(data.values);
    },
    onSuccess: () => {
      message.success(editingTag ? '更新成功' : '创建成功');
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      setIsModalOpen(false);
      form.resetFields();
      setEditingTag(undefined);
    },
  });

  // 打开弹窗
  const handleOpenModal = (tag?: Tag) => {
    if (tag) {
      setEditingTag(tag);
      form.setFieldsValue(tag);
    } else {
      setEditingTag(undefined);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  // 提交表单
  const handleSubmit = (values: CreateTagDto) => {
    saveMutation.mutate({ id: editingTag?.id, values });
  };

  // 表格列定义
  const columns: TableProps<Tag>['columns'] = [
    { title: 'ID', dataIndex: 'id', width: 80 },
    { title: '名称', dataIndex: 'name', width: 150 },
    { title: 'Slug', dataIndex: 'slug', width: 150 },
    {
      title: '颜色',
      dataIndex: 'color',
      width: 120,
      render: (color: string, record: Tag) => (
        <AntTag color={color}>{record.name}</AntTag>
      ),
    },
    { title: '内容数', dataIndex: 'contentCount', width: 100 },
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
      render: (_text: unknown, record: Tag) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleOpenModal(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除？"
            onConfirm={() => deleteMutation.mutate(record.id)}
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        title="标签管理"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleOpenModal()}
          >
            新建标签
          </Button>
        }
      >
        <Space style={{ marginBottom: 16 }}>
          <Input.Search
            placeholder="搜索标签名称"
            style={{ width: 300 }}
            onSearch={value =>
              setParams({ ...params, keyword: value, page: 1 })
            }
            allowClear
          />
        </Space>

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

      <Modal
        title={editingTag ? '编辑标签' : '新建标签'}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setEditingTag(undefined);
        }}
        footer={undefined}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input placeholder="请输入名称" />
          </Form.Item>

          <Form.Item
            label="Slug"
            name="slug"
            rules={[{ required: true, message: '请输入 Slug' }]}
          >
            <Input placeholder="请输入 Slug" />
          </Form.Item>

          <Form.Item label="颜色" name="color">
            <Input type="color" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={saveMutation.isPending}
              >
                {editingTag ? '保存' : '创建'}
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TagListPage;
