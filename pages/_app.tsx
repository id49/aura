import React from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'urql'
import 'tailwindcss/tailwind.css'

import { AccountProvider } from '../context/AccountContext'
import { AuthProvider } from '../context/AuthContext'
import { client, authClient } from '../services/urqlClient'

import ToastElement from '../elements/Toast'
import AdminLayout from '../layouts/AdminLayout'
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

  const AdminAuthenticatedLayout = ({ children }) => (
    <Provider value={authClient}>
      <AuthProvider role='owner'>
        <AdminLayout>{children}</AdminLayout>
      </AuthProvider>
    </Provider>
  )
  const StudentsAuthenticatedLayout = ({ children }) => (
    <Provider value={authClient}>
      <AuthProvider role='user'>
        <StudentsLayout>{children}</StudentsLayout>
      </AuthProvider>
    </Provider>
  )
  const DefaultLayout = ({ children }) => (
    <Provider value={client}>{children}</Provider>
  )

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
    <Layout>
      <AccountProvider account={account}>
        <ToastElement />
        <Component {...pageProps} />
      </AccountProvider>
    </Layout>
  )
}

export default MyApp
