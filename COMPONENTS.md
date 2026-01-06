# WeatherWise Components Documentation

## 📦 Component Overview

This document describes all the reusable React components built for the WeatherWise application.

---

## 🔍 Components

### 1. **SearchBar** (`components/SearchBar.tsx`)

A reusable search input component with location detection.

**Features:**
- City name search with form submission
- Loading state with animated spinner
- "Use my location" button for geolocation
- Smooth hover effects and transitions
- Fully responsive design
- Disabled state during loading

**Props:**
```typescript
interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationClick: () => void;
  loading?: boolean;
  placeholder?: string;
}
```

**Usage:**
```tsx
<SearchBar
  onSearch={(city) => fetchWeather(city)}
  onLocationClick={handleGetLocation}
  loading={isLoading}
/>
```

---

### 2. **WeatherCard** (`components/WeatherCard.tsx`)

Main weather display card with detailed information and temperature unit toggle.

**Features:**
- Large temperature display with feels-like info
- Weather icon and condition description
- Temperature unit toggle (°C/°F)
- Wind, humidity, pressure, and visibility details
- Animated background effects on hover
- Fully responsive layout

**Props:**
```typescript
interface WeatherCardProps {
  weather: WeatherData;
  unit: 'C' | 'F';
  onUnitToggle: () => void;
}
```

**Usage:**
```tsx
<WeatherCard 
  weather={currentWeather} 
  unit={unit}
  onUnitToggle={toggleUnit}
/>
```

---

### 3. **ForecastCard** (`components/ForecastCard.tsx`)

Individual forecast day card component.

**Features:**
- Weather icon with smooth animations
- High/low temperature display
- Precipitation and humidity percentages
- "Today" indicator for current day
- Hover effects with scale transformation
- Responsive text sizing

**Props:**
```typescript
interface ForecastCardProps {
  forecast: ForecastDay;
  unit: 'C' | 'F';
  isToday?: boolean;
}
```

---

### 4. **ForecastList** (`components/ForecastList.tsx`)

Container for 5-day forecast display.

**Features:**
- Grid layout with responsive columns
- Staggered animation on load
- Live update indicator
- Title customization

**Props:**
```typescript
interface ForecastListProps {
  forecast: ForecastDay[];
  unit: 'C' | 'F';
  title?: string;
}
```

**Usage:**
```tsx
<ForecastList 
  forecast={forecastData}
  unit={unit}
  title="5-Day Forecast"
/>
```

---

### 5. **WeatherTable** (`components/WeatherTable.tsx`)

Advanced table component with sorting and pagination.

**Features:**
- Sortable columns (temperature, humidity, wind speed, location)
- Pagination with configurable items per page
- Desktop table view with hover effects
- Mobile-friendly card layout
- Smooth transitions and animations
- Page navigation with ellipsis

**Props:**
```typescript
interface WeatherTableProps {
  cities: WeatherData[];
  unit: 'C' | 'F';
  itemsPerPage?: number;
}
```

**Usage:**
```tsx
<WeatherTable 
  cities={citiesWeather} 
  unit={unit}
  itemsPerPage={10}
/>
```

---

### 6. **WeatherSkeleton** (`components/WeatherSkeleton.tsx`)

Loading skeleton components for better UX.

**Available Skeletons:**
- `WeatherCardSkeleton` - Main weather card placeholder
- `ForecastCardSkeleton` - Forecast card placeholder
- `ForecastListSkeleton` - Full forecast list placeholder
- `WeatherTableSkeleton` - Table placeholder with configurable rows
- `DetailCardSkeleton` - Small detail card placeholder

**Usage:**
```tsx
{loading && (
  <>
    <WeatherCardSkeleton />
    <ForecastListSkeleton />
  </>
)}
```

---

## 🎣 Custom Hooks

### 1. **useWeather** (`hooks/useWeather.tsx`)

Manages weather data fetching and state.

**Features:**
- Fetch by city name
- Fetch by coordinates (lat/lon)
- Auto-fetch user location on mount
- Loading, error, and data states
- Data transformation from API to app format

**Returns:**
```typescript
interface UseWeatherResult {
  currentWeather: WeatherData | null;
  forecast: ForecastDay[];
  loading: boolean;
  error: WeatherError | null;
  fetchWeatherByCity: (city: string) => Promise<void>;
  fetchWeatherByCoords: (lat: number, lon: number) => Promise<void>;
  clearError: () => void;
}
```

---

### 2. **useTemperatureUnit** (`hooks/useTemperatureUnit.tsx`)

Global temperature unit state management.

**Features:**
- Context-based state management
- Toggle between Celsius and Fahrenheit
- Temperature conversion helper
- Persists across components

**Returns:**
```typescript
interface TemperatureUnitContextType {
  unit: 'C' | 'F';
  toggleUnit: () => void;
  convertTemp: (tempC: number) => number;
}
```

**Usage:**
```tsx
const { unit, toggleUnit, convertTemp } = useTemperatureUnit();
```

---

### 3. **useTheme** (`hooks/useTheme.tsx`)

Dark mode state management.

**Features:**
- Light/dark theme toggle
- localStorage persistence
- System preference detection
- Hydration-safe rendering

---

## 🎨 Styling Features

### Tailwind Utilities
- Responsive breakpoints (sm, md, lg)
- Dark mode support
- Gradient backgrounds
- Smooth transitions
- Hover effects
- Transform animations

### Custom Animations (globals.css)
```css
.animate-fade-in      /* Fade in animation */
.animate-slide-up     /* Slide up with fade */
.animate-slide-down   /* Slide down with fade */
```

---

## 📱 Responsive Design

### Breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Responsive Features:
- Flexible grid layouts
- Mobile-first design
- Touch-friendly buttons
- Adaptive text sizes
- Collapsible navigation

---

## 🎯 Key Features

### ✅ Implemented:
1. **City Search** - Search any city worldwide
2. **Location Detection** - Auto-detect user location
3. **Temperature Toggle** - Switch between °C and °F
4. **5-Day Forecast** - Detailed weather predictions
5. **Weather Comparison** - Compare 25+ cities
6. **Sorting & Pagination** - Advanced table features
7. **Loading States** - Skeleton UI for better UX
8. **Error Handling** - User-friendly error messages
9. **Dark Mode** - Full dark theme support
10. **Animations** - Smooth transitions throughout

### 🎨 UI/UX Highlights:
- **Hover Effects** - Interactive feedback
- **Smooth Transitions** - 200-500ms animations
- **Gradient Backgrounds** - Modern visual design
- **Responsive Icons** - Weather condition visuals
- **Accessibility** - ARIA labels and semantic HTML

---

## 🚀 Usage Example

```tsx
'use client';

import { useWeather } from '@/hooks/useWeather';
import { useTemperatureUnit } from '@/hooks/useTemperatureUnit';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import ForecastList from '@/components/ForecastList';
import { WeatherCardSkeleton } from '@/components/WeatherSkeleton';

export default function WeatherPage() {
  const { currentWeather, forecast, loading, error, 
          fetchWeatherByCity, fetchWeatherByCoords } = useWeather();
  const { unit, toggleUnit } = useTemperatureUnit();

  return (
    <div className="space-y-8">
      <SearchBar
        onSearch={fetchWeatherByCity}
        onLocationClick={() => {/* get coords */}}
        loading={loading}
      />

      {loading && <WeatherCardSkeleton />}
      
      {currentWeather && !loading && (
        <>
          <WeatherCard 
            weather={currentWeather} 
            unit={unit}
            onUnitToggle={toggleUnit}
          />
          <ForecastList forecast={forecast} unit={unit} />
        </>
      )}
    </div>
  );
}
```

---

## 📄 Pages

### 1. Home Page (`app/page.tsx`)
- Weather search and display
- Current conditions
- 5-day forecast

### 2. Compare Page (`app/compare/page.tsx`)
- 25 city comparison table
- Sortable columns
- Pagination
- Bulk data loading

---

## 🔧 Configuration

### Environment Variables (.env.local)
```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
NEXT_PUBLIC_OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
```

### Providers Setup (components/ClientLayout.tsx)
```tsx
<ThemeProvider>
  <TemperatureUnitProvider>
    {/* Your app */}
  </TemperatureUnitProvider>
</ThemeProvider>
```

---

## 🎯 Best Practices

1. **Always use hooks within providers**
2. **Handle loading and error states**
3. **Use skeleton loaders for better UX**
4. **Implement responsive breakpoints**
5. **Add hover effects for interactivity**
6. **Use semantic HTML elements**
7. **Include ARIA labels for accessibility**
8. **Test dark mode compatibility**

---

## 📦 Component Tree

```
App
├── ThemeProvider
│   ├── TemperatureUnitProvider
│   │   ├── Header (with navigation)
│   │   ├── Main Content
│   │   │   ├── SearchBar
│   │   │   ├── WeatherCard
│   │   │   ├── ForecastList
│   │   │   │   └── ForecastCard (×5)
│   │   │   └── WeatherTable
│   │   └── Footer
```

---

## 🔄 State Management

- **Theme**: Context API (ThemeProvider)
- **Temperature Unit**: Context API (TemperatureUnitProvider)
- **Weather Data**: useState + useEffect
- **Loading States**: useState
- **Error Handling**: useState

---

## ✨ Animation Details

### Timing Functions:
- `ease-in-out` - Smooth start and end
- `ease-out` - Quick start, smooth end
- Duration: 200-500ms

### Transform Effects:
- `scale(1.05)` - Hover enlargement
- `scale(0.95)` - Active press
- `translateY(-20px)` - Slide animations
- `rotate(3deg)` - Subtle tilts

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
