# Project Structure

## Overview
WeatherWise is a frontend-only weather forecasting application built with Next.js 15, TypeScript, and Tailwind CSS.

## Directory Structure

```
WeatherWise/
├── app/                      # Next.js App Router
│   ├── favicon.ico          # App icon
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home page (client component)
│   └── not-found.tsx        # 404 page
│
├── components/              # React components
│   ├── ClientLayout.tsx    # Client-side layout wrapper
│   ├── Header.tsx          # Header with dark mode toggle
│   └── Footer.tsx          # Footer component
│
├── hooks/                   # Custom React hooks
│   └── useTheme.tsx        # Theme provider and hook for dark mode
│
├── lib/                     # Utility functions
│   └── utils.ts            # Helper functions (temperature, dates, etc.)
│
├── types/                   # TypeScript type definitions
│   └── weather.ts          # Weather-related types
│
├── public/                  # Static assets
│
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore rules
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration (with dark mode)
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Key Features

### 1. **Dark Mode**
- Implemented using Tailwind's class strategy
- Persists user preference in localStorage
- Respects system preference on first visit
- Toggle button in header

### 2. **Responsive Design**
- Mobile-first approach
- Tailwind utility classes for breakpoints
- Optimized for all screen sizes

### 3. **TypeScript**
- Full type safety
- Type definitions in `/types`
- Strict mode enabled

### 4. **Component Structure**
- Modular and reusable components
- Client components marked with 'use client'
- Separation of layout and content

### 5. **Styling**
- Tailwind CSS for utilities
- Custom scrollbar styles
- Smooth transitions and animations
- Gradient backgrounds

## Configuration

### Tailwind CSS
- **Dark Mode**: Class-based (`darkMode: "class"`)
- **Content**: Scans app, components, and pages
- **Custom Theme**: Extended colors for background/foreground

### Next.js
- **App Router**: Using the new app directory structure
- **Dynamic Rendering**: `force-dynamic` for client-side features
- **TypeScript**: Strict type checking enabled
- **Font**: Inter font from Google Fonts

### ESLint
- Next.js recommended rules
- React hooks rules
- TypeScript support

## Development Notes

### Why 'use client'?
Several components use 'use client' because they:
- Access browser APIs (localStorage, window.matchMedia)
- Use React hooks (useState, useEffect, useContext)
- Handle user interactions (onClick events)

### Dynamic Rendering
The root layout uses `export const dynamic = 'force-dynamic'` to ensure proper client-side hydration for theme features.

### No API Routes
This is intentionally a frontend-only application. There are no API routes in the `/app/api` directory.

## Future Enhancements
- Weather API integration (frontend only, using public APIs)
- Location search functionality
- Weather data visualization
- Forecast charts and graphs
- Weather alerts
- Favorite locations
- Unit preferences (Celsius/Fahrenheit)
