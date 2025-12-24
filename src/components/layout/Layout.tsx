import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<'ru' | 'en'>('en');

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header
        onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        language={language}
        onLanguageChange={setLanguage}
      />
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />
      <main
        className={`pt-14 min-h-screen transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[240px]'
        }`}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}