import React, { useContext, useEffect, useState, useRef } from 'react'
import { Label, Input, Button, HelperText } from '@learn49/aura-ui'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { useMutation } from 'urql'
import ReCaptcha from 'react-google-recaptcha'

import { AccountContext } from '../context/AccountContext'

import Head from '../elements/Head'
import Logo from '../elements/Logo'

interface FormValues {
  firstName: string
  lastName: string
  email: string
  passwd: string
  acceptTerms: boolean
}

const CREATE_USER = `
  mutation ($accountId: String!, $SignUpUserInput: SignUpUserInput!) {
    signUpUser(accountId: $accountId, input: $SignUpUserInput) {
      id
      emails {
        email
        verified
      }
    }
  }
`

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Campo obrigatório'),
  lastName: Yup.string().required('Campo obrigatório'),
  email: Yup.string().email('Email inválido').required('Campo obrigatório'),
  passwd: Yup.string()
    .min(6, 'Mínimo de 6 caracteres')
    .required('Campo obrigatório'),
  acceptTerms: Yup.bool().oneOf([true], 'Deve-se aceitar os Termos & Condições')
})

const SignUp = () => {
  const { push } = useRouter()
  const { id, friendlyName, recaptchaSiteKey } = useContext(AccountContext)
  const [, auth] = useMutation(CREATE_USER)
  const captchaRef = useRef()
  const [siteKey, setSiteKey] = useState('')

  const production = process.env.NEXT_PUBLIC_RECAPTCHA !== '--bypass--'

  useEffect(() => {
    if (recaptchaSiteKey) {
      setSiteKey(recaptchaSiteKey)
    } else {
      if (production) {
        setSiteKey(process.env.NEXT_PUBLIC_RECAPTCHA)
      }
    }
  }, [recaptchaSiteKey, production])

  const onSubmit = async (values: FormValues) => {
    const input = { UserInput: { ...values }, accountId: id }
    try {
      const { data } = await auth(input)
      if (!data) {
        toast.error('Usuário e/ou senha inválidos.')
        return
      }
      localStorage.setItem('learn49-token', data.auth.token)
      localStorage.setItem('learn49-user', JSON.stringify(data.auth.user))
      push('/app')
    } catch (e) {
      toast.error('Erro ao tentar operação')
    }
    // try {
    //   production && (await captchaRef.current.execute())
    //   await signUpUser({
    //     variables: {
    //       accountId,
    //       SignUpUserInput: {
    //         recaptcha: production ? captchaRef.current.getValue() : '',
    //         ...data
    //       }
    //     }
    //   })
    // } catch (error) {
    //   handleOpenSnackbar({
    //     severity: 'error',
    //     message: 'Erro ao criar conta.'
    //   })
    // }
  }

  const form = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      passwd: '',
      acceptTerms: false
    },
    validationSchema,
    onSubmit
  })

  return (
    <>
      <Head title={`${friendlyName} - Login`} />
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-900`}>
        <Logo />
        <div className='flex items-center pt-10 md:pt-2 lg:pt-14'>
          <div className='flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800'>
            <div className='flex flex-col overflow-y-auto md:flex-row'>
              <div className='bg-initial flex bg-cover bg-center w-full md:w-1/2 h-64 md:h-auto'></div>
              <main className='flex itembg-cover bg-centers-center justify-center p-6 sm:px-8 md:w-1/2'>
                <div className='w-full'>
                  <h1 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200 capitalize'>
                    {friendlyName}
                  </h1>
                  <p className='text-gray-500 -mt-5 mb-3'>
                    É bom ter você aqui! Crie uma conta!
                  </p>
                  <form onSubmit={form.handleSubmit}>
                    <Label>
                      <span>Nome</span>
                      <Input
                        css='mt-1 border border-opacity-50'
                        type='text'
                        id='firstName'
                        valid={!form.errors.firstName}
                        placeholder='Nome'
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                      {form.errors.firstName && (
                        <HelperText className='text-red-300'>
                          {form.errors.firstName}
                        </HelperText>
                      )}
                    </Label>
                    <Label className='mt-2'>
                      <span>Último Nome</span>
                      <Input
                        css='mt-1 border border-opacity-50 border-gray-200'
                        type='text'
                        id='lastName'
                        valid={!form.errors.lastName}
                        placeholder='Nome'
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                      {form.errors.lastName && (
                        <HelperText className='text-red-300'>
                          {form.errors.lastName}
                        </HelperText>
                      )}
                    </Label>
                    <Label className='mt-2'>
                      <span>Email</span>
                      <Input
                        css='mt-1 border border-opacity-50 border-gray-200'
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
                    <Label className='mt-2'>
                      <span>Senha</span>
                      <Input
                        css='mt-1 border border-opacity-50 border-gray-200'
                        type='password'
                        id='passwd'
                        valid={!form.errors.passwd}
                        placeholder='Digite sua senha'
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                      {form.errors.passwd && (
                        <HelperText className='text-red-300'>
                          {form.errors.passwd}
                        </HelperText>
                      )}
                    </Label>
                    <Label check className='mt-2'>
                      <Input
                        css=''
                        type='checkbox'
                        name='acceptTerms'
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                      <span className='ml-2'>
                        Criar uma conta significa que você concorda com nossos{' '}
                        <Link href='/accept-terms' passHref>
                          <a className='text-gray-800 font-medium hover:underline hover:text-gray-600'>
                            Termos de Serviço,
                          </a>
                        </Link>{' '}
                        <Link href='/policies' passHref>
                          <a className='text-gray-800 font-medium hover:underline hover:text-gray-600'>
                            Política de Privacidade
                          </a>
                        </Link>{' '}
                        e nossas{' '}
                        <Link href='/policies' passHref>
                          <a className='text-gray-800 font-medium hover:underline hover:text-gray-600'>
                            Configurações de Notificações.
                          </a>
                        </Link>
                      </span>
                    </Label>
                    {form.errors.acceptTerms && (
                      <HelperText className='text-red-300'>
                        {form.errors.acceptTerms}
                      </HelperText>
                    )}

                    <Button
                      className='mt-4'
                      block
                      type={'submit'}
                      disabled={form.isSubmitting}
                    >
                      {form.isSubmitting ? 'Aguarde...' : 'Cadastrar'}
                    </Button>
                  </form>
                  <hr className='my-3' />
                  <div className='flex justify-between'>
                    <Link href='/'>
                      <a className='text-sm text-gray-500 hover:text-gray-600 hover:underline cursor-pointer'>
                        Fazer Login
                      </a>
                    </Link>
                    <div className='text-right'>
                      <Image
                        src='/devpleno.svg'
                        alt='Logo'
                        height={25}
                        width={81}
                      />
                    </div>
                  </div>
                </div>
                {siteKey && (
                  <ReCaptcha
                    ref={captchaRef}
                    size='invisible'
                    sitekey={siteKey}
                  />
                )}
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
