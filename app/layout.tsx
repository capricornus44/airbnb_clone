import { Montserrat } from 'next/font/google'

import Navbar from '@/components/shared/navbar'

import type { Metadata } from 'next'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb | Vacation rentals, cabins, beach houses & more',
  description:
    'Find vacation rentals, cabins, beach houses, unique homes and experiences around the world - all made possible by hosts on Airbnb.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={montserrat.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
