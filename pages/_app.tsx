import React from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'urql'
import 'tailwindcss/tailwind.css'

import { AccountProvider } from '../context/AccountContext'
import { AuthProvider } from '../context/AuthContext'
import { authClient } from '../services/urqlClient'

import ToastElement from '../elements/Toast'
// import AdminLayout from '../layouts/AdminLayout'
import StudentsLayout from '../layouts/StudentsLayout'

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

  // const AdminAuthenticatedLayout = ({ children }) => (
  //     <AuthProvider role='owner'>
  //       <AdminLayout>{children}</AdminLayout>
  //     </AuthProvider>
  // )
  const StudentsAuthenticatedLayout = ({ children }) => (
    <AuthProvider role='user'>
      <StudentsLayout>{children}</StudentsLayout>
    </AuthProvider>
  )
  const DefaultLayout = ({ children }) => ({ children })

  let Layout = null
  if (nonAuthenticate.includes(router.pathname)) {
    Layout = DefaultLayout
  }
  // if (router.pathname.startsWith('/app/admin')) {
  //   Layout = AdminAuthenticatedLayout
  // }
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
