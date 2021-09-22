import React from 'react'
import { Button, Input, Label, HelperText } from '@learn49/aura-ui'
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
  password: string
  confirm: string
}

const EDIT_PARENT_ADMIN = `
  mutation panelUpdateParent($id: Int!, $password: String) {
    panelUpdateParent(input: {
        id: $id,
        password: $password
    }) {
        id
    }
  }
`

const GET_PARENT = (id: string) => `
  query{
    panelGetParentById(id: ${id}){
      id
      name
    }
  }
`

const Schema = Yup.object().shape({
  password: Yup.string()
    .min(5, 'Senha deve ter no mínimo 5 caracteres')
    .required('Preenchimento Obrigatório'),
  confirm: Yup.string().test('', 'Senhas não estão idênticas', (value, ctx) => {
    return ctx.parent.password === value
  })
})

const Create = () => {
  const router = useRouter()
  const [, edit] = useMutation(EDIT_PARENT_ADMIN)
  const { data } = useQuery(GET_PARENT(router.query.id.toString()))

  const form = useFormik({
    initialValues: {
      password: '',
      confirm: ''
    },
    validationSchema: Schema,
    onSubmit: async (values: FormValues) => {
      const input = {
        id: Number(router.query.id),
        password: values.password
      }
      const result = await edit(input)
      if (result && result?.panelUpdateParent) {
        router.push('/app/admin/parents')
      } else {
        toast.error('Tivemos um problema ao salvar.')
      }
    }
  })

  return (
    <>
      <Head title='Alterar Senha' />
      <div className='mt-4'>
        <Title
          text='Alterar Senha'
          subText={`Responsável: ${data?.panelGetParentById?.name}`}
        />
      </div>
      <div className='mb-8 mt-6'>
        <form onSubmit={form.handleSubmit}>
          <div className='px-4 py-3 mb-8 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800'>
            <Label className='mt-3'>
              <span>Senha:</span>
              <Input
                className='mt-1'
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
                className='mt-1'
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
