import { Search, Bell, ChevronDown, Globe, Menu, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  onToggleSidebar: () => void;
  language: 'ru' | 'en';
  onLanguageChange: (lang: 'ru' | 'en') => void;
}

export function Header({ onToggleSidebar, language, onLanguageChange }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[var(--surface)] border-b border-[var(--border)] z-40 flex items-center px-6">
      <button
        onClick={onToggleSidebar}
        className="lg:hidden w-10 h-10 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] rounded-lg mr-2"
        aria-label="Toggle sidebar"
      >
        <Menu size={20} />
      </button>

      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="w-8 h-8 bg-[var(--primary)] rounded flex items-center justify-center text-[var(--primary-contrast)]">
          <span>E</span>
        </div>
        <span className="hidden sm:block text-[var(--text)]">EduAdmin</span>
      </div>

      <div className="flex-1 min-w-[48px]" />

      <div className="w-[300px] hidden md:block flex-shrink-0">
        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
            className="w-full h-10 pl-3 pr-11 border border-[var(--border)] rounded-lg bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" size={18} />
        </div>
      </div>

      <div className="w-6 hidden md:block" />

      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] rounded-lg"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="w-10 h-10 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] rounded-lg"
            aria-label="Change language"
            title={`Current language: ${language.toUpperCase()}`}
          >
            <Globe size={20} />
          </button>
          {showLangMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowLangMenu(false)} />
              <div className="absolute right-0 top-full mt-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow-lg py-1 min-w-[100px] z-20">
                <button
                  onClick={() => { onLanguageChange('en'); setShowLangMenu(false); }}
                  className={`w-full px-4 py-2 text-left hover:bg-[var(--surface-2)] ${language === 'en' ? 'bg-[var(--surface-2)] text-[var(--primary)]' : 'text-[var(--text)]'}`}
                >
                  English
                </button>
                <button
                  onClick={() => { onLanguageChange('ru'); setShowLangMenu(false); }}
                  className={`w-full px-4 py-2 text-left hover:bg-[var(--surface-2)] ${language === 'ru' ? 'bg-[var(--surface-2)] text-[var(--primary)]' : 'text-[var(--text)]'}`}
                >
                  Русский
                </button>
              </div>
            </>
          )}
        </div>

        <button
          className="relative w-10 h-10 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] rounded-lg"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--danger)] rounded-full" />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 h-10 pl-1 pr-2 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] rounded-lg"
            aria-label="User menu"
          >
            <div className="w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center text-[var(--primary-contrast)] flex-shrink-0">
              <span>A</span>
            </div>
            <ChevronDown size={16} className="flex-shrink-0" />
          </button>
          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
              <div className="absolute right-0 top-full mt-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow-lg py-1 min-w-[160px] z-20">
                <button className="w-full px-4 py-2 text-left text-[var(--text)] hover:bg-[var(--surface-2)]">Profile</button>
                <button className="w-full px-4 py-2 text-left text-[var(--text)] hover:bg-[var(--surface-2)]">Settings</button>
                <div className="border-t border-[var(--border)] my-1" />
                <button className="w-full px-4 py-2 text-left text-[var(--danger)] hover:bg-[var(--surface-2)]">Logout</button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}