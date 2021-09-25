import React from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'urql'

import { AccountProvider } from '../context/AccountContext'
import { AuthProvider } from '../context/AuthContext'
import { client } from '../services/urqlClient'

import 'tailwindcss/tailwind.css'

import ToastElement from '../elements/Toast'
import AdminLayout from '../layouts/AdminLayout'
import ParentLayout from '../layouts/ParentLayout'

const nonAuthenticate = ['/', '/404', '/terms', '/admin', '/otp']

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
  if (router.pathname.startsWith('/app/admin')) {
    Layout = AdminAuthenticatedLayout
  }
  if (router.pathname.startsWith('/app/parents')) {
    Layout = ParentAuthenticatedLayout
  }

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
