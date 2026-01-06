'use client';

import { useState, useMemo } from 'react';
import { WeatherData } from '@/types/weather';

interface WeatherTableProps {
  cities: WeatherData[];
  unit: 'C' | 'F';
  itemsPerPage?: number;
}

export default function WeatherTable({ cities, unit, itemsPerPage = 10 }: WeatherTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof WeatherData | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  const convertTemp = (tempC: number) => {
    return unit === 'C' ? tempC : Math.round((tempC * 9/5) + 32);
  };

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  // Sorting logic
  const sortedCities = useMemo(() => {
    const sorted = [...cities];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  }, [cities, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(sortedCities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCities = sortedCities.slice(startIndex, endIndex);

  const handleSort = (key: keyof WeatherData) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const SortIcon = ({ columnKey }: { columnKey: keyof WeatherData }) => {
    if (sortConfig.key !== columnKey) {
      return <span className="text-gray-400">⇅</span>;
    }
    return sortConfig.direction === 'asc' ? <span>↑</span> : <span>↓</span>;
  };

  if (cities.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No cities to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Table Container */}
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 
                      bg-white dark:bg-gray-800 shadow-lg">
        
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-900 
                             border-b-2 border-blue-200 dark:border-blue-900">
              <tr>
                <th 
                  onClick={() => handleSort('location')}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white 
                           cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-800 transition-colors
                           select-none"
                >
                  <div className="flex items-center gap-2">
                    <span>City</span>
                    <SortIcon columnKey="location" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('temperature')}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white 
                           cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-800 transition-colors
                           select-none"
                >
                  <div className="flex items-center gap-2">
                    <span>Temperature</span>
                    <SortIcon columnKey="temperature" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Condition
                </th>
                <th 
                  onClick={() => handleSort('humidity')}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white 
                           cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-800 transition-colors
                           select-none"
                >
                  <div className="flex items-center gap-2">
                    <span>Humidity</span>
                    <SortIcon columnKey="humidity" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('windSpeed')}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white 
                           cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-800 transition-colors
                           select-none"
                >
                  <div className="flex items-center gap-2">
                    <span>Wind Speed</span>
                    <SortIcon columnKey="windSpeed" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentCities.map((city, index) => (
                <tr 
                  key={`${city.location}-${index}`}
                  className="hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors
                           cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 dark:text-white 
                                     group-hover:text-blue-600 dark:group-hover:text-blue-400
                                     transition-colors">
                        {city.location}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 
                                     px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                        {city.country}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {convertTemp(city.temperature)}°{unit}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        (feels {convertTemp(city.feelsLike)}°)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="relative inline-block bg-blue-50 dark:bg-gray-700 rounded-lg p-1">
                        <img 
                          src={getWeatherIcon(city.icon)} 
                          alt={city.condition}
                          className="w-10 h-10"
                        />
                      </div>
                      <span className="capitalize text-gray-700 dark:text-gray-300">
                        {city.description}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💧</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {city.humidity}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💨</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {city.windSpeed} km/h
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
          {currentCities.map((city, index) => (
            <div 
              key={`${city.location}-${index}`}
              className="p-4 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    {city.location}, {city.country}
                  </h3>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                    {convertTemp(city.temperature)}°{unit}
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-2">
                  <img 
                    src={getWeatherIcon(city.icon)} 
                    alt={city.condition}
                    className="w-16 h-16"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <span>💧</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Humidity: {city.humidity}%
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span>💨</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Wind: {city.windSpeed} km/h
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 
                        bg-white dark:bg-gray-800 rounded-xl p-4 
                        border border-gray-200 dark:border-gray-700 shadow-sm">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}</span> to{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {Math.min(endIndex, cities.length)}
            </span> of{' '}
            <span className="font-semibold text-gray-900 dark:text-white">{cities.length}</span> cities
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 
                       text-gray-700 dark:text-gray-300
                       hover:bg-blue-100 dark:hover:bg-blue-900 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200
                       transform hover:scale-105 active:scale-95"
            >
              ← Prev
            </button>

            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                // Show first, last, current, and adjacent pages
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-3 py-2 rounded-lg font-medium transition-all duration-200
                                transform hover:scale-105 active:scale-95
                                ${currentPage === page
                                  ? 'bg-blue-500 text-white shadow-lg'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900'
                                }`}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return <span key={page} className="px-2 text-gray-400">...</span>;
                }
                return null;
              })}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 
                       text-gray-700 dark:text-gray-300
                       hover:bg-blue-100 dark:hover:bg-blue-900 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200
                       transform hover:scale-105 active:scale-95"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
