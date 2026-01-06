'use client';

import { WeatherData } from '@/types/weather';

interface WeatherCardProps {
  weather: WeatherData;
  unit: 'C' | 'F';
  onUnitToggle: () => void;
}

export default function WeatherCard({ weather, unit, onUnitToggle }: WeatherCardProps) {
  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const convertTemp = (tempC: number) => {
    return unit === 'C' ? tempC : Math.round((tempC * 9/5) + 32);
  };

  const getWindDirection = (degrees: number): string => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 
                    dark:from-blue-600 dark:via-blue-700 dark:to-blue-900 
                    rounded-3xl p-6 sm:p-8 text-white shadow-2xl
                    transition-all duration-500 ease-in-out
                    hover:shadow-blue-500/50 dark:hover:shadow-blue-900/50
                    group">
      
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
      
      <div className="relative z-10">
        {/* Header with location and unit toggle */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 drop-shadow-lg">
              {weather.location}
            </h2>
            <p className="text-lg sm:text-xl text-white/90 flex items-center gap-2">
              <span>🌍</span>
              <span>{weather.country}</span>
            </p>
          </div>
          
          {/* Temperature Unit Toggle */}
          <button
            onClick={onUnitToggle}
            className="flex items-center gap-1 bg-white/20 hover:bg-white/30 
                       backdrop-blur-sm rounded-full px-4 py-2
                       transition-all duration-200 ease-in-out
                       transform hover:scale-105 active:scale-95
                       shadow-lg"
            aria-label="Toggle temperature unit"
          >
            <span className={`font-semibold transition-all ${unit === 'C' ? 'text-white scale-110' : 'text-white/60'}`}>
              °C
            </span>
            <span className="text-white/60">|</span>
            <span className={`font-semibold transition-all ${unit === 'F' ? 'text-white scale-110' : 'text-white/60'}`}>
              °F
            </span>
          </button>
        </div>

        {/* Main weather display */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-6">
          {/* Temperature */}
          <div className="text-center sm:text-left">
            <div className="flex items-start gap-2">
              <span className="text-7xl sm:text-8xl font-bold drop-shadow-2xl animate-fade-in">
                {convertTemp(weather.temperature)}
              </span>
              <span className="text-4xl sm:text-5xl font-light mt-2">°{unit}</span>
            </div>
            <p className="text-lg sm:text-xl text-white/90 mt-2">
              Feels like {convertTemp(weather.feelsLike)}°{unit}
            </p>
          </div>

          {/* Weather icon and condition */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl"></div>
              <img
                src={getWeatherIcon(weather.icon)}
                alt={weather.condition}
                className="relative w-32 h-32 sm:w-40 sm:h-40 drop-shadow-2xl 
                           transform transition-transform duration-300
                           group-hover:scale-110 group-hover:rotate-3"
              />
            </div>
            <p className="text-xl sm:text-2xl font-semibold capitalize mt-2 drop-shadow-lg">
              {weather.description}
            </p>
          </div>
        </div>

        {/* Weather details grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/20">
          {/* Wind */}
          <div className="text-center sm:text-left transform transition-transform duration-200 hover:scale-105">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-2xl">💨</span>
              <p className="text-sm text-white/80 font-medium">Wind</p>
            </div>
            <p className="text-lg sm:text-xl font-bold">{weather.windSpeed} km/h</p>
            <p className="text-xs sm:text-sm text-white/70">{getWindDirection(weather.windDirection)}</p>
          </div>

          {/* Humidity */}
          <div className="text-center sm:text-left transform transition-transform duration-200 hover:scale-105">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-2xl">💧</span>
              <p className="text-sm text-white/80 font-medium">Humidity</p>
            </div>
            <p className="text-lg sm:text-xl font-bold">{weather.humidity}%</p>
            <p className="text-xs sm:text-sm text-white/70">Relative</p>
          </div>

          {/* Pressure */}
          <div className="text-center sm:text-left transform transition-transform duration-200 hover:scale-105">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-2xl">🌡️</span>
              <p className="text-sm text-white/80 font-medium">Pressure</p>
            </div>
            <p className="text-lg sm:text-xl font-bold">{weather.pressure}</p>
            <p className="text-xs sm:text-sm text-white/70">hPa</p>
          </div>

          {/* Visibility */}
          <div className="text-center sm:text-left transform transition-transform duration-200 hover:scale-105">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-2xl">👁️</span>
              <p className="text-sm text-white/80 font-medium">Visibility</p>
            </div>
            <p className="text-lg sm:text-xl font-bold">{weather.visibility}</p>
            <p className="text-xs sm:text-sm text-white/70">km</p>
          </div>
        </div>

        {/* Timestamp */}
        <div className="mt-6 text-center sm:text-right text-sm text-white/60">
          Updated: {new Date(weather.timestamp).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
