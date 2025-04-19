import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: "Enjoy the day",
  description: 'A special celebration for Jane',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}


