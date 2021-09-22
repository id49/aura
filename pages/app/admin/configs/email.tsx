import React, { useEffect } from 'react'
import { Button, Input, Label, HelperText } from '@learn49/aura-ui'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Loading from '../../../../components/Loading'
import Waiting from '../../../../components/Waiting'

import Head from '../../../../elements/Head'
import Title from '../../../../elements/Title'

import { useMutation, useQuery } from '../../../../lib/graphql'

interface FormValues {
  emailSettings: string
  nameEmail: string
  configUrl?: string
}

const GET_ACCOUNT_SETTINGS = `
  query {
    panelGetSettings {
      emailSettings
      nameEmail
      configUrl
    }
  }
`

const UPDATE_EMAIL_SETTINGS = `
  mutation panelUpdateEmailSettings($emailSettings: String!, $nameEmail: String!, $configUrl: String!) {
      panelUpdateEmailSettings(input: { 
        emailSettings: $emailSettings,
        nameEmail: $nameEmail, 
        configUrl: $configUrl 
      }) {
        id
      }
    }
`

const Schema = Yup.object().shape({
  emailSettings: Yup.string()
    .email('Preencha um Email Válido')
    .required('Preenchimento Obrigatório'),
  nameEmail: Yup.string().required('Preenchimento Obrigatório'),
  configUrl: Yup.string()
})

const Text = () => {
  const router = useRouter()
  const { data } = useQuery(GET_ACCOUNT_SETTINGS)
  const [, create] = useMutation(UPDATE_EMAIL_SETTINGS)

  const form = useFormik({
    initialValues: {
      emailSettings: data?.emailSettings ?? '',
      nameEmail: data?.nameEmail ?? '',
      configUrl: data?.configUrl ?? ''
    },
    validationSchema: Schema,
    onSubmit: async (values: FormValues) => {
      const result = await create(values)
      if (result && result.panelUpdateEmailSettings) {
        toast.success('Configurações Salvas com Sucesso.')
        router.push('/app/admin/configs')
      } else {
        toast.error('Ocorreu um erro ao Salvar')
      }
    }
  })

  useEffect(() => {
    if (data) {
      form.setFieldValue('emailSettings', data.panelGetSettings.emailSettings)
      form.setFieldValue('nameEmail', data.panelGetSettings.nameEmail ?? '')
      form.setFieldValue('configUrl', data.panelGetSettings.configUrl ?? '')
    }
  }, [data])

  return (
    <>
      <Head title='Configurações de Email do Aluno.Tv' />
      <div className='flex flex-col md:flex-row justify-between mt-4'>
        <Title text='Configurações de Email do Aluno.Tv' />
      </div>
      {!data && <Waiting />}
      {data && data.panelGetSettings && (
        <div className='mb-8 mt-6'>
          <form onSubmit={form.handleSubmit}>
            <div className='px-4 py-3 mb-8 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800'>
              <Label className='mt-3'>
                <span>Email utilizado como remetente:</span>
                <Input
                  className='mt-1 rounded'
                  id='emailSettings'
                  disabled={form.isSubmitting}
                  valid={!form.errors.emailSettings}
                  defaultValue={form.values.emailSettings}
                  placeholder='Informe o Email'
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                {form.errors.emailSettings && (
                  <HelperText className='text-red-300'>
                    {form.errors.emailSettings}
                  </HelperText>
                )}
              </Label>
              <HelperText className='text-gray-500'>
                Este e-mail será utilizado como remetente para os e-mails
                enviados pelo Aluno.TV
              </HelperText>
              <Label className='mt-3'>
                <span>Nome utilizado para envio dos E-mails:</span>
                <Input
                  className='mt-1 rounded'
                  id='nameEmail'
                  disabled={form.isSubmitting}
                  valid={!form.errors.nameEmail}
                  defaultValue={form.values.nameEmail}
                  placeholder='Informe um nome válido'
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                {form.errors.nameEmail && (
                  <HelperText className='text-red-300'>
                    {form.errors.nameEmail}
                  </HelperText>
                )}
              </Label>
              <HelperText className='text-gray-500'>
                Este nome será utilizado como parte do Titulo dos e-mails
                enviados pelo Aluno.TV
              </HelperText>
              <Label className='mt-3'>
                <span>Endereço de Acesso ao Sistema:</span>
                <Input
                  className='mt-1'
                  id='configUrl'
                  disabled={form.isSubmitting}
                  valid={!form.errors.configUrl}
                  defaultValue={form.values.configUrl}
                  placeholder='Informe um endereço válido'
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                {form.errors.configUrl && (
                  <HelperText className='text-red-300'>
                    {form.errors.configUrl}
                  </HelperText>
                )}
              </Label>
              <HelperText className='text-gray-500'>
                Se o Aluno.TV não for acessado através do endereço{' '}
                <strong>www.aluno.tv/teste</strong> favor colocá-lo neste
                espaço.
              </HelperText>
              {form.isSubmitting && <Loading />}
              {!form.isSubmitting && (
                <div className='flex flex-col md:flex-row gap-4 mt-4'>
                  <Button className='px-14' size='large' type={'submit'}>
                    Salvar
                  </Button>
                  <Link href='/app/admin/configs'>
                    <Button className='px-10' size='large' layout='outline'>
                      Cancelar
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default Text
