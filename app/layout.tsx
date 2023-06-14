// components
import { Sidebar } from '../components'
import { SupabaseProvider } from '../providers'


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
        <SupabaseProvider>
          <Sidebar>
            {children}
          </Sidebar>
        </SupabaseProvider>
      </body>
    </html>
  )
}
