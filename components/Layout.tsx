import React from 'react';
import { LayoutDashboard, Box, Settings, LogOut, ScanLine } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { label: 'Overview', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { label: 'Experiences', icon: <Box size={20} />, path: '/projects' },
    { label: 'Assets', icon: <ScanLine size={20} />, path: '/assets' },
    { label: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-background text-textMain overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-surfaceHighlight bg-surface hidden md:flex flex-col">
        <div className="p-6 border-b border-surfaceHighlight">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
              <Box className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Lumina</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                location.pathname === item.path
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-textMuted hover:bg-surfaceHighlight hover:text-textMain'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-surfaceHighlight">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-textMuted hover:text-textMain hover:bg-surfaceHighlight rounded-lg transition-all">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar relative">
        <div className="absolute top-0 left-0 w-full h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        {children}
      </main>
      
      {/* Mobile Nav Overlay could go here */}
    </div>
  );
};
