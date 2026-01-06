export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center space-y-2">
          {/* Copyright */}
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
            © {currentYear} WeatherWise. All rights reserved.
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500 text-center">
            Powered by OpenWeatherMap API
          </div>
        </div>
      </div>
    </footer>
  );
}
