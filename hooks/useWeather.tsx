'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  OpenWeatherForecastResponse,
  WeatherData,
  ForecastDay,
  WeatherError,
} from '@/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_OPENWEATHER_BASE_URL;

interface UseWeatherResult {
  currentWeather: WeatherData | null;
  forecast: ForecastDay[];
  loading: boolean;
  error: WeatherError | null;
  fetchWeatherByCity: (city: string) => Promise<void>;
  fetchWeatherByCoords: (lat: number, lon: number) => Promise<void>;
  clearError: () => void;
}

// Helper function to get wind direction
const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

// Transform API response to application format
const transformWeatherData = (data: OpenWeatherForecastResponse): { current: WeatherData; forecast: ForecastDay[] } => {
  const currentItem = data.list[0];
  
  const current: WeatherData = {
    location: data.city.name,
    country: data.city.country,
    temperature: Math.round(currentItem.main.temp),
    feelsLike: Math.round(currentItem.main.feels_like),
    condition: currentItem.weather[0].main,
    description: currentItem.weather[0].description,
    humidity: currentItem.main.humidity,
    windSpeed: Math.round(currentItem.wind.speed * 3.6), // Convert m/s to km/h
    windDirection: currentItem.wind.deg,
    pressure: currentItem.main.pressure,
    visibility: Math.round(currentItem.visibility / 1000), // Convert to km
    icon: currentItem.weather[0].icon,
    timestamp: new Date(currentItem.dt * 1000),
  };

  // Group forecast by day and get daily min/max
  const dailyForecasts = new Map<string, OpenWeatherForecastResponse['list']>();
  
  data.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toISOString().split('T')[0];
    
    if (!dailyForecasts.has(dateKey)) {
      dailyForecasts.set(dateKey, []);
    }
    dailyForecasts.get(dateKey)!.push(item);
  });

  const forecast: ForecastDay[] = Array.from(dailyForecasts.entries())
    .slice(0, 5) // Get 5 days
    .map(([dateKey, items]) => {
      const temps = items.map(item => item.main.temp);
      const maxTemp = Math.max(...temps);
      const minTemp = Math.min(...temps);
      
      // Use the midday forecast for condition (around 12:00)
      const middayItem = items.find(item => {
        const hour = new Date(item.dt * 1000).getHours();
        return hour >= 11 && hour <= 14;
      }) || items[0];

      // Calculate average precipitation probability
      const avgPrecipitation = items.reduce((sum, item) => sum + (item.pop || 0), 0) / items.length;
      const avgHumidity = items.reduce((sum, item) => sum + item.main.humidity, 0) / items.length;

      return {
        date: new Date(dateKey),
        maxTemp: Math.round(maxTemp),
        minTemp: Math.round(minTemp),
        condition: middayItem.weather[0].main,
        description: middayItem.weather[0].description,
        icon: middayItem.weather[0].icon,
        precipitation: Math.round(avgPrecipitation * 100),
        humidity: Math.round(avgHumidity),
      };
    });

  return { current, forecast };
};

export function useWeather(): UseWeatherResult {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<WeatherError | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const fetchWeatherByCity = useCallback(async (city: string) => {
    if (!city.trim()) {
      setError({ message: 'Please enter a city name' });
      return;
    }

    console.log('Fetching weather for city:', city);
    setLoading(true);
    setError(null);

    try {
      const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
      console.log('API URL:', url.replace(API_KEY || '', 'API_KEY_HIDDEN'));
      const response = await fetch(url);

      console.log('API Response status:', response.status);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.');
        } else if (response.status === 401) {
          throw new Error('Invalid API key. Please check your configuration.');
        } else {
          throw new Error('Failed to fetch weather data. Please try again later.');
        }
      }

      const data: OpenWeatherForecastResponse = await response.json();
      console.log('Weather data received:', data.city.name);
      const { current, forecast: forecastData } = transformWeatherData(data);
      
      setCurrentWeather(current);
      setForecast(forecastData);
      console.log('Weather state updated successfully');
    } catch (err) {
      console.error('Error fetching weather:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError({ message: errorMessage });
      setCurrentWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByCoords = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);

    try {
      const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your configuration.');
        } else {
          throw new Error('Failed to fetch weather data for your location.');
        }
      }

      const data: OpenWeatherForecastResponse = await response.json();
      const { current, forecast: forecastData } = transformWeatherData(data);
      
      setCurrentWeather(current);
      setForecast(forecastData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError({ message: errorMessage });
      setCurrentWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch weather for user's location on mount
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.log('Geolocation error:', error.message);
          // Don't show error, just skip auto-location
        }
      );
    }
  }, [fetchWeatherByCoords]);

  return {
    currentWeather,
    forecast,
    loading,
    error,
    fetchWeatherByCity,
    fetchWeatherByCoords,
    clearError,
  };
}
