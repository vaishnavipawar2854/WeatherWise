'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationClick: () => void;
  loading: boolean;
}

export default function SearchBar({
  onSearch,
  onLocationClick,
  loading,
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchValue.trim()) {
      alert('Please enter a city name');
      return;
    }

    console.log('Submitting search for:', searchValue);
    onSearch(searchValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 items-stretch"
    >
      {/* City Input */}
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Enter city name"
        className="flex-1 px-4 py-3 rounded-xl border border-gray-300 
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />

      {/* Search Button */}
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold
                   hover:bg-blue-700 transition disabled:opacity-50
                   disabled:cursor-not-allowed"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {/* Location Button */}
      <button
        type="button"
        onClick={onLocationClick}
        disabled={loading}
        className="px-6 py-3 rounded-xl bg-gray-600 text-white font-semibold
                   hover:bg-gray-700 transition disabled:opacity-50
                   disabled:cursor-not-allowed"
      >
        📍 Use Location
      </button>
    </form>
  );
}
