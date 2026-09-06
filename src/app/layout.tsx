import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NUTREXIA — Climate-Smart Plant Protein | Carbin Naturals',
  description: '30g of complete plant protein, prebiotics and daily-value micronutrients blended into rainfed millets.',
  manifest: '/manifest.json'
};

export const viewport = {
  themeColor: '#FAF6EA'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
