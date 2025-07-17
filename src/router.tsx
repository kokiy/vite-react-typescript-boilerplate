import { RouterProvider, createBrowserRouter } from 'react-router'

import { RouteError } from '@/components'
import Layout from '@/layout/index'
import NotFound from '@/pages/404'

import HelloComponent from './components/hello'
import IndexComponent from './pages/index'

const calculateRoutes = (basename: string) =>
  createBrowserRouter(
    [
      {
        path: '/',
        Component: Layout,
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
        ],
      },
      { path: '*', Component: NotFound },
    ],
    { basename },
  )

const RouterComponent = () => <RouterProvider router={calculateRoutes('/')} />

export default RouterComponent
