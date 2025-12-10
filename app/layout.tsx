
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = "force-static"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: {
    default: 'KATRINASEC | Offensive Security',
    template: '%s | KATRINASEC'
  },
  description: 'Leading cybersecurity company providing comprehensive security solutions, penetration testing, threat assessment, and digital protection services for businesses worldwide.',
  keywords: ['cybersecurity', 'security solutions', 'penetration testing', 'threat assessment', 'digital security', 'KatrinaSec'],
  authors: [{ name: 'KatrinaSec Team' }],
  creator: 'KatrinaSec',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    title: 'KATRINASEC | Offensive Security',
    description: 'Leading cybersecurity company providing comprehensive security solutions and digital protection services.',
    siteName: 'KatrinaSec',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'KatrinaSec Offensive Security',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KatrinaSec - Advanced Cybersecurity Solutions',
    description: 'Leading cybersecurity company providing comprehensive security solutions.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
