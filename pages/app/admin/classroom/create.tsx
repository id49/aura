import React from 'react'
import { Button, Input, Label, HelperText, Textarea } from '@learn49/aura-ui'
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
  description: string
}

const CREATE_CLASSROOM = `
mutation panelCreateClass($name: String!, $description: String!) {
  panelCreateClass(input: {
      name: $name,
      description: $description
  }) {
    name
  }
}`

const Schema = Yup.object().shape({
  name: Yup.string().required('Preenchimento Obrigatório'),
  description: Yup.string().required('Preenchimento Obrigatório')
})

const Create = () => {
  const router = useRouter()
  const [classroom, create] = useMutation(CREATE_CLASSROOM)

  const form = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
    validationSchema: Schema,
    onSubmit: async (values: FormValues) => {
      const data = await create(values)
      if (data && data.panelCreateClass) {
        router.push('/app/admin/classroom')
      } else {
        toast.error('Ocorreu um Erro')
      }
    }
  })

  return (
    <>
      <Head title='Criar Nova Turma' />
      <div className='flex flex-col md:flex-row justify-between mt-4'>
        <Title text='Criar Nova Turma' />
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
                placeholder='Qual será o nome da Turma?'
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
              <span>Descrição:</span>
              <Textarea
                css='mt-1'
                rows={3}
                id='description'
                disabled={form.isSubmitting}
                valid={!form.errors.description}
                placeholder='Informe uma descrição para a turma'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.description && form.touched.description && (
                <HelperText className='text-red-300'>
                  {form.errors.description}
                </HelperText>
              )}
            </Label>
            {form.isSubmitting && <Loading />}
            {!form.isSubmitting && (
              <div className='flex flex-col md:flex-row gap-4 mt-4'>
                <Button className='px-14' size='large' type={'submit'}>
                  Salvar
                </Button>
                <Link href='/app/admin/classroom'>
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
