'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark';
    setIsDark(isDarkMode);
    applyTheme(isDarkMode);
  }, []);

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    applyTheme(newDarkMode);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-sm transition-all duration-300 dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            {/* DealNest Icon - Nest/shopping bag hybrid */}
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-orange-500 via-amber-500 to-yellow-500 shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/30 transition-shadow duration-300">
              {/* Nest icon */}
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3C7.03 3 3 7.03 3 12c0 2.76 1.24 5.23 3.19 6.89" />
                <path d="M12 7c-2.76 0-5 2.24-5 5 0 1.52.68 2.87 1.75 3.79" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                <path d="M17.81 18.89C19.76 17.23 21 14.76 21 12c0-4.97-4.03-9-9-9" opacity="0.5" />
                <path d="M17.25 15.79C18.32 14.87 19 13.52 19 12c0-2.76-2.24-5-5-5" opacity="0.5" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
                Deal<span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-amber-500">Nest</span>
              </span>
            </div>
          </a>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`relative rounded-xl p-2.5 text-slate-500 transition-all duration-300 ease-out
              hover:bg-slate-100 hover:text-slate-900
              dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100
              active:scale-90
              focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:ring-offset-2 dark:focus:ring-offset-slate-950
            `}
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="h-5 w-5 transition-transform duration-300" />
            ) : (
              <Moon className="h-5 w-5 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
