import React, { useContext, useEffect, useState } from 'react'
import { Label, Input, Button, HelperText } from '@learn49/aura-ui'
import { client } from '../services/urqlClient'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { AccountContext } from '../context/AccountContext'
import { useMutation } from 'urql'

import Head from '../elements/Head'
import Logo from '../elements/Logo'

interface FormValues {
  email: string
  password: string
}

const AUTH = `
  mutation authParent($accountId: Int!, $email: String!, $password: String!) {
    authParent(input: {
      accountId: $accountId,
      email: $email,
      password: $password
    })  {
      refreshToken
      accessToken
    }
  }
`

const Schema = Yup.object().shape({
  email: Yup.string()
    .email('Preencha um Email Válido')
    .required('Preenchimento Obrigatório'),
  password: Yup.string().required('Preenchimento Obrigatório')
})

const Login = () => {
  const router = useRouter()
  const account = useContext(AccountContext)
  const [isLoading, setLoading] = useState(false)
  const [, auth] = useMutation(AUTH)
  const [background, setBackground] = useState({ url: '', config: '' })

  const form = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Schema,
    onSubmit: async (values: FormValues) => {
      // const input = { ...values, accountId: account.id }
      // setLoading(true)
      // const data = await auth(input)
      // if (data && data.authParent) {
      //   localStorage.setItem('refreshToken', data.authParent.refreshToken)
      //   localStorage.setItem('accessToken', data.authParent.accessToken)
      //   router.push('/app/parents')
      // } else {
      //   setLoading(false)
      //   toast.error('Email e/ou Senha inválida')
      // }
    }
  })

  useEffect(() => {
    if (account.background) {
      const configs = JSON.parse(account.background)
      setBackground(configs)
    }
  }, [account])

  return (
    <>
      <Head title={`${account.name} - Login`} />
      <div
        className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${background.config}`}
        style={{ backgroundImage: `url(${background.url})` }}
      >
        <Logo />
        <div
          className={`flex items-center 
            ${account.logo ? 'p-6 lg:mt-6' : 'pt-10 md:pt-2 lg:pt-14'}
          `}
        >
          <div className='flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800'>
            <div className='flex flex-col overflow-y-auto md:flex-row'>
              <div
                className='flex bg-cover bg-center w-full md:w-1/2 h-64 md:h-auto'
                style={{
                  backgroundImage: account.homeImage
                    ? `url(${account.homeImage})`
                    : 'url(/img/login-office.jpeg)'
                }}
              ></div>
              <main className='flex itembg-cover bg-centers-center justify-center p-6 sm:px-8 md:w-1/2'>
                <div className='w-full'>
                  {(account.configText > 0 || account.configText === null) && (
                    <>
                      <h1 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200 capitalize'>
                        {account.configText === 2
                          ? account.textTitle
                          : account.name}
                      </h1>
                      {account.configText === 2 && (
                        <p className='text-gray-500 -mt-5 mb-3'>
                          {account.textDescription}
                        </p>
                      )}
                    </>
                  )}
                  <form onSubmit={form.handleSubmit}>
                    <Label>
                      <span>Email</span>
                      <Input
                        css='mt-1 border border-opacity-50'
                        type='email'
                        id='email'
                        valid={form.submitCount == 0 || !form.errors.email}
                        placeholder='Digite seu email'
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                      {form.errors.email && (
                        <HelperText className='text-red-300'>
                          {form.errors.email}
                        </HelperText>
                      )}
                    </Label>

                    <Label className='mt-4'>
                      <span>Senha</span>
                      <Input
                        css='mt-1 border border-opacity-50 border-gray-200'
                        type='password'
                        id='password'
                        valid={!form.errors.password}
                        placeholder='Digite sua senha'
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                      {form.errors.password && (
                        <HelperText className='text-red-300'>
                          {form.errors.password}
                        </HelperText>
                      )}
                    </Label>

                    <Button
                      className='mt-4'
                      block
                      type={'submit'}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Aguarde...' : 'Entrar'}
                    </Button>
                  </form>
                  <hr className='my-3' />
                  <p className='flex justify-between'>
                    <Link href='/admin'>
                      <a className='text-sm cursor-pointer font-medium text-purple-600 dark:text-purple-400 hover:underline'>
                        Acesso Administrativo
                      </a>
                    </Link>
                    <a
                      href='https://alunotv.com.br'
                      className='text-gray-200 text-right'
                    >
                      <img src='/alunotv.png' />
                    </a>
                  </p>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
