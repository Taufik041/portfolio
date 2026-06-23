import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { person } from '@/content';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${person.name} - ${person.role}`,
    template: `%s | ${person.name}`,
  },
  description: person.subline,
  openGraph: {
    title: `${person.name} - ${person.role}`,
    description: person.subline,
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col" style={{ background: 'var(--bg)' }}>
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
