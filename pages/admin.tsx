import React, { useContext, useEffect, useState } from 'react'
import { Label, Input, Button, HelperText } from '@learn49/aura-ui'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { AccountContext } from '../context/AccountContext'
import { fetcher, useMutation } from '../lib/graphql'

import Head from '../elements/Head'
import Logo from '../elements/Logo'

interface FormValues {
  email: string
  password: string
}

const AUTH = `
  mutation authAdmin($accountId: Int!, $email: String!, $password: String!) {
    authAdmin(input: {
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

  const form = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Schema,
    onSubmit: async (values: FormValues) => {
      const input = { ...values, accountId: account.id }
      setLoading(true)
      const data = await auth(input)
      if (data && data.authAdmin) {
        localStorage.setItem('refreshToken', data.authAdmin.refreshToken)
        localStorage.setItem('accessToken', data.authAdmin.accessToken)
        router.push('/app/admin')
      } else {
        setLoading(false)
        toast.error('Email e/ou Senha inválida')
      }
    }
  })

  useEffect(() => {
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
  }, [])

  return (
    <>
      <Head title={`${account.name} - Login`} />
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-900`}>
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
              <main className='flex items-center justify-center p-6 sm:px-8  md:w-1/2'>
                <div className='w-full'>
                  <h1 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200 capitalize'>
                    Área Administrativa
                  </h1>
                  <form onSubmit={form.handleSubmit}>
                    <Label>
                      <span>Email</span>
                      <Input
                        className='mt-1 border border-opacity-50'
                        type='email'
                        id='email'
                        valid={!form.errors.email}
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
                        className='mt-1 border border-opacity-50'
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
                    <Link href='/'>
                      <a className='text-sm cursor-pointer font-medium text-purple-600 dark:text-purple-400 hover:underline'>
                        Voltar à Página Inicial
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

const GET_ACCOUNT_BY_DOMAIN = (subDomain) => `
  query {
    getAccountSettings(url: "${subDomain}") {
      id
      name
      url
    }
  }
`

export async function getServerSideProps({ req }) {
  try {
    const subdomain = req.headers.host.split('.')[0]
    const query = {
      query: GET_ACCOUNT_BY_DOMAIN(subdomain)
    }
    const data = await fetcher(JSON.stringify(query))
    return {
      props: {
        error: false,
        account: data.getAccountSettings
      }
    }
  } catch (err) {
    return {
      props: {
        error: true
      }
    }
  }
}

export default Login
