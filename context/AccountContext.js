import React, { createContext, useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { pureFetcher } from '../lib/graphql'

//Teste
import Head from '../elements/Head'

import Waiting from '../components/Waiting'
import useSWR from 'swr'

export const AccountContext = createContext()

const GET_ACCOUNT_BY_DOMAIN = (subDomain) => `
  query {
    getAccountSettings(url: "${subDomain}") {
      id
      name
      url
      logo
      background
      homeImage
      initialImage
      configText
      textTitle
      textDescription
    }
  }
`

export const AccountProvider = ({ children, account = {} }) => {
  const [currentAccount, setAccount] = useState(account)

  const checkSettings = () => {
    if (Object.keys(currentAccount).length > 0) {
      return null
    }
    const subdomain = window.location.hostname.split('.')[0]
    const query = {
      query: GET_ACCOUNT_BY_DOMAIN(subdomain)
    }
    return JSON.stringify(query)
  }
  const options = {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0
  }
  const { data } = useSWR(checkSettings, pureFetcher, options)
  useEffect(() => {
    if (data && data.data && data.data.getAccountSettings) {
      setAccount(data.data.getAccountSettings)
    }
  }, [data])

  const isLoading = Object.keys(currentAccount).length === 0 && !data

  if (isLoading) {
    return (
      <>
        <Head title='Aguarde...' />
        <Waiting />
      </>
    )
  }
  if (Object.keys(currentAccount).length > 0) {
    return (
      <AccountContext.Provider value={{ ...currentAccount, setAccount }}>
        {children}
      </AccountContext.Provider>
    )
  }

  return (
    <>
      <Head title='Account Not Found' />
      <div className='text-center mt-10'>
        <h1>Conta não encontrada!</h1>
        <p>Em caso de dúvidas, entre em contato por: contato@id49.com</p>
      </div>
    </>
  )
}

export const useAccount = () => {
  const currentAccount = useContext(AccountContext)
  return currentAccount
}

AccountProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
}
