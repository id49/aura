import React, { useContext } from 'react'
import { AccountContext } from '../../context/AccountContext'

const Logo = () => {
  const account = useContext(AccountContext)
  if (!account.logo) {
    return null
  }
  return (
    <img
      className={`max-h-24 sm:rounded block p-4`}
      src={account.logo}
      //src='https://alunotv-assets.s3.amazonaws.com/af2b267f2db461bd9339-Logo_Aquarela_Encantada_80x40mm_Azul.png'
      alt={account.name}
    />
  )
}

export default Logo
