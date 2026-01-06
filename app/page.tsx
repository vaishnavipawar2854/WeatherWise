'use client';

import { useState } from 'react';
import { useWeather } from '@/hooks/useWeather';
import { useTemperatureUnit } from '@/hooks/useTemperatureUnit';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import ForecastList from '@/components/ForecastList';
import { WeatherCardSkeleton, ForecastListSkeleton } from '@/components/WeatherSkeleton';

export default function HomePage() {
  const { currentWeather, forecast, loading, error, fetchWeatherByCity, fetchWeatherByCoords, clearError } = useWeather();
  const { unit, toggleUnit } = useTemperatureUnit();

  const handleSearch = (city: string) => {
    console.log('HomePage: handleSearch called with city:', city);
    fetchWeatherByCity(city);
  };

  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          alert('Unable to get your location. Please search for a city instead.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Section */}
      <section className="text-center py-6 sm:py-8 md:py-12 animate-slide-down px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 
                       bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to WeatherWise
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Your intelligent weather companion for accurate forecasts and real-time updates
        </p>
      </section>

      {/* Search Bar */}
      <div className="px-4 sm:px-6 md:px-8">
        <SearchBar
          onSearch={handleSearch}
          onLocationClick={handleGetLocation}
          loading={loading}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-2xl mx-auto bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 
                        rounded-2xl p-4 shadow-lg animate-slide-down mx-4 sm:mx-auto">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="text-red-500 text-2xl animate-bounce shrink-0">⚠️</span>
              <div>
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-1">Error</h4>
                <p className="text-sm sm:text-base text-red-700 dark:text-red-300">{error.message}</p>
              </div>
            </div>
            <button
              onClick={clearError}
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300
                       transition-colors text-xl font-bold hover:scale-110 transform duration-200 shrink-0"
              aria-label="Close error"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6 md:px-8">
          <WeatherCardSkeleton />
          <ForecastListSkeleton />
        </div>
      )}

      {/* Weather Content */}
      {currentWeather && !loading && (
        <div className="space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6 md:px-8">
          {/* Current Weather Card */}
          <WeatherCard 
            weather={currentWeather} 
            unit={unit}
            onUnitToggle={toggleUnit}
          />

          {/* 5-Day Forecast */}
          {forecast.length > 0 && (
            <ForecastList 
              forecast={forecast}
              unit={unit}
            />
          )}
        </div>
      )}

      {/* Features Section - Show when no weather data */}
      {!currentWeather && !loading && !error && (
        <section className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/10 
                          rounded-3xl p-6 sm:p-8 shadow-xl animate-slide-up">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            ✨ Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white dark:hover:bg-gray-800 
                          transition-all duration-200 group">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-200">🌤️</span>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Real-time Weather
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get accurate weather data from OpenWeatherMap API
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white dark:hover:bg-gray-800 
                          transition-all duration-200 group">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-200">📱</span>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Mobile Responsive
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Optimized for all devices and screen sizes
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white dark:hover:bg-gray-800 
                          transition-all duration-200 group">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-200">🌓</span>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Dark Mode
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Toggle between light and dark themes
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white dark:hover:bg-gray-800 
                          transition-all duration-200 group">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-200">📍</span>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Location-based
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Auto-detect your location or search any city
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white dark:hover:bg-gray-800 
                          transition-all duration-200 group">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-200">🌡️</span>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Temperature Units
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Toggle between Celsius and Fahrenheit
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white dark:hover:bg-gray-800 
                          transition-all duration-200 group">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-200">📊</span>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  5-Day Forecast
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Plan ahead with detailed weather forecasts
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
