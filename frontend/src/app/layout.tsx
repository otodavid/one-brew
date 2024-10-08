import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StoreProvider } from './StoreProvider';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang='en'>
        <body className={inter.className}>
          <div className='overflow-hidden'>
            <Header />

            <main>{children}</main>

            <Footer />
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
