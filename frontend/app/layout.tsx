import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gabriel Upcott - Software Developer',
  description: 'A minimalist Next.js portfolio built with TailwindCSS and Strapi - Nicolas Gabriel Upcott 2025',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* 
        The body’s className can set a global font, text color, 
        background, etc. 
      */}
      <body className={`${inter.className} bg-white text-bodyText  flex items-center justify-center text-sm`}>
        {children}
      </body>
    </html>
  )
}
