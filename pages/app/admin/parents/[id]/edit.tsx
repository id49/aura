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

const GET_PARENT_DATA = (id: number) => `
  query panelGetParentById{
    panelGetParentById(id: ${id}){
      id
      name
      email
      active
    }
  }
`

const EDIT_PARENT = `
  mutation panelUpdateParent($id: Int!, $name: String!, $email: String!, $active: Boolean!) {
    panelUpdateParent(input: {
        id: $id,
        name: $name,
        email: $email,
        active: $active
    }) {
        id
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
  const { data } = useQuery(GET_PARENT_DATA(Number(router.query.id)), {
    autoRevalidate: false
  })
  const [, edit] = useMutation(EDIT_PARENT)

  const form = useFormik({
    initialValues: {
      name: data?.panelGetParentById.name,
      email: data?.panelGetParentById.email,
      active: 'sim'
    },
    validationSchema: Schema,
    onSubmit: async (values: FormValues) => {
      const input = {
        id: data.panelGetParentById.id,
        name: values.name,
        email: values.email,
        active: values.active
      }
      const result = await edit(input)
      if (result && result?.panelUpdateParent) {
        router.push('/app/admin/parents')
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
      form.setFieldValue('name', data.panelGetParentById.name)
      form.setFieldValue('email', data.panelGetParentById.email)
      form.setFieldValue('active', data.panelGetParentById.active)
    }
  }, [data])

  return (
    <>
      <Head title='Editar Responsável' />
      <div className='flex flex-col md:flex-row justify-between mt-4'>
        <Title text='Editar Responsável' />
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
                defaultValue={data?.panelGetParentById.name}
                placeholder={
                  data?.panelGetParentById.name ??
                  'Digite o Nome do Responsável'
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
                css='mt-1'
                id='email'
                disabled={form.isSubmitting}
                valid={!form.errors.email}
                defaultValue={data?.panelGetParentById.email}
                placeholder={
                  data?.panelGetParentById.email ??
                  'Digite o Email do Responsável'
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
                css='mt-1'
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
                <Button className='px-14' size='large' type='submit'>
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

export default Edit
