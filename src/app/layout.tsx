import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

import { UIProvider } from '../context/UIContext';
import Toast from '../components/ui/Toast';

export const metadata: Metadata = {
  title: 'NUTREXIA — Climate-Smart Plant Protein | Carbin Naturals',
  description: '30g of complete plant protein, prebiotics and daily-value micronutrients blended into rainfed millets.',
  manifest: '/manifest.json'
};

export const viewport = {
  themeColor: '#FAF6EA'
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <UIProvider>
          {children}
          <Toast />
        </UIProvider>
      </body>
    </html>
  );
}
