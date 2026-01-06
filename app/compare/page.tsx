'use client';

import { useState, useEffect } from 'react';
import { useNearbyCities } from '@/hooks/useNearbyCities';
import { useTemperatureUnit } from '@/hooks/useTemperatureUnit';
import SearchBar from '@/components/SearchBar';
import WeatherTable from '@/components/WeatherTable';
import { WeatherTableSkeleton } from '@/components/WeatherSkeleton';

export default function ComparePage() {
  const { nearbyCities, loading, error, fetchNearbyCitiesByCoords, fetchNearbyCitiesByCity } = useNearbyCities();
  const { unit, toggleUnit } = useTemperatureUnit();
  const [searchLocation, setSearchLocation] = useState<string>('');

  const handleSearch = (city: string) => {
    setSearchLocation(city);
    fetchNearbyCitiesByCity(city);
  };

  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSearchLocation('Your Location');
          fetchNearbyCitiesByCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          alert('Unable to get your location. Please search for a city instead.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  useEffect(() => {
    // Auto-fetch user location on mount
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSearchLocation('Your Location');
          fetchNearbyCitiesByCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Unable to get location:', error);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <section className="text-center py-6 sm:py-8 animate-slide-down">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 
                       bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent px-4">
          Nearby Cities Weather
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
          {searchLocation ? `Showing cities near ${searchLocation}` : 'Search for a city or use your location to see nearby weather'}
        </p>
      </section>

      {/* Search Bar */}
      <SearchBar
        onSearch={handleSearch}
        onLocationClick={handleGetLocation}
        loading={loading}
        placeholder="Search for a city to find nearby weather..."
      />

      {/* Unit Toggle */}
      <div className="flex justify-center px-4">
        <button
          onClick={toggleUnit}
          className="flex items-center gap-2 bg-white dark:bg-gray-800 
                   border-2 border-gray-200 dark:border-gray-700
                   rounded-full px-6 py-3 shadow-lg
                   hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-600
                   transition-all duration-200 ease-in-out
                   transform hover:scale-105 active:scale-95"
        >
          <span className="text-gray-700 dark:text-gray-300 font-medium">Temperature Unit:</span>
          <span className={`font-bold transition-all ${unit === 'C' ? 'text-blue-600 dark:text-blue-400 scale-110' : 'text-gray-400'}`}>
            °C
          </span>
          <span className="text-gray-400">|</span>
          <span className={`font-bold transition-all ${unit === 'F' ? 'text-blue-600 dark:text-blue-400 scale-110' : 'text-gray-400'}`}>
            °F
          </span>
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 
                        rounded-2xl p-6 shadow-lg animate-slide-down">
          <div className="flex items-center gap-3">
            <span className="text-red-500 text-3xl">⚠️</span>
            <div>
              <h4 className="font-semibold text-red-800 dark:text-red-200 text-lg mb-1">Error Loading Data</h4>
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="animate-fade-in">
          <WeatherTableSkeleton rows={10} />
        </div>
      )}

      {/* Weather Table */}
      {!loading && !error && nearbyCities.length > 0 && (
        <div className="animate-fade-in px-2 sm:px-0">
          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Displaying weather data for <span className="font-semibold text-gray-900 dark:text-white">{nearbyCities.length}</span> nearby cities
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Click column headers to sort
            </p>
          </div>
          <WeatherTable 
            cities={nearbyCities} 
            unit={unit}
            itemsPerPage={10}
          />
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && nearbyCities.length === 0 && (
        <div className="text-center py-12 px-4">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Cities Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Search for a city or use your location to see nearby weather conditions
          </p>
        </div>
      )}

      {/* Info Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800/50 dark:to-blue-900/10 
                        rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl mx-2 sm:mx-0">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
          <span>ℹ️</span>
          <span>How to Use</span>
        </h3>
        <ul className="space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold shrink-0">•</span>
            <span>Search for any city or use your current location to see nearby cities</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold shrink-0">•</span>
            <span>Click on column headers to sort cities by different criteria</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold shrink-0">•</span>
            <span>Use pagination controls to navigate through cities</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold shrink-0">•</span>
            <span>Toggle between Celsius and Fahrenheit using the button above</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
