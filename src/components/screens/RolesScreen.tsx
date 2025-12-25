import { useState } from 'react';
import { Plus, Users as UsersIcon, Shield, Edit } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Checkbox } from '../ui/checkbox';
import { mockRoles, Role } from '../../utils/mockData';
import { Modal } from '../ui/Modal';
import { showToast } from '../ui/Toast';
import React from 'react';

export function RolesScreen() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [roles, setRoles] = useState<Role[]>(() => mockRoles);

  const resources = ['courses', 'lessons', 'tasks', 'users', 'reviews'] as const;
  const actions = ['create', 'read', 'update', 'delete'] as const;
  type ResourceKey = keyof Role['permissions'];
  type ActionKey = keyof Role['permissions']['courses'];

  const updatePermission = <R extends ResourceKey>(
    roleId: string,
    resource: R,
    action: keyof Role['permissions'][R],
    nextChecked: boolean,
  ) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) => {
        if (role.id !== roleId) {
          return role;
        }
        const resourcePermissions = role.permissions[resource];
        return {
          ...role,
          permissions: {
            ...role.permissions,
            [resource]: {
              ...resourcePermissions,
              [action]: nextChecked,
            },
          },
        };
      }),
    );
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[var(--text-primary)] mb-2">Roles & Permissions</h1>
          <p className="text-[var(--text-secondary)]">Manage user roles and access control</p>
        </div>
        <Button variant="primary">
          <Plus size={18} />
          Create Role
        </Button>
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-[var(--surface-1)] border border-[var(--border)] rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[var(--primary)] rounded-lg flex items-center justify-center text-white">
                <Shield size={24} />
              </div>
              <button
                onClick={() => {
                  setSelectedRole(role);
                  setIsEditModalOpen(true);
                }}
                className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)] rounded transition-colors"
                aria-label="Edit role"
              >
                <Edit size={18} />
              </button>
            </div>
            <h3 className="text-[var(--text-primary)] mb-2">{role.name}</h3>
            <p className="text-[var(--text-secondary)] mb-4">{role.description}</p>
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <UsersIcon size={16} />
              <span>{role.usersCount} users</span>
            </div>
          </div>
        ))}
      </div>

      {/* Permissions Matrix */}
      <Card title="Permissions Matrix">
        <div className="overflow-x-auto -mx-6 -mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="px-4 py-3 text-left text-[var(--text-secondary)]">Resource</th>
                {roles.map((role) => (
                  <th key={role.id} className="px-4 py-3 text-center text-[var(--text-secondary)]">
                    {role.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {resources.map((resource) => (
                <React.Fragment key={resource}>
                  <tr className="border-b border-[var(--border)]">
                    <td
                      colSpan={roles.length + 1}
                      className="px-4 py-2 bg-[var(--surface-2)] text-[var(--text-primary)] uppercase"
                    >
                      {resource}
                    </td>
                  </tr>
                  {actions
                    .filter((action) => {
                      // Skip 'create' and 'delete' for statistics
                      if (resource === 'reviews' && (action === 'create' || action === 'delete')) {
                        return roles.some(
                          (role) => role.permissions[resource as keyof typeof role.permissions]?.[action as 'create' | 'delete']
                        );
                      }
                      return true;
                    })
                    .map((action) => (
                      <tr key={`${resource}-${action}`} className="border-b border-[var(--border)]">
                        <td className="px-4 py-3 text-[var(--text-secondary)] pl-8">{action}</td>
                        {roles.map((role) => {
                          const hasPermission =
                            role.permissions[resource as ResourceKey]?.[action as ActionKey];
                          return (
                            <td key={role.id} className="px-4 py-3 text-center">
                              <Checkbox
                                checked={hasPermission || false}
                                onCheckedChange={(nextChecked) => {
                                  updatePermission(role.id, resource, action, nextChecked);
                                  showToast('Permission updated', 'success');
                                }}
                                className="size-5"
                                aria-label={`${role.name} ${action} ${resource}`}
                              />
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                </React.Fragment>
              ))}
              {/* Statistics - special case */}
              <tr className="border-b border-[var(--border)]">
                <td
                  colSpan={roles.length + 1}
                  className="px-4 py-2 bg-[var(--surface-2)] text-[var(--text-primary)] uppercase"
                >
                  statistics
                </td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="px-4 py-3 text-[var(--text-secondary)] pl-8">read</td>
                {roles.map((role) => (
                  <td key={role.id} className="px-4 py-3 text-center">
                    <Checkbox
                      checked={role.permissions.statistics.read}
                      onCheckedChange={(nextChecked) => {
                        updatePermission(role.id, 'statistics', 'read', nextChecked);
                        showToast('Permission updated', 'success');
                      }}
                      className="size-5"
                      aria-label={`${role.name} read statistics`}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit Role Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedRole(null);
        }}
        title={selectedRole ? `Edit Role: ${selectedRole.name}` : 'Edit Role'}
        size="lg"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedRole(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                showToast('Role updated successfully', 'success');
                setIsEditModalOpen(false);
                setSelectedRole(null);
              }}
            >
              Save Changes
            </Button>
          </>
        }
      >
        {selectedRole && (
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-[var(--text-primary)]">Role Name</label>
              <input
                type="text"
                defaultValue={selectedRole.name}
                className="w-full px-3 py-2 border border-[var(--border)] rounded bg-[var(--surface-1)] text-[var(--text-primary)]"
              />
            </div>
            <div>
              <label className="block mb-2 text-[var(--text-primary)]">Description</label>
              <textarea
                rows={3}
                defaultValue={selectedRole.description}
                className="w-full px-3 py-2 border border-[var(--border)] rounded bg-[var(--surface-1)] text-[var(--text-primary)] resize-y"
              />
            </div>
            <div className="flex items-center gap-3 p-3 bg-[var(--surface-2)] rounded">
              <UsersIcon size={20} className="text-[var(--text-secondary)]" />
              <span className="text-[var(--text-primary)]">{selectedRole.usersCount} users have this role</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
