import React, { useEffect } from 'react'
import { Button, Input, Label, HelperText, Select } from '@learn49/aura-ui'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Loading from '../../../../../components/Loading'

import Head from '../../../../../elements/Head'
import Title from '../../../../../elements/Title'

import { useMutation, useQuery } from '../../../../../lib/graphql'

interface FormValues {
  name: string
  email: string
  active: string
}

const GET_ADMIN_DATA = (id: number) => `
  query panelGetAdminById{
    panelGetAdminById(id: ${id}){
      id
      name
      email
      active
    }
  }
`

const EDIT_ADMIN = `
  mutation panelUpdateAdmin($id: Int!, $name: String!, $email: String!, $active: Boolean!) {
    panelUpdateAdmin(input: {
        id: $id,
        name: $name
        email: $email
        active: $active
    }) {
        name
    }
}
`

const Schema = Yup.object().shape({
  name: Yup.string().required('Preenchimento Obrigatório'),
  email: Yup.string()
    .email('Preencha um Email Válido')
    .required('Preenchimento Obrigatório')
})

const Edit = () => {
  const router = useRouter()
  const { data } = useQuery(GET_ADMIN_DATA(Number(router.query?.id)), {
    autoRevalidate: false
  })
  const [, edit] = useMutation(EDIT_ADMIN)

  const form = useFormik({
    initialValues: {
      name: data?.panelGetAdminById.name,
      email: data?.panelGetAdminById.email,
      active: data?.panelGetAdminById.active
    },
    validationSchema: Schema,
    onSubmit: async (values: FormValues) => {
      const input = {
        id: data.panelGetAdminById.id,
        name: values.name,
        email: values.email,
        active: values.active
      }
      const result = await edit(input)
      if (result && result?.panelUpdateAdmin) {
        router.push('/app/admin/admins')
      } else {
        toast.error('Erro ao Salvar.')
      }
    }
  })

  const handleSelect = (evt) => {
    form.setFieldValue('active', evt.target.value == 'true')
  }

  useEffect(() => {
    if (data) {
      form.setFieldValue('name', data.panelGetAdminById.name)
      form.setFieldValue('email', data.panelGetAdminById.email)
      form.setFieldValue('active', data.panelGetAdminById.active)
    }
  }, [data])

  return (
    <>
      <Head title='Editar Administrador' />
      <div className='flex flex-col md:flex-row justify-between mt-4'>
        <Title text='Editar Administrador' />
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
                defaultValue={data?.panelGetAdminById.name}
                placeholder={
                  data?.panelGetAdminById.name ??
                  'Digite o Nome do Administrador'
                }
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
                className='mt-1'
                id='email'
                disabled={form.isSubmitting}
                valid={!form.errors.email}
                defaultValue={data?.panelGetAdminById.email}
                placeholder={
                  data?.panelGetAdminById.email ??
                  'Digite o Email do Administrador'
                }
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
              <span>Ativo:</span>
              <Select
                className='mt-1'
                value={form.values.active}
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
                <Link href='/app/admin/admins'>
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

export default Edit
