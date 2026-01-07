import { useState } from 'react';

import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Card,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  type TableProps,
  Tag,
  message,
} from 'antd';
import { useNavigate } from 'react-router';

import { queryKeys } from '@/lib/query-keys';
import { contentService } from '@/services/content';
import { storeSelector } from '@/store';
import type { Content, ContentListParams } from '@/types/content';
import {
  CONTENT_STATUS_COLORS,
  CONTENT_STATUS_LABELS,
} from '@/utils/constants';

const ContentListPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const hasPermission = storeSelector.use.hasPermission();

  const [params, setParams] = useState<ContentListParams>({
    page: 1,
    pageSize: 10,
    keyword: '',
    status: undefined,
  });

  // 获取内容列表
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.content.list(params),
    queryFn: () => contentService.getList(params),
  });

  // 删除内容
  const deleteMutation = useMutation({
    mutationFn: contentService.delete,
    onSuccess: () => {
      message.success('删除成功');
      queryClient.invalidateQueries({ queryKey: queryKeys.content.lists() });
    },
    onError: () => {
      message.error('删除失败');
    },
  });

  // 表格列定义
  const columns: TableProps<Content>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 300,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={CONTENT_STATUS_COLORS[status]}>
          {CONTENT_STATUS_LABELS[status]}
        </Tag>
      ),
    },
    {
      title: '作者',
      dataIndex: ['author', 'nickname'],
      width: 120,
    },
    {
      title: '浏览量',
      dataIndex: 'viewCount',
      width: 100,
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
      width: 200,
      render: (_text: unknown, record: Content) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/content/detail/${record.id}`)}
          >
            查看
          </Button>
          {hasPermission('content:edit') && (
            <Button
              type="link"
              size="small"
              icon={<EditOutlined />}
              onClick={() => navigate(`/content/editor/${record.id}`)}
            >
              编辑
            </Button>
          )}
          {hasPermission('content:delete') && (
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
    <Card
      title="内容管理"
      extra={
        hasPermission('content:create') && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/content/editor')}
          >
            新建内容
          </Button>
        )
      }
    >
      {/* 搜索筛选 */}
      <Space style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="搜索标题或内容"
          style={{ width: 300 }}
          onSearch={value => setParams({ ...params, keyword: value, page: 1 })}
          allowClear
        />
        <Select
          placeholder="状态筛选"
          style={{ width: 150 }}
          allowClear
          onChange={value => setParams({ ...params, status: value, page: 1 })}
        >
          <Select.Option value="draft">草稿</Select.Option>
          <Select.Option value="published">已发布</Select.Option>
          <Select.Option value="archived">已归档</Select.Option>
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
  );
};

export default ContentListPage;
