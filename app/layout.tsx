import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PfotenCard',
  description: 'Hundeschule Wertkartensystem',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="bg-gray-50 min-h-screen">
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
