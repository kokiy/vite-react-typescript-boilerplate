import { useEffect } from 'react';

import { SaveOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Card, Form, Input, Select, Space, message } from 'antd';
import { useNavigate, useParams } from 'react-router';

import { queryKeys } from '@/lib/query-keys';
import { contentService } from '@/services/content';
import { tagService } from '@/services/tag';
import type { CreateContentDto } from '@/types/content';

const { TextArea } = Input;

const ContentEditorPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const isEdit = !!id;

  // 获取内容详情（编辑模式）
  const { data: content } = useQuery({
    queryKey: queryKeys.content.detail(id!),
    queryFn: () => contentService.getById(id!),
    enabled: isEdit,
  });

  // 获取所有标签
  const { data: allTags } = useQuery({
    queryKey: ['tags', 'all'],
    queryFn: () => tagService.getAll(),
  });

  // 创建内容
  const createMutation = useMutation({
    mutationFn: contentService.create,
    onSuccess: () => {
      message.success('创建成功');
      queryClient.invalidateQueries({ queryKey: queryKeys.content.lists() });
      navigate('/content/list');
    },
    onError: () => {
      message.error('创建失败');
    },
  });

  // 更新内容
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateContentDto }) =>
      contentService.update(id, data),
    onSuccess: () => {
      message.success('更新成功');
      queryClient.invalidateQueries({ queryKey: queryKeys.content.lists() });
      navigate('/content/list');
    },
    onError: () => {
      message.error('更新失败');
    },
  });

  // 编辑模式下，填充表单
  useEffect(() => {
    if (content) {
      form.setFieldsValue({
        title: content.title,
        content: content.content,
        excerpt: content.excerpt,
        status: content.status,
        tags: content.tags?.map(t => t.id),
      });
    }
  }, [content, form]);

  // 提交表单
  const handleSubmit = (values: CreateContentDto) => {
    if (isEdit) {
      updateMutation.mutate({ id: id!, data: values });
    } else {
      createMutation.mutate(values);
    }
  };

  return (
    <Card title={isEdit ? '编辑内容' : '新建内容'}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ status: 'draft' }}
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input placeholder="请输入标题" />
        </Form.Item>

        <Form.Item label="摘要" name="excerpt">
          <TextArea rows={3} placeholder="请输入摘要" />
        </Form.Item>

        <Form.Item
          label="内容"
          name="content"
          rules={[{ required: true, message: '请输入内容' }]}
        >
          <TextArea rows={15} placeholder="请输入内容（支持 Markdown）" />
        </Form.Item>

        <Form.Item label="标签" name="tags">
          <Select mode="multiple" placeholder="选择标签" allowClear>
            {allTags?.map(tag => (
              <Select.Option key={tag.id} value={tag.id}>
                {tag.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="状态"
          name="status"
          rules={[{ required: true, message: '请选择状态' }]}
        >
          <Select>
            <Select.Option value="draft">草稿</Select.Option>
            <Select.Option value="published">发布</Select.Option>
            <Select.Option value="archived">归档</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={createMutation.isPending || updateMutation.isPending}
            >
              {isEdit ? '保存' : '创建'}
            </Button>
            <Button onClick={() => navigate('/content/list')}>取消</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ContentEditorPage;
