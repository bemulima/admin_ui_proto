import {
  LayoutDashboard,
  BookOpen,
  FileText,
  CheckSquare,
  Users,
  Shield,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onToggle: () => void;
  onCloseMobile: () => void;
}

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/courses', label: 'Courses', icon: BookOpen, badge: 24 },
  { path: '/lessons', label: 'Lessons', icon: FileText },
  { path: '/tasks', label: 'Tasks', icon: CheckSquare },
  { path: '/users', label: 'Users', icon: Users },
  { path: '/roles', label: 'Roles & Permissions', icon: Shield },
  { path: '/statistics', label: 'Statistics', icon: BarChart3 },
  { path: '/code-review', label: 'Code Review', icon: CheckSquare, badge: 12 },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ isCollapsed, isMobileOpen, onToggle, onCloseMobile }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay - only on mobile */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={onCloseMobile} />
      )}

      <aside
        className={`fixed left-0 top-14 bottom-0 bg-[var(--sidebar-bg)] border-r border-[var(--border)] z-30 transition-all duration-300 ${
          isCollapsed ? 'w-[72px]' : 'w-[240px]'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="h-full flex flex-col p-3">
          <div className="flex items-center justify-end mb-3">
            <button
              onClick={onToggle}
              className="hidden lg:flex w-8 h-8 items-center justify-center text-[var(--sidebar-text-muted)] hover:text-[var(--sidebar-text)] hover:bg-[var(--surface)] rounded-lg"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto -mx-3 px-3">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={onCloseMobile}
                      className={`
                        flex items-center h-12 rounded-lg transition-all relative
                        ${isCollapsed ? 'justify-center px-2' : 'px-4'}
                        ${isActive 
                          ? 'bg-[var(--sidebar-active-bg)] text-[var(--primary)]' 
                          : 'text-[var(--sidebar-text-muted)] hover:bg-[var(--surface)] hover:text-[var(--sidebar-text)]'
                        }
                      `}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <Icon size={20} />
                      </div>

                      {!isCollapsed && (
                        <>
                          <span className="ml-3 flex-1 truncate">{item.label}</span>
                          {item.badge && (
                            <span className="ml-2 px-2 py-0.5 rounded-full text-xs min-w-[24px] text-center bg-[var(--danger)] text-[var(--primary-contrast)]">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}

                      {isCollapsed && item.badge && (
                        <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-[var(--danger)] text-[var(--primary-contrast)] rounded-full flex items-center justify-center text-[10px] px-1 shadow-sm">
                          {item.badge > 99 ? '99+' : item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}