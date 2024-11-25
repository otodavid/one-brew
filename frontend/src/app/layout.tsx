import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import Providers from './providers';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'One Brew',
  description:
    "More than just a coffee, it's a feeling. Elevate your morning routine with a perfectly brewed cup and enjoy the taste of freshly roasted beans.",
  keywords: [
    'coffee',
    'drinks',
    'ecommerce',
    'coffee shop',
    'breakfast',
    'bakery',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <div className='overflow-hidden mx-auto'>
            <Header />

            <main>{children}</main>

            <Footer />

            <Toaster position='top-right' offset={'2rem'} closeButton={true} />
          </div>
        </Providers>
      </body>
    </html>
  );
}
