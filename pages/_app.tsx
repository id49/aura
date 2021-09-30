import React from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'urql'
import 'tailwindcss/tailwind.css'

import { AccountProvider } from '../context/AccountContext'
import { AuthProvider } from '../context/AuthContext'
import { client } from '../services/urqlClient'

import ToastElement from '../elements/Toast'
import AdminLayout from '../layouts/AdminLayout'
import ParentLayout from '../layouts/ParentLayout'

const nonAuthenticate = [
  '/',
  '/signup',
  '/forgot',
  '/reset-password/[...ids]',
  '/404',
  '/terms',
  '/admin'
]

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const { account } = pageProps

  const AdminAuthenticatedLayout = ({ children }) => (
    <AuthProvider role='admin'>
      <AdminLayout> {children} </AdminLayout>
    </AuthProvider>
  )
  const ParentAuthenticatedLayout = ({ children }) => (
    <AuthProvider role='parent'>
      <ParentLayout> {children} </ParentLayout>
    </AuthProvider>
  )
  const DefaultLayout = ({ children }) => children

  let Layout = null
  if (nonAuthenticate.includes(router.pathname)) {
    Layout = DefaultLayout
  }
  if (router.pathname.startsWith('/app')) {
    Layout = AdminAuthenticatedLayout
  }
  // if (router.pathname.startsWith('/app/parents')) {
  //   Layout = ParentAuthenticatedLayout
  // }

  return (
    <Provider value={client}>
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
