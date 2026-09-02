import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'
import './globals.css'

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
})

export const metadata: Metadata = {
  title: 'BLAP TRADER // CARD ANATOMY',
  description: 'Digital Trading Card Interface',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${spaceMono.variable} font-mono bg-[#030712] text-slate-300 min-h-screen p-8`}
      >
        {children}
      </body>
    </html>
  )
}
