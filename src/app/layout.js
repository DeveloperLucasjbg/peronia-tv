import { Inter } from 'next/font/google'
import AdSense from './components/AdSense'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Peruca Tv',
  description: 'Generated peruca love'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <head>
        <AdSense />
        <link rel='icon' href='/perucaIcon.png' type='image/png' />
        {/* Otros elementos de Head pueden ir aquí */}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
