/**
 * Utility functions for the WeatherWise application
 */

/**
 * Format temperature with degree symbol
 */
export function formatTemperature(temp: number, unit: 'C' | 'F' = 'C'): string {
  return `${Math.round(temp)}°${unit}`;
}

/**
 * Get weather emoji based on condition code
 */
export function getWeatherEmoji(condition: string): string {
  const emojiMap: Record<string, string> = {
    clear: '☀️',
    sunny: '☀️',
    cloudy: '☁️',
    'partly-cloudy': '⛅',
    rainy: '🌧️',
    stormy: '⛈️',
    snowy: '❄️',
    foggy: '🌫️',
    windy: '💨',
  };
  
  return emojiMap[condition.toLowerCase()] || '🌤️';
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Get day of week from date
 */
export function getDayOfWeek(date: Date): string {
  return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
}
