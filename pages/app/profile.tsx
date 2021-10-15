import React from 'react'
import { Label, Input, Button, HelperText } from '@learn49/aura-ui'
// import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Head from '../../elements/Head'
import Title from '../../elements/Title'
import { useAuth } from '../../context/AuthContext'
// import { useQuery } from 'urql'

import Copyright from '../../components/Footer/Copyright'

interface FormValues {
  firstName: string
  lastName: string
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Campo obrigatório'),
  lastName: Yup.string().required('Campo obrigatório')
})

const Profile = () => {
  const { user } = useAuth()

  const onSubmit = async (values: FormValues) => {
    console.log(values)
  }

  const form = useFormik({
    initialValues: {
      firstName: '',
      lastName: ''
    },
    validationSchema,
    onSubmit
  })

  return (
    <>
      <Head title='Perfil' />
      <div className='container px-2 md:px-6 py-2 mx-auto'>
        <div className='container max-w-5xl mx-auto flex flex-col md:flex-row gap-2 bg-white rounded-lg mb-10'>
          <div className='md:w-1/6 flex flex-col items-center bg-gray-50 py-4'>
            <div className='object-cover w-20 h-20 rounded-full bg-gray-500' />
            <div className='mt-4'>
              <p className='text-xs font-thin'>Desde: 15/10/2021</p>
            </div>
          </div>
          <div className='w-full md:w-5/6 py-6 px-4'>
            <div className='mt-2 mb-6 py-4 px-2 bg-gray-200 rounded-lg'>
              <p className='font-semibold text-gray-600 dark:text-gray-300'>
                {[user.firstName, user.lastName].filter((x) => x).join(' ')}
              </p>
              <p className='text-gray-600 dark:text-gray-400'>{user.email}</p>
            </div>
            <Title text='Meu Perfil' />
            <form className='mt-4' onSubmit={form.handleSubmit}>
              <div className='flex flex-col md:flex-row justify-between gap-4'>
                <Label className='w-full'>
                  <span>Primeiro Nome</span>
                  <Input
                    css='mt-1 border border-opacity-50'
                    type='text'
                    id='firstName'
                    valid={form.submitCount == 0 || !form.errors.firstName}
                    placeholder='Primeiro Nome'
                    value={user.firstName}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  {form.errors.firstName && (
                    <HelperText className='text-red-300'>
                      {form.errors.firstName}
                    </HelperText>
                  )}
                </Label>

                <Label className='w-full'>
                  <span>Último Nome</span>
                  <Input
                    css='mt-1 border border-opacity-50 border-gray-200'
                    type='text'
                    id='lastName'
                    valid={!form.errors.lastName}
                    placeholder='Último Nome'
                    value={user.lastName}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  {form.errors.lastName && (
                    <HelperText className='text-red-300'>
                      {form.errors.lastName}
                    </HelperText>
                  )}
                </Label>
              </div>

              <div className='flex justify-between gap-4 mt-4'>
                <Label className='w-full'>
                  <span>Seu Site</span>
                  <Input
                    css='mt-1 border border-opacity-50'
                    type='text'
                    id='site'
                    disabled
                  />
                </Label>
              </div>

              <div className='flex flex-col md:flex-row justify-between gap-4 mt-4'>
                <Label className='md:w-1/2'>
                  <span>Twitter</span>
                  <div className='relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400'>
                    <Input
                      css='mt-1 border border-opacity-50'
                      type='text'
                      id='twitter'
                      disabled
                    />
                    <div className='absolute inset-y-0 left-0 flex items-center ml-3 pointer-events-none'>
                      http://www.twitter.com/
                    </div>
                  </div>
                </Label>
                <Label className='md:w-1/2'>
                  <span>Facebook</span>
                  <div className='relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400'>
                    <Input
                      css='mt-1 border border-opacity-50'
                      type='text'
                      id='twitter'
                      disabled
                    />
                    <div className='absolute inset-y-0 left-0 flex items-center ml-3 pointer-events-none'>
                      http://www.facebook.com/
                    </div>
                  </div>
                </Label>
              </div>

              <div className='flex flex-col md:flex-row justify-between gap-4 mt-4'>
                <Label className='md:w-1/2'>
                  <span>Linkedin</span>
                  <div className='relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400'>
                    <Input
                      css='mt-1 border border-opacity-50'
                      type='text'
                      id='twitter'
                      disabled
                    />
                    <div className='absolute inset-y-0 left-0 flex items-center ml-3 pointer-events-none'>
                      http://www.linkedin.com/
                    </div>
                  </div>
                </Label>
                <Label className='md:w-1/2'>
                  <span>Youtube</span>
                  <div className='relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400'>
                    <Input
                      css='mt-1 border border-opacity-50'
                      type='text'
                      id='twitter'
                      disabled
                    />
                    <div className='absolute inset-y-0 left-0 flex items-center ml-3 pointer-events-none'>
                      http://www.youtube.com/
                    </div>
                  </div>
                </Label>
              </div>
              <div className='text-right mt-6'>
                <Button
                  className='w-full md:w-1/3'
                  type='submit'
                  disabled={form.isSubmitting}
                >
                  {form.isSubmitting ? 'Aguarde...' : 'Atualizar'}
                </Button>
              </div>
            </form>
            <div className='py-8'>
              <Title text='Segurança' />
              <form onSubmit={form.handleSubmit}>
                <div className='flex flex-col md:flex-row justify-between gap-4 mt-4'>
                  <Label className='w-full'>
                    <span>Senha Atual</span>
                    <Input
                      css='mt-1 border border-opacity-50'
                      type='text'
                      id='firstName'
                      valid={form.submitCount == 0 || !form.errors.firstName}
                      placeholder='Senha Atual'
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    {form.errors.firstName && (
                      <HelperText className='text-red-300'>
                        {form.errors.firstName}
                      </HelperText>
                    )}
                  </Label>

                  <Label className='w-full'>
                    <span>Nova Senha</span>
                    <Input
                      css='mt-1 border border-opacity-50 border-gray-200'
                      type='text'
                      id='lastName'
                      valid={!form.errors.lastName}
                      placeholder='Nova Senha'
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    {form.errors.lastName && (
                      <HelperText className='text-red-300'>
                        {form.errors.lastName}
                      </HelperText>
                    )}
                  </Label>
                  <Label className='w-full'>
                    <span>Confirme a Nova Senha</span>
                    <Input
                      css='mt-1 border border-opacity-50'
                      type='text'
                      id='firstName'
                      valid={form.submitCount == 0 || !form.errors.firstName}
                      placeholder='Confirme a Nova Senha'
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    {form.errors.firstName && (
                      <HelperText className='text-red-300'>
                        {form.errors.firstName}
                      </HelperText>
                    )}
                  </Label>
                </div>

                <div className='text-right mt-6'>
                  <Button
                    className='w-full md:w-1/3'
                    type='submit'
                    disabled={form.isSubmitting}
                  >
                    {form.isSubmitting ? 'Aguarde...' : 'Alterar Senha'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <Copyright />
      </div>
    </>
  )
}

export default Profile
