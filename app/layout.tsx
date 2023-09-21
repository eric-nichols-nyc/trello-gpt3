import Modal from '@/components/modals/BoardModal'
import './globals.css'
import type { Metadata } from 'next'
import AuthProvider from '@/context/AuthProvider'
import { Inter } from 'next/font/google'
import { UserProvider } from '@/context/UserContext'
import Modals from '@/components/modals/Modals'
import getCurrentUser from '@/utils/getCurrentUser'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trello AI Clone',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
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
              <Modals user={user} />
              {children}
            </main>
        </AuthProvider>
      </body>
    </html>
  )
}
