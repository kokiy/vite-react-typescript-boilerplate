import type { User } from '@/types/user';

/**
 * Mock 用户数据
 */
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    nickname: '超级管理员',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    role: 'super_admin',
    status: 'active',
    permissions: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    lastLoginAt: '2024-01-07T00:00:00Z',
  },
  {
    id: '2',
    username: 'editor',
    email: 'editor@example.com',
    nickname: '编辑',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=editor',
    role: 'editor',
    status: 'active',
    permissions: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    lastLoginAt: '2024-01-06T00:00:00Z',
  },
  {
    id: '3',
    username: 'viewer',
    email: 'viewer@example.com',
    nickname: '访客',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=viewer',
    role: 'viewer',
    status: 'active',
    permissions: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    lastLoginAt: '2024-01-05T00:00:00Z',
  },
];

/**
 * Mock 用户密码映射（仅用于开发环境）
 */
export const mockUserPasswords: Record<string, string> = {
  admin: 'admin123',
  editor: 'editor123',
  viewer: 'viewer123',
};

/**
 * 根据用户名查找用户
 */
export function findUserByUsername(username: string): User | undefined {
  return mockUsers.find(user => user.username === username);
}

/**
 * 验证用户密码
 */
export function validateUserPassword(
  username: string,
  password: string,
): boolean {
  return mockUserPasswords[username] === password;
}
