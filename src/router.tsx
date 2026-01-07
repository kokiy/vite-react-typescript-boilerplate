import { RouterProvider, createBrowserRouter } from 'react-router';

import { RouteError } from '@/components';
import AuthGuard from '@/components/AuthGuard';
import Layout from '@/layout/index';
import NotFound from '@/pages/404';
import ContentEditorPage from '@/pages/content/editor';
import ContentListPage from '@/pages/content/list';
import LoginPage from '@/pages/login';
import TagListPage from '@/pages/tag/list';
import UserListPage from '@/pages/user/list';

import HelloComponent from './components/hello';
import IndexComponent from './pages/index';

const calculateRoutes = (basename: string) =>
  createBrowserRouter(
    [
      // 登录页（不需要认证）
      {
        path: '/login',
        Component: LoginPage,
      },
      // 主应用（需要认证）
      {
        path: '/',
        element: (
          <AuthGuard>
            <Layout />
          </AuthGuard>
        ),
        errorElement: <RouteError />,
        children: [
          { index: true, Component: IndexComponent },
          {
            path: 'index',
            Component: IndexComponent,
          },
          {
            path: 'hello',
            Component: HelloComponent,
          },
          // 内容管理
          {
            path: 'content/list',
            Component: ContentListPage,
          },
          {
            path: 'content/editor',
            Component: ContentEditorPage,
          },
          {
            path: 'content/editor/:id',
            Component: ContentEditorPage,
          },
          // 用户管理
          {
            path: 'user/list',
            Component: UserListPage,
          },
          // 标签管理
          {
            path: 'tag/list',
            Component: TagListPage,
          },
        ],
      },
      // 404
      { path: '*', Component: NotFound },
    ],
    { basename },
  );

const RouterComponent = () => <RouterProvider router={calculateRoutes('/')} />;

export default RouterComponent;
