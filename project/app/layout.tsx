import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import FloatingAssistant from '@/components/FloatingAssistant';
import { AuthProvider } from '@/components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Personality Test - Discover Your True Self',
  description: 'Take our comprehensive 54-question personality assessment to discover your unique personality type. Based on proven psychological frameworks with detailed insights.',
  keywords: 'personality test, Myers-Briggs, MBTI, psychology, self-discovery, personality types',
  authors: [{ name: 'Personality Test' }],
  openGraph: {
    title: 'Personality Test - Discover Your True Self',
    description: 'Take our comprehensive 54-question personality assessment to discover your unique personality type.',
    type: 'website',
    url: 'https://personality-test.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personality Test - Discover Your True Self',
    description: 'Take our comprehensive 54-question personality assessment to discover your unique personality type.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 ${inter.className}`}>
        <AuthProvider>
          <FloatingAssistant />
          {children}
          {/* Footer removed from global layout */}
        </AuthProvider>
      </body>
    </html>
  );
}