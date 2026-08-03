import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Heart,
  Search,
  Bookmark,
  Settings,
} from 'lucide-react';
import { motion } from 'motion/react';

const NAV_ITEMS = [
  { path: '/', label: 'Beranda', icon: Home },
  { path: '/reader', label: 'Alkitab', icon: BookOpen },
  { path: '/renungan', label: 'Renungan', icon: Heart },
  { path: '/search', label: 'Pencarian', icon: Search },
  { path: '/bookmarks', label: 'Penanda', icon: Bookmark },
  { path: '/settings', label: 'Pengaturan', icon: Settings },
];

export const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-200">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[var(--bg-sidebar)] border-r border-[var(--border-color)] p-6 sticky top-0 h-screen z-30 justify-between">
        <div>
          {/* Brand Logo Header */}
          <div className="flex items-center gap-3.5 px-2 mb-8">
            <div className="w-10 h-10 bg-[#CD0000] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md">
              A
            </div>
            <div>
              <h1 className="font-extrabold text-base tracking-tight text-[var(--text-primary)] leading-tight">
                Alkitab Alunea
              </h1>
              <p className="text-xs font-medium text-[var(--text-secondary)]">
                Firman Tuhan Dalam Genggaman
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 relative ${
                    isActive
                      ? 'bg-[var(--bg-card-secondary)] text-[var(--text-primary)] font-bold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
                  }`}
                >
                  {/* Indicator Merah */}
                  {isActive && (
                    <span className="w-1.5 h-5 bg-[#CD0000] rounded-full mr-0.5" />
                  )}
                  <Icon
                    size={20}
                    className={isActive ? 'text-[#CD0000]' : 'text-[var(--text-secondary)]'}
                  />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer info card */}
        <NavLink
          to="/about"
          className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[#CD0000]/50 text-xs space-y-1 text-[var(--text-secondary)] transition-all duration-200 block group"
        >
          <div className="flex items-center justify-between">
            <p className="font-bold text-[var(--text-primary)] group-hover:text-[#CD0000]">
              Alkitab Alunea
            </p>
            <span className="text-[10px] bg-[var(--bg-card-secondary)] px-2 py-0.5 rounded-full font-bold text-[var(--text-primary)]">
              Tentang
            </span>
          </div>
          <p className="text-[11px]">Informasi & Fitur • © 2026</p>
        </NavLink>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-sidebar)]/95 backdrop-blur-lg safe-pb px-4 py-2 border-t border-[var(--border-color)]">
        <div className="flex items-center justify-around h-16 max-w-md mx-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`relative flex flex-col items-center justify-center w-14 h-12 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[var(--bg-card-secondary)] text-[var(--text-primary)] font-bold'
                    : 'text-[var(--text-secondary)] font-medium'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-[#CD0000]' : 'text-[var(--text-secondary)]'} />
                <span className="text-[10px] mt-1">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
