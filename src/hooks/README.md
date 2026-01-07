# Hooks 使用指南

## React Query Hooks 模式

本项目使用 `@tanstack/react-query` 来管理服务端状态。

## 目录结构

```
hooks/
├── useAuth.ts              # 认证状态管理（zustand）
├── usePermission.ts        # 权限状态管理（zustand）
├── useLoginMutation.ts     # 登录 mutation（React Query）
├── useLogoutMutation.ts    # 登出 mutation（React Query）
└── ...                     # 更多业务 hooks
```

## 使用 React Query 的场景

### 1. **Query（查询）- 用于获取数据**

适用于：GET 请求、数据列表、详情页等

```typescript
// hooks/useContentList.ts
import { useQuery } from '@tanstack/react-query';
import { contentService } from '@/services/content';
import { queryKeys } from '@/lib/query-keys';
import type { ContentListParams } from '@/types/content';

export function useContentList(params: ContentListParams) {
  return useQuery({
    queryKey: queryKeys.content.list(params),
    queryFn: () => contentService.getList(params),
    // 可选配置
    staleTime: 1000 * 60 * 5, // 5分钟内数据视为新鲜
    enabled: !!params.page,   // 条件查询
  });
}

// 在组件中使用
const ContentListPage = () => {
  const [params, setParams] = useState({ page: 1, pageSize: 10 });
  const { data, isLoading, error, refetch } = useContentList(params);

  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>加载失败</div>;

  return (
    <div>
      <Table dataSource={data?.data} />
      <Button onClick={() => refetch()}>刷新</Button>
    </div>
  );
};
```

### 2. **Mutation（变更）- 用于修改数据**

适用于：POST、PUT、DELETE 请求、创建、更新、删除等

```typescript
// hooks/useCreateContent.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { contentService } from '@/services/content';
import { queryKeys } from '@/lib/query-keys';
import type { CreateContentDto } from '@/types/content';

export function useCreateContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateContentDto) => contentService.create(data),
    onSuccess: () => {
      message.success('创建成功');
      // 使列表查询缓存失效，触发重新获取
      queryClient.invalidateQueries({ queryKey: queryKeys.content.lists() });
    },
    onError: (error) => {
      message.error('创建失败: ' + error.message);
    },
  });
}

// 在组件中使用
const CreateContentForm = () => {
  const createMutation = useCreateContent();
  const navigate = useNavigate();

  const handleSubmit = async (values: CreateContentDto) => {
    await createMutation.mutateAsync(values);
    navigate('/content/list');
  };

  return (
    <Form onFinish={handleSubmit}>
      <Button
        type="primary"
        htmlType="submit"
        loading={createMutation.isPending}
      >
        提交
      </Button>
    </Form>
  );
};
```

### 3. **Infinite Query（无限滚动）**

```typescript
// hooks/useInfiniteContentList.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { contentService } from '@/services/content';
import { queryKeys } from '@/lib/query-keys';

export function useInfiniteContentList(pageSize = 10) {
  return useInfiniteQuery({
    queryKey: queryKeys.content.lists(),
    queryFn: ({ pageParam = 1 }) =>
      contentService.getList({ page: pageParam, pageSize }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= Math.ceil(lastPage.total / pageSize)
        ? nextPage
        : undefined;
    },
    initialPageParam: 1,
  });
}

// 在组件中使用
const InfiniteList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteContentList();

  return (
    <div>
      {data?.pages.map((page) =>
        page.data.map((item) => <div key={item.id}>{item.title}</div>)
      )}
      <Button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage}
        loading={isFetchingNextPage}
      >
        加载更多
      </Button>
    </div>
  );
};
```

## Query Keys 管理

所有 Query Keys 统一在 `lib/query-keys.ts` 中定义：

```typescript
// 使用示例
queryKeys.content.all; // ['content']
queryKeys.content.lists(); // ['content', 'list']
queryKeys.content.list(params); // ['content', 'list', { page: 1, ... }]
queryKeys.content.detail('1'); // ['content', 'detail', '1']
```

## 缓存失效策略

```typescript
import { useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();

// 1. 使特定查询失效（触发重新获取）
queryClient.invalidateQueries({
  queryKey: queryKeys.content.lists(),
});

// 2. 使所有内容相关查询失效
queryClient.invalidateQueries({
  queryKey: queryKeys.content.all,
});

// 3. 手动更新缓存
queryClient.setQueryData(queryKeys.content.detail('1'), oldData => ({
  ...oldData,
  title: 'New Title',
}));

// 4. 移除缓存
queryClient.removeQueries({
  queryKey: queryKeys.content.detail('1'),
});
```

## 乐观更新（Optimistic Update）

```typescript
export function useUpdateContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateContentDto }) =>
      contentService.update(id, data),
    // 在请求发送前更新缓存
    onMutate: async ({ id, data }) => {
      // 取消正在进行的查询
      await queryClient.cancelQueries({
        queryKey: queryKeys.content.detail(id),
      });

      // 保存之前的数据
      const previousData = queryClient.getQueryData(
        queryKeys.content.detail(id),
      );

      // 乐观更新
      queryClient.setQueryData(queryKeys.content.detail(id), (old: any) => ({
        ...old,
        ...data,
      }));

      return { previousData };
    },
    // 如果失败，回滚
    onError: (err, { id }, context) => {
      queryClient.setQueryData(
        queryKeys.content.detail(id),
        context?.previousData,
      );
    },
    // 无论成功或失败，都重新获取数据
    onSettled: (data, error, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.content.detail(id) });
    },
  });
}
```

## 全局配置

在 `lib/query-client.ts` 中配置默认行为：

- `staleTime`: 数据过期时间（默认 5 分钟）
- `gcTime`: 缓存时间（默认 10 分钟）
- `retry`: 失败重试次数（默认 1 次）
- `refetchOnWindowFocus`: 窗口聚焦时是否重新获取（默认 false）

## 开发工具

项目已集成 React Query DevTools，在开发环境下：

1. 右下角会显示一个小图标
2. 点击图标打开 DevTools
3. 可以查看所有查询状态、缓存数据
4. 可以手动触发查询、失效缓存等

## 最佳实践

1. **Query 用于读，Mutation 用于写**
2. **所有 Query Keys 在 `query-keys.ts` 中统一管理**
3. **Mutation 成功后使用 `invalidateQueries` 刷新相关数据**
4. **耗时操作使用 `mutateAsync` 而不是 `mutate`**
5. **避免在 useEffect 中调用 mutation**
