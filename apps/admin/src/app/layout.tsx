import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nutrexia Admin Panel',
  description: 'Catalogue, Inventory, Orders & Content Management for Nutrexia'
};

export default function AdminLayout({
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
