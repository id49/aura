import React, { useEffect } from 'react'
import {
  Button,
  Input,
  Label,
  HelperText,
  Select,
  Textarea
} from '@learn49/aura-ui'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Loading from '../../../../components/Loading'

import Head from '../../../../elements/Head'
import Title from '../../../../elements/Title'

import { useMutation, useQuery } from '../../../../lib/graphql'
import Waiting from '../../../../components/Waiting'

interface FormValues {
  configText: number
  textTitle: string
  textDescription: string
}

const GET_ACCOUNT_SETTINGS = `
  query {
    panelGetSettings {
      configText
      textTitle
      textDescription
    }
  }
`

const UPDATE_INITIAL_TEXT = `
  mutation panelUpdateInitialText($configText: Int!, $textTitle: String!, $textDescription: String!) {
      panelUpdateInitialText(input: { 
        configText: $configText,
        textTitle: $textTitle, 
        textDescription: $textDescription 
      }) {
        id
      }
    }
`

const Schema = Yup.object().shape({
  configText: Yup.string(),
  textTitle: Yup.string().when('configText', {
    is: '2',
    then: Yup.string().nullable().required('Preenchimento Obrigatório')
  }),
  textDescription: Yup.string().when('configText', {
    is: '2',
    then: Yup.string().required('Preenchimento Obrigatório')
  })
})

const Text = () => {
  const router = useRouter()
  const { data } = useQuery(GET_ACCOUNT_SETTINGS)
  const [, create] = useMutation(UPDATE_INITIAL_TEXT)

  const form = useFormik({
    initialValues: {
      configText: data?.configText?.toString() ?? 0,
      textTitle: data?.textTitle ?? '',
      textDescription: data?.textDescription ?? ''
    },
    validationSchema: Schema,
    onSubmit: async (values: FormValues) => {
      const input = values
      input.configText = Number(values.configText)
      if (values.configText !== 2) {
        input['textTitle'] = ''
        input['textDescription'] = ''
      }
      const result = await create(input)
      if (result && result.panelUpdateInitialText) {
        toast.success('Configurações Salvas com Sucesso.')
        router.push('/app/admin/configs')
      } else {
        toast.error('Ocorreu um erro ao Salvar')
      }
    }
  })

  useEffect(() => {
    if (data) {
      form.setFieldValue(
        'configText',
        data.panelGetSettings.configText.toString()
      )
      form.setFieldValue('textTitle', data.panelGetSettings.textTitle ?? '')
      form.setFieldValue(
        'textDescription',
        data.panelGetSettings.textDescription ?? ''
      )
    }
  }, [data])

  return (
    <>
      <Head title='Alterar Textos Iniciais do Aluno.Tv' />
      <div className='flex flex-col md:flex-row justify-between mt-4'>
        <Title text='Alterar Textos Iniciais do Aluno.Tv' />
      </div>
      {!data && <Waiting />}
      {data && data.panelGetSettings && (
        <div className='mb-8 mt-6'>
          <form onSubmit={form.handleSubmit}>
            <div className='px-4 py-3 mb-8 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800'>
              <Select
                css='mt-1'
                name='configText'
                value={form.values.configText}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              >
                <option value={'0'}>Sem Texto Inicial</option>
                <option value={'1'}>Texto Inicial Padrão</option>
                <option value={'2'}>Personalizado</option>
              </Select>
              {form.values.configText === '2' && (
                <>
                  <Label className='mt-3'>
                    <span>Título:</span>
                    <Input
                      css='mt-1 rounded'
                      id='textTitle'
                      disabled={form.isSubmitting}
                      valid={!form.errors.textTitle}
                      defaultValue={form.values.textTitle}
                      placeholder='Qual será o Título?'
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    {form.errors.textTitle && (
                      <HelperText className='text-red-300'>
                        {form.errors.textTitle}
                      </HelperText>
                    )}
                  </Label>
                  <Label className='mt-3'>
                    <span>Descrição:</span>
                    <Textarea
                      css='mt-1'
                      rows={3}
                      id='textDescription'
                      disabled={form.isSubmitting}
                      valid={!form.errors.textDescription}
                      defaultValue={form.values.textDescription}
                      placeholder='Informe uma descrição'
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    {form.errors.textDescription && (
                      <HelperText className='text-red-300'>
                        {form.errors.textDescription}
                      </HelperText>
                    )}
                  </Label>
                </>
              )}
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
