'use client';

export function WeatherCardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 
                    rounded-3xl p-6 sm:p-8 shadow-2xl animate-pulse">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <div className="h-10 bg-white/30 dark:bg-gray-600 rounded-lg w-48"></div>
            <div className="h-6 bg-white/20 dark:bg-gray-600 rounded-lg w-32"></div>
          </div>
          <div className="h-10 bg-white/20 dark:bg-gray-600 rounded-full w-20"></div>
        </div>

        {/* Main content */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-3">
            <div className="h-24 bg-white/30 dark:bg-gray-600 rounded-lg w-40"></div>
            <div className="h-6 bg-white/20 dark:bg-gray-600 rounded-lg w-32"></div>
          </div>
          <div className="h-40 w-40 bg-white/20 dark:bg-gray-600 rounded-full"></div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/20">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-6 bg-white/20 dark:bg-gray-600 rounded w-20"></div>
              <div className="h-8 bg-white/30 dark:bg-gray-600 rounded w-16"></div>
              <div className="h-4 bg-white/20 dark:bg-gray-600 rounded w-12"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ForecastCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5
                    border border-gray-200 dark:border-gray-700 shadow-md animate-pulse">
      <div className="text-center space-y-3">
        <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-20 mx-auto"></div>
        <div className="h-20 w-20 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mx-auto"></div>
        <div className="flex justify-center gap-3">
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
        </div>
        <div className="flex justify-around pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-10"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-10"></div>
        </div>
      </div>
    </div>
  );
}

export function ForecastListSkeleton() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg w-48 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        {[...Array(5)].map((_, i) => (
          <ForecastCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

export function WeatherTableSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 
                    bg-white dark:bg-gray-800 shadow-lg animate-pulse">
      {/* Table Header */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`h-5 bg-gray-300 dark:bg-gray-600 rounded ${i >= 3 ? 'hidden sm:block' : ''}`}></div>
          ))}
        </div>
      </div>
      
      {/* Table Rows */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="p-4">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded hidden sm:block"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded hidden sm:block"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DetailCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 
                    border border-gray-200 dark:border-gray-700 shadow-sm animate-pulse">
      <div className="space-y-3">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
        <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
      </div>
    </div>
  );
}
