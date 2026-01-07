import type { ReactNode } from 'react';

import { Result } from 'antd';
import { Navigate } from 'react-router';

import { storeSelector } from '@/store';

interface AuthGuardProps {
  children: ReactNode;
  permission?: string;
  requiredPermissions?: string[];
  requireAll?: boolean;
}

/**
 * 路由权限守卫组件
 * @param children - 子组件
 * @param permission - 单个权限（与 requiredPermissions 二选一）
 * @param requiredPermissions - 多个权限
 * @param requireAll - 是否需要全部权限（默认 false，即有任一权限即可）
 */
const AuthGuard = ({
  children,
  permission,
  requiredPermissions,
  requireAll = false,
}: AuthGuardProps) => {
  const isAuthenticated = storeSelector.use.isAuthenticated();
  const hasPermission = storeSelector.use.hasPermission();
  const hasAnyPermission = storeSelector.use.hasAnyPermission();
  const hasAllPermissions = storeSelector.use.hasAllPermissions();

  // 未登录，跳转到登录页
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 需要检查权限
  if (permission || requiredPermissions) {
    let hasRequiredPermission = false;

    if (permission) {
      hasRequiredPermission = hasPermission(permission);
    } else if (requiredPermissions) {
      hasRequiredPermission = requireAll
        ? hasAllPermissions(requiredPermissions)
        : hasAnyPermission(requiredPermissions);
    }

    // 无权限，显示 403 页面
    if (!hasRequiredPermission) {
      return (
        <Result
          status="403"
          title="403"
          subTitle="抱歉，您没有权限访问此页面"
        />
      );
    }
  }

  return <>{children}</>;
};

export default AuthGuard;
