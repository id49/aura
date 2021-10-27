import React from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'urql'
import 'tailwindcss/tailwind.css'

import { Windmill } from '@learn49/aura-ui'

import { AccountProvider } from '@/context/AccountContext'
import { SidebarProvider } from '@/context/SidebarContext'
import { AuthProvider } from '@/context/AuthContext'
import { authClient } from '@/services/urqlClient'

import ToastElement from '@/elements/Toast'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const nonAuthenticate = [
  '/',
  '/signup',
  '/forgot',
  '/reset-password/[...ids]',
  '/404',
  '/terms'
]

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const { account } = pageProps

  const StudentsAuthenticatedLayout = ({ children }) => (
    <AuthProvider role='user'>
      <SidebarProvider>
        {/* usePreferences */}
        <Windmill>
          <div className='flex h-screen bg-gray-50 dark:bg-gray-900'>
            <div className='flex flex-col flex-1 w-full'>
              <Navbar />
              <main className='flex flex-col h-screen overflow-y-auto'>
                <div className='flex-1'>{children}</div>
                <Footer />
              </main>
            </div>
          </div>
        </Windmill>
      </SidebarProvider>
    </AuthProvider>
  )
  const DefaultLayout = ({ children }) => children

  let Layout = null
  if (nonAuthenticate.includes(router.pathname)) {
    Layout = DefaultLayout
  }
  if (router.pathname.startsWith('/app')) {
    Layout = StudentsAuthenticatedLayout
  }

  return (
    <Provider value={authClient}>
      <AccountProvider account={account}>
        <Layout>
          <ToastElement />
          <Component {...pageProps} />
        </Layout>
      </AccountProvider>
    </Provider>
  )
}

export default MyApp
