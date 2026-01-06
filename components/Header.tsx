'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 
                       bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Title */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="text-2xl group-hover:scale-110 transition-transform duration-200">🌤️</div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white 
                         group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              WeatherWise
            </h1>
          </Link>

          {/* Navigation & Controls */}
          <div className="flex items-center gap-4">
            {/* Navigation Links */}
            <nav className="hidden sm:flex items-center gap-2">
              <Link
                href="/"
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
                          ${pathname === '/' 
                            ? 'bg-blue-500 text-white shadow-md' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                Home
              </Link>
              <Link
                href="/compare"
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
                          ${pathname === '/compare' 
                            ? 'bg-blue-500 text-white shadow-md' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                Compare Cities
              </Link>
            </nav>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 
                       hover:bg-gray-200 dark:hover:bg-gray-700 
                       transition-all duration-200
                       transform hover:scale-105 active:scale-95"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? (
                <svg
                  className="w-5 h-5 text-gray-800 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-800 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="sm:hidden flex items-center gap-2 pb-3">
          <Link
            href="/"
            className={`flex-1 text-center px-4 py-2 rounded-lg font-medium transition-all duration-200
                      ${pathname === '/' 
                        ? 'bg-blue-500 text-white shadow-md' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            Home
          </Link>
          <Link
            href="/compare"
            className={`flex-1 text-center px-4 py-2 rounded-lg font-medium transition-all duration-200
                      ${pathname === '/compare' 
                        ? 'bg-blue-500 text-white shadow-md' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            Compare
          </Link>
        </nav>
      </div>
    </header>
  );
}
