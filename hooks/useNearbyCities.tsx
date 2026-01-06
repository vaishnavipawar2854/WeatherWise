'use client';

import { useState, useCallback } from 'react';
import { WeatherData } from '@/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_OPENWEATHER_BASE_URL;

interface UseNearbyCitiesResult {
  nearbyCities: WeatherData[];
  loading: boolean;
  error: string | null;
  fetchNearbyCitiesByCoords: (lat: number, lon: number, count?: number) => Promise<void>;
  fetchNearbyCitiesByCity: (city: string, count?: number) => Promise<void>;
  clearCities: () => void;
}

export function useNearbyCities(): UseNearbyCitiesResult {
  const [nearbyCities, setNearbyCities] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNearbyCitiesByCoords = useCallback(async (lat: number, lon: number, count: number = 25) => {
    setLoading(true);
    setError(null);

    try {
      // OpenWeather API to find cities around a point
      const url = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=${count}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch nearby cities');
      }

      const data = await response.json();
      
      if (!data.list || data.list.length === 0) {
        throw new Error('No nearby cities found');
      }

      const cities: WeatherData[] = data.list.map((city: {
        name: string;
        sys: { country: string };
        main: { temp: number; feels_like: number; pressure: number; humidity: number };
        weather: Array<{ main: string; description: string; icon: string }>;
        wind: { speed: number; deg: number };
        visibility: number;
        dt: number;
      }) => ({
        location: city.name,
        country: city.sys.country,
        temperature: Math.round(city.main.temp),
        feelsLike: Math.round(city.main.feels_like),
        condition: city.weather[0].main,
        description: city.weather[0].description,
        humidity: city.main.humidity,
        windSpeed: Math.round(city.wind.speed * 3.6),
        windDirection: city.wind.deg,
        pressure: city.main.pressure,
        visibility: Math.round(city.visibility / 1000),
        icon: city.weather[0].icon,
        timestamp: new Date(city.dt * 1000),
      }));

      setNearbyCities(cities);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load nearby cities';
      setError(errorMessage);
      setNearbyCities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchNearbyCitiesByCity = useCallback(async (city: string, count: number = 25) => {
    setLoading(true);
    setError(null);

    try {
      // First get the coordinates of the searched city
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`;
      const geoResponse = await fetch(geoUrl);

      if (!geoResponse.ok) {
        throw new Error('City not found');
      }

      const geoData = await geoResponse.json();
      
      if (!geoData || geoData.length === 0) {
        throw new Error('City not found. Please check the spelling and try again.');
      }

      const { lat, lon } = geoData[0];
      
      // Now fetch nearby cities using those coordinates
      await fetchNearbyCitiesByCoords(lat, lon, count);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search city';
      setError(errorMessage);
      setNearbyCities([]);
      setLoading(false);
    }
  }, [fetchNearbyCitiesByCoords]);

  const clearCities = useCallback(() => {
    setNearbyCities([]);
    setError(null);
  }, []);

  return {
    nearbyCities,
    loading,
    error,
    fetchNearbyCitiesByCoords,
    fetchNearbyCitiesByCity,
    clearCities,
  };
}
