// components
import { Sidebar } from '../components'


// styles
import './globals.css'

// fonts
import { Figtree } from 'next/font/google'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotify Clone',
  description: 'Listen to your favorite music!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={font.className}
      >
        <Sidebar>
          {children}
        </Sidebar>
      </body>
    </html>
  )
}
