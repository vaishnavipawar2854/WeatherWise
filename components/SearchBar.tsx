'use client';

import { useState, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationClick: () => void;
  loading?: boolean;
  placeholder?: string;
}

export default function SearchBar({ 
  onSearch, 
  onLocationClick, 
  loading = false,
  placeholder = "Search for a city..."
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log('SearchBar: Submitting search for:', searchValue.trim());
      onSearch(searchValue.trim());
      setSearchValue('');
      console.log('SearchBar: Input cleared');
    } else {
      console.log('SearchBar: Empty search value, not submitting');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur"></div>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
          disabled={loading}
          className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-28 sm:pr-32 text-base sm:text-lg rounded-full border-2 border-gray-200 dark:border-gray-700 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                     focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 
                     focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300 ease-in-out
                     placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
        <button
          type="submit"
          disabled={loading || !searchValue.trim()}
          className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 px-4 sm:px-6 py-1.5 sm:py-2 
                     bg-blue-500 hover:bg-blue-600 active:bg-blue-700
                     disabled:bg-gray-400 disabled:cursor-not-allowed
                     text-white text-sm sm:text-base font-medium rounded-full 
                     transition-all duration-200 ease-in-out
                     transform hover:scale-105 active:scale-95
                     shadow-md hover:shadow-lg"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="hidden sm:inline">Searching</span>
            </span>
          ) : (
            'Search'
          )}
        </button>
      </form>
      
      <div className="text-center">
        <button
          onClick={onLocationClick}
          disabled={loading}
          className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 
                     dark:text-blue-400 dark:hover:text-blue-300 
                     text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200 ease-in-out
                     hover:gap-3 group"
        >
          <span className="text-lg group-hover:scale-110 transition-transform duration-200">📍</span>
          <span>Use my current location</span>
        </button>
      </div>
    </div>
  );
}
