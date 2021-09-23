import React from 'react'
import { Button, Input, Label, HelperText, Select } from '@learn49/aura-ui'
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
  email: string
  password: string
  confirm: string
  forcePasswordChange: boolean
}

const CREATE_PARENT = `
  mutation panelCreateParent($name: String!, $email: String!, $password: String!, $forcePasswordChange: Boolean!) {
    panelCreateParent(input: {
      name: $name,
      email: $email, 
      password: $password
      forcePasswordChange: $forcePasswordChange
    }) {
      name
    }
  }
`

const Schema = Yup.object().shape({
  name: Yup.string().required('Preenchimento Obrigatório'),
  email: Yup.string()
    .email('Preencha um Email Válido')
    .required('Preenchimento Obrigatório'),
  password: Yup.string()
    .min(5, 'Senha deve ter no mínimo 5 caracteres')
    .required('Preenchimento Obrigatório'),
  confirm: Yup.string().test('', 'Senhas não estão idênticas', (value, ctx) => {
    return ctx.parent.password === value
  })
})

const Create = () => {
  const router = useRouter()
  const [, create] = useMutation(CREATE_PARENT)

  const form = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm: '',
      forcePasswordChange: true
    },
    validationSchema: Schema,
    onSubmit: async (values: FormValues) => {
      const input = {
        name: values.name,
        email: values.email,
        password: values.password,
        forcePasswordChange: values.forcePasswordChange
      }
      const data = await create(input)
      if (data && data.panelCreateParent) {
        router.push('/app/admin/parents')
      } else {
        toast.error('Erro: Usuário já existe.')
      }
    }
  })

  const handleSelect = (evt) => {
    form.setFieldValue('forcePasswordChange', evt.target.value == 'true')
  }

  return (
    <>
      <Head title='Criar Novo Responsável' />
      <div className='flex flex-col md:flex-row justify-between mt-4'>
        <Title text='Criar Novo Responsável' />
      </div>
      <div className='mb-8 mt-6'>
        <form onSubmit={form.handleSubmit}>
          <div className='px-4 py-3 mb-8 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800'>
            <Label>
              <span>Nome:</span>
              <Input
                css='mt-1 rounded'
                id='name'
                disabled={form.isSubmitting}
                valid={!form.errors.name}
                placeholder='Digite o Nome do Novo Responsável'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.name && form.touched.name && (
                <HelperText className='text-red-300'>
                  {form.errors.name}
                </HelperText>
              )}
            </Label>
            <Label className='mt-3'>
              <span>Email:</span>
              <Input
                css='mt-1'
                id='email'
                disabled={form.isSubmitting}
                valid={!form.errors.email}
                placeholder='Digite o Email do Novo Responsável'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.email && form.touched.email && (
                <HelperText className='text-red-300'>
                  {form.errors.email}
                </HelperText>
              )}
            </Label>
            <Label className='mt-3'>
              <span>Senha:</span>
              <Input
                css='mt-1'
                id='password'
                type='password'
                disabled={form.isSubmitting}
                valid={!form.errors.password}
                placeholder='Digite uma senha'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.password && form.touched.password && (
                <HelperText className='text-red-300'>
                  {form.errors.password}
                </HelperText>
              )}
            </Label>
            <Label className='mt-3'>
              <span>Confirmação de Senha:</span>
              <Input
                css='mt-1'
                id='confirm'
                type='password'
                disabled={form.isSubmitting}
                valid={!form.errors.confirm}
                placeholder='Confirme a senha'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.confirm && form.touched.confirm && (
                <HelperText className='text-red-300'>
                  {form.errors.confirm}
                </HelperText>
              )}
            </Label>
            <Label className='mt-3'>
              <span>Forçar Responsável a trocar a Senha de Acesso?</span>
              <Select
                css='mt-1'
                value={form.values.forcePasswordChange ? 'true' : 'false'}
                onChange={handleSelect}
                onBlur={handleSelect}
              >
                <option value={'true'}>Sim</option>
                <option value={'false'}>Não</option>
              </Select>
            </Label>
            {form.isSubmitting && <Loading />}
            {!form.isSubmitting && (
              <div className='flex flex-col md:flex-row gap-4 mt-4'>
                <Button className='px-14' size='large' type={'submit'}>
                  Salvar
                </Button>
                <Link href='/app/admin/parents'>
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
