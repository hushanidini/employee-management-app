import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from "@/redux/provider";
import TopBar from '@/componets/employees/layouts/TopBar';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Employee App',
  description: 'Generated by create employee app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <TopBar />
          <Container>
            <CssBaseline />
            {children}
          </Container>
          </Providers>
      </body>
    </html>
  )
}
