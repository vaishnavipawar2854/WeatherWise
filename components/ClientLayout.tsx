'use client';

import { ThemeProvider } from '@/hooks/useTheme';
import { TemperatureUnitProvider } from '@/hooks/useTemperatureUnit';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ReactNode } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <TemperatureUnitProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
            {children}
          </main>
          <Footer />
        </div>
      </TemperatureUnitProvider>
    </ThemeProvider>
  );
}
