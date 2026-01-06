'use client';

import { ForecastDay } from '@/types/weather';
import ForecastCard from './ForecastCard';

interface ForecastListProps {
  forecast: ForecastDay[];
  unit: 'C' | 'F';
  title?: string;
}

export default function ForecastList({ forecast, unit, title = "5-Day Forecast" }: ForecastListProps) {
  if (forecast.length === 0) return null;

  return (
    <section className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white 
                       flex items-center gap-3">
          <span className="text-3xl">📅</span>
          {title}
        </h3>
        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          <span>Live updates</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <ForecastCard 
              forecast={day} 
              unit={unit} 
              isToday={index === 0}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
