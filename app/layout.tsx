import './globals.css'
import type { Metadata } from 'next'
import AuthProvider from '@/context/AuthProvider'
import Modals from '@/components/modals/Modals'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Trello AI Clone',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <ToastContainer
            position="top-center"
            autoClose={500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {/* Same as */}
            <main className='h-screen'>
              <Modals />
              {children}
            </main>
        </AuthProvider>
      </body>
    </html>
  )
}
