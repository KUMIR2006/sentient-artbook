import { Provider } from '@/components/ui/provider';
import './global.css';
import { IBM_Plex_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={ibmPlexMono.className} suppressHydrationWarning>
      <head></head>
      <body>
        <Provider>
          <Toaster />
          {children}
        </Provider>
      </body>
    </html>
  );
}
