import React from 'react'
import { Button, Input, Label, HelperText } from '@learn49/aura-ui'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Loading from '../../../../components/Loading'

import Head from '../../../../elements/Head'
import Title from '../../../../elements/Title'

import { useMutation } from '../../../../lib/graphql'

interface FormValues {
  name: string
  friendlyName: string
  url: string
}

const CREATE_CAMERA = `
mutation panelCreateCamera($name: String!, $friendlyName: String!, $url: String!) {
  panelCreateCamera(input: {
      name: $name,
      friendlyName: $friendlyName, 
      url: $url
  }) {
    name
  }
}`

const Schema = Yup.object().shape({
  name: Yup.string().required('Preenchimento Obrigatório'),
  friendlyName: Yup.string().required('Preenchimento Obrigatório'),
  url: Yup.string()
    .min(15, 'Url deve ser maior do que 15 caracteres')
    .required('Preenchimento Obrigatório')
})

const Create = () => {
  const router = useRouter()
  const [camera, create] = useMutation(CREATE_CAMERA)

  const form = useFormik({
    initialValues: {
      name: '',
      friendlyName: '',
      url: ''
    },
    validationSchema: Schema,
    onSubmit: async (values: FormValues) => {
      const data = await create(values)
      if (data && data.panelCreateCamera) {
        router.push('/app/admin/cameras')
      } else {
        toast.error('Ocorreu um Erro')
      }
    }
  })

  return (
    <>
      <Head title='Criar Nova Câmera' />
      <div className='flex flex-col md:flex-row justify-between mt-4'>
        <Title text='Criar Nova Câmera' />
      </div>
      <div className='mb-8 mt-6'>
        <form onSubmit={form.handleSubmit}>
          <div className='px-4 py-3 mb-8 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800'>
            <Label>
              <span>Nome:</span>
              <Input
                className='mt-1 rounded'
                id='name'
                disabled={form.isSubmitting}
                valid={!form.errors.name}
                placeholder='Qual será o nome da Câmera?'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.name && form.touched.name && (
                <HelperText className='text-red-300'>
                  {form.errors.name}
                </HelperText>
              )}
            </Label>
            <HelperText className='text-gray-500'>
              O nome irá facilitar a identificação deste aparelho. Pode ser
              definido o número de patrimônio, por exemplo.
            </HelperText>
            <Label className='mt-3'>
              <span>Nome amigável:</span>
              <Input
                className='mt-1'
                id='friendlyName'
                disabled={form.isSubmitting}
                valid={!form.errors.friendlyName}
                placeholder='Insira um Nome Amigável'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.friendlyName && form.touched.friendlyName && (
                <HelperText className='text-red-300'>
                  {form.errors.friendlyName}
                </HelperText>
              )}
            </Label>
            <HelperText className='text-gray-500'>
              O nome será exibido nas interfaces (TV, Web e Mobile) para os
              responsáveis. Ex: Berçário, Pátio.
            </HelperText>

            <Label className='mt-3'>
              <span>URL RTSP:</span>
              <Input
                className='mt-1'
                id='url'
                disabled={form.isSubmitting}
                valid={!form.errors.url}
                placeholder='Informe a URL RTSP'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.url && form.touched.url && (
                <HelperText className='text-red-300'>
                  {form.errors.url}
                </HelperText>
              )}
            </Label>
            <HelperText className='text-gray-500'>
              A URL do Stream RTSP da câmera é uma informação encontrada no
              manual da mesma.
              <br />
              Pode-se utilizar o IP externo da sua rede (para descobrir seu ip
              externo basta acessar www.meuip.com.br) ou seu dns.
              <br />
              Exemplo:
              <ul className='list-inside bg-rose-200 list-disc'>
                <li>
                  Utilizando ip externo:
                  rtsp://189.107.93.18/cam/realmonitor?channel=1&subtype=0.
                </li>
                <li>
                  Caso a câmera necessite de autenticação para visualizar o
                  stream:
                  rtsp://admin:admin@189.107.93.18:554/cam/realmonitor?channel=1&subtype=0
                </li>
                <li>
                  Utilizando dns:
                  rtsp://admin:admin@exemplo.dyndns.info:554/cam/realmonitor?channel=1&subtype=0
                </li>
              </ul>
            </HelperText>
            {form.isSubmitting && <Loading />}
            {!form.isSubmitting && (
              <div className='flex flex-col md:flex-row gap-4 mt-4'>
                <Button className='px-14' size='large' type={'submit'}>
                  Salvar
                </Button>
                <Link href='/app/admin/cameras'>
                  <Button className='px-10' size='large' layout='outline'>
                    Cancelar
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  )
}

export default Create
