import { useState } from 'react';
import { Plus, Search, Filter, Mail, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Form';
import { Table, Column, Pagination } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { mockUsers, User } from '../../utils/mockData';

export function UsersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter users
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns: Column<User>[] = [
    {
      key: 'name',
      header: 'User',
      sortable: true,
      render: (user) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center text-[var(--primary-contrast)] flex-shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-[var(--text)] truncate">{user.name}</p>
            <p className="text-[var(--text-muted)] truncate">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (user) => (
        <Badge variant="role" role={user.role}>
          {user.role}
        </Badge>
      ),
      width: 'w-32',
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (user) => (
        <Badge variant="status" status={user.status}>
          {user.status}
        </Badge>
      ),
      width: 'w-32',
    },
    {
      key: 'coursesEnrolled',
      header: 'Courses',
      sortable: true,
      align: 'right',
      width: 'w-24',
    },
    {
      key: 'tasksCompleted',
      header: 'Tasks',
      sortable: true,
      align: 'right',
      width: 'w-24',
    },
    {
      key: 'createdAt',
      header: 'Joined',
      sortable: true,
      render: (user) => new Date(user.createdAt).toLocaleDateString(),
      width: 'w-32',
    },
    {
      key: 'lastLoginAt',
      header: 'Last Login',
      sortable: true,
      render: (user) => new Date(user.lastLoginAt).toLocaleDateString(),
      width: 'w-32',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[var(--text)] mb-1">Users</h1>
          <p className="text-[var(--text-muted)]">Manage platform users and their roles</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">
            <Mail size={18} />
            Invite Users
          </Button>
          <Button variant="primary">
            <Plus size={18} />
            Add User
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-[var(--border)] rounded bg-[var(--surface)] text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
            <option value="user">User</option>
            <option value="guest">Guest</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-[var(--border)] rounded bg-[var(--surface)] text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="banned">Banned</option>
          </select>
          <Button variant="secondary">
            <Filter size={18} />
            More Filters
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4">
          <p className="text-[var(--text-muted)] mb-1">Total Users</p>
          <p className="text-[var(--text)]">{mockUsers.length}</p>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4">
          <p className="text-[var(--text-muted)] mb-1">Active</p>
          <p className="text-[var(--text)]">{mockUsers.filter((u) => u.status === 'active').length}</p>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4">
          <p className="text-[var(--text-muted)] mb-1">Students</p>
          <p className="text-[var(--text)]">{mockUsers.filter((u) => u.role === 'student').length}</p>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4">
          <p className="text-[var(--text-muted)] mb-1">Teachers</p>
          <p className="text-[var(--text)]">{mockUsers.filter((u) => u.role === 'teacher').length}</p>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={paginatedUsers}
        emptyMessage="No users found"
        onRowClick={(user) => console.log('View user:', user)}
        getRowId={(user) => user.id}
      />

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredUsers.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}
    </div>
  );
}
