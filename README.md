# WeatherWise 🌤️

A modern, frontend-only weather forecasting web application built with Next.js 15, TypeScript, and Tailwind CSS.

## ✨ Features

- 🌓 **Dark Mode Toggle** - Seamless light/dark theme switching with system preference detection
- 📱 **Mobile-First Responsive Design** - Optimized for all devices and screen sizes
- ⚡ **Built with Next.js 15 App Router** - Latest React features and optimal performance
- 🎨 **Styled with Tailwind CSS** - Beautiful, utility-first CSS framework
- 💪 **TypeScript** - Full type safety throughout the application
- 🚀 **Frontend-Only Architecture** - No backend or API routes

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone or navigate to the project directory:
```bash
cd WeatherWise
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3
- **UI Library:** React 19
- **Font:** Inter (Google Fonts)

## 📁 Project Structure

```
weatherwise/
├── app/                # Next.js App Router pages and layouts
│   ├── layout.tsx     # Root layout with metadata
│   ├── page.tsx       # Home page
│   ├── not-found.tsx  # 404 page
│   └── globals.css    # Global styles
├── components/         # Reusable React components
│   ├── ClientLayout.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── hooks/             # Custom React hooks
│   └── useTheme.tsx   # Dark mode management
├── lib/               # Utility functions
│   └── utils.ts
├── types/             # TypeScript type definitions
│   └── weather.ts
└── public/            # Static assets
```

See [STRUCTURE.md](./STRUCTURE.md) for detailed documentation.

## 🎨 Features Overview

### Dark Mode
- Persists user preference in localStorage
- Respects system theme preference
- Smooth transitions between themes
- Custom toggle button in header

### Responsive Design
- Mobile-first approach using Tailwind breakpoints
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements
- Optimized performance across devices

### Type Safety
- Comprehensive TypeScript types
- Strong typing for all components and functions
- Type definitions for future weather data integration

## 🔮 Future Enhancements

This project provides a solid foundation for adding weather functionality:

- [ ] Integrate weather API (e.g., OpenWeatherMap, WeatherAPI)
- [ ] City search with autocomplete
- [ ] Real-time weather data display
- [ ] 7-day forecast visualization
- [ ] Weather charts and graphs
- [ ] Location-based weather detection
- [ ] Unit preferences (°C/°F, km/h, mph)
- [ ] Favorite locations
- [ ] Weather alerts and notifications

## 📝 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run lint` - Run ESLint

### Code Style

- ESLint with Next.js recommended rules
- TypeScript strict mode enabled
- Consistent component structure
- Functional components with hooks

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available for educational and personal use.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons and emojis for weather visualization

---

**Note:** This is a frontend-only application. There are no backend components or API routes in this project.
