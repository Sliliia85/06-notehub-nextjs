import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Manage your notes efficiently',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {}
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <TanStackProvider>
          <Header />
          {}
          <div style={{ flex: 1 }}>
            {children}
          </div>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}