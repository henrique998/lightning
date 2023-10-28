import { Toaster } from '@/components/ui/toaster'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import './globals.css'

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Lightning App',
  description: 'Ecommerce app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          card: 'rounded-xl border bg-card text-card-foreground shadow-none border-border p-6',
          headerTitle: 'text-zinc-950',
          socialButtonsBlockButton: 'hover:bg-zinc-50',
          socialButtonsBlockButtonArrow__google: 'hidden',
          formFieldLabel:
            'text-zinc-950 peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          formFieldInput:
            'rounded-md px-3 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-zinc-500 transition-colors',
          formButtonPrimary:
            'bg-zinc-950 hover:bg-zinc-800 transition-all text-zinc-100',
          footerActionText: 'text-zinc-400',
          footerActionLink: 'text-zinc-950 hover:text-zinc-950',
        },
      }}
    >
      <html lang="en">
        <body className={lexend.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
