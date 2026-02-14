import './globals.css'
import { Space_Grotesk } from 'next/font/google'
import { Metadata } from 'next'
const space = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'blaptrader',
  description: 'TRADE THE BLAP. OWN THE SOUND.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={space.className}>{children}</body>
    </html>
  )
}
