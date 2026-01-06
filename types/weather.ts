/**
 * Type definitions for the WeatherWise application
 */

// OpenWeatherMap API Response Types
export interface OpenWeatherCoord {
  lon: number;
  lat: number;
}

export interface OpenWeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

export interface OpenWeatherWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface OpenWeatherWind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface OpenWeatherClouds {
  all: number;
}

export interface OpenWeatherSys {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
  pod?: string;
}

export interface OpenWeatherRain {
  '3h'?: number;
}

export interface OpenWeatherForecastItem {
  dt: number;
  main: OpenWeatherMain;
  weather: OpenWeatherWeather[];
  clouds: OpenWeatherClouds;
  wind: OpenWeatherWind;
  visibility: number;
  pop: number; // Probability of precipitation
  rain?: OpenWeatherRain;
  sys: {
    pod: string; // Part of day (n=night, d=day)
  };
  dt_txt: string;
}

export interface OpenWeatherCity {
  id: number;
  name: string;
  coord: OpenWeatherCoord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface OpenWeatherForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: OpenWeatherForecastItem[];
  city: OpenWeatherCity;
}

// Application Types
export interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  visibility: number;
  icon: string;
  timestamp: Date;
}

export interface ForecastDay {
  date: Date;
  maxTemp: number;
  minTemp: number;
  condition: string;
  description: string;
  icon: string;
  precipitation: number;
  humidity: number;
}

export interface Location {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface WeatherError {
  message: string;
  code?: string;
}
