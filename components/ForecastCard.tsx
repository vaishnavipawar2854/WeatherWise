'use client';

import { ForecastDay } from '@/types/weather';

interface ForecastCardProps {
  forecast: ForecastDay;
  unit: 'C' | 'F';
  isToday?: boolean;
}

export default function ForecastCard({ forecast, unit, isToday = false }: ForecastCardProps) {
  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const convertTemp = (tempC: number) => {
    return unit === 'C' ? tempC : Math.round((tempC * 9/5) + 32);
  };

  const formatDate = (date: Date) => {
    if (isToday) return 'Today';
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="relative group bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5
                    border border-gray-200 dark:border-gray-700 
                    shadow-md hover:shadow-xl dark:shadow-gray-900/30
                    transition-all duration-300 ease-in-out
                    hover:-translate-y-2 hover:border-blue-400 dark:hover:border-blue-600
                    overflow-hidden">
      
      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 
                      dark:from-blue-900/10 dark:to-purple-900/10 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10 text-center">
        {/* Date */}
        <p className={`font-semibold mb-3 transition-colors duration-200
                      ${isToday 
                        ? 'text-blue-600 dark:text-blue-400 text-lg' 
                        : 'text-gray-900 dark:text-white'}`}>
          {formatDate(forecast.date)}
        </p>

        {/* Weather Icon */}
        <div className="relative">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-xl opacity-50"></div>
            <img
              src={getWeatherIcon(forecast.icon)}
              alt={forecast.condition}
              className="relative w-20 h-20 mx-auto transform transition-transform duration-300
                         group-hover:scale-110 group-hover:rotate-6
                         drop-shadow-lg"
            />
          </div>
          {isToday && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          )}
        </div>

        {/* Condition */}
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 capitalize mb-3 
                      line-clamp-1 group-hover:text-gray-900 dark:group-hover:text-gray-200
                      transition-colors duration-200">
          {forecast.description}
        </p>

        {/* Temperature Range */}
        <div className="flex justify-center items-center gap-3 mb-3">
          <div className="text-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-white
                           group-hover:text-blue-600 dark:group-hover:text-blue-400
                           transition-colors duration-200">
              {convertTemp(forecast.maxTemp)}°
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400">High</p>
          </div>
          <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
          <div className="text-center">
            <span className="text-xl font-semibold text-gray-600 dark:text-gray-400
                           group-hover:text-blue-500 dark:group-hover:text-blue-500
                           transition-colors duration-200">
              {convertTemp(forecast.minTemp)}°
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400">Low</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex justify-around items-center pt-3 border-t border-gray-200 dark:border-gray-700
                        group-hover:border-blue-200 dark:group-hover:border-blue-800
                        transition-colors duration-200">
          {/* Precipitation */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-base group-hover:scale-110 transition-transform duration-200">💧</span>
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              {forecast.precipitation}%
            </span>
          </div>
          
          {/* Humidity */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-base group-hover:scale-110 transition-transform duration-200">💦</span>
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              {forecast.humidity}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
