import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import './globals.css';
import MainNav from '@/components/main-nav';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const roboto_mono = Roboto_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ticket Application',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={roboto_mono.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <nav className='flex flex-col items-center border-b mb-5 px-5 py-3'>
            <div className='max-w-6xl w-full'>
              <MainNav />
            </div>
          </nav>

          <main className='flex flex-col items-center'>
            <div className='max-w-6xl w-full p-6'>{children}</div>
          </main>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
