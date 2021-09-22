import React, { useState, useEffect, useContext } from 'react'
import { Button, Card, CardBody } from '@learn49/aura-ui'
import Link from 'next/link'
import { toast } from 'react-toastify'

import Loading from '../../../../components/Loading'

import Head from '../../../../elements/Head'
import Title from '../../../../elements/Title'

import { AccountContext } from '../../../../context/AccountContext'
import { useMutation, useUpload, useQuery } from '../../../../lib/graphql'

const GET_ACCOUNT_SETTINGS = `
  query {
    panelGetSettings {
      logo
    }
  }
`

const UPLOAD_HOME_PICTURE = `
  mutation panelUpdateLogo($file: Upload!) {
    panelUpdateLogo(file: $file) {
      id
    }
  }
`

const REMOVE_PICTURE = `
  mutation {
    panelRemoveLogo {
      id
    }
  }
`

const Text = () => {
  const account = useContext(AccountContext)
  const [isLoading, setLoading] = useState(false)
  const [isSaved, setSaved] = useState(false)
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  const { data } = useQuery(GET_ACCOUNT_SETTINGS)
  const [, upload] = useUpload(UPLOAD_HOME_PICTURE)
  const [, remove] = useMutation(REMOVE_PICTURE)

  useEffect(() => {
    if (data && data.panelGetSettings.logo) {
      setPreview(data?.panelGetSettings.logo)
    }
  }, [data])

  useEffect(async () => {
    if (!selectedFile) {
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = async (e) => {
    if (e.target.files || e.target.files.length !== 0) {
      setSaved(false)
      setSelectedFile(e.target.files[0])
    }
  }

  const onSaveImage = async () => {
    setLoading(true)
    const result = await upload({ file: selectedFile })
    if (result && result.panelUpdateLogo.id) {
      account.setAccount({ ...account, logo: preview })
      toast.success('Imagem Salva com Sucesso.')
      setSaved(true)
    }
    setLoading(false)
  }

  const removePicture = async () => {
    setLoading(true)
    const result = await remove()
    if (result && result.panelRemoveLogo.id) {
      account.setAccount({ ...account, logo: null })
      toast.success('Imagem Removida com Sucesso.')
      setSaved(false)
      setSelectedFile(null)
      setPreview(null)
    }
    setLoading(false)
  }

  return (
    <>
      <Head title='Alterar Logo do Aluno.Tv' />
      <div className='flex flex-col md:flex-row justify-between mt-4'>
        <Title text='Alterar Logo do Aluno.Tv' />
      </div>
      <div className='mb-8 mt-6'>
        <div className='sm:px-4 py-3 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800'>
          <div className='flex flex-col items-center justify-center max-w-lg mx-auto'>
            <div
              className='w-64 h-28 bg-gray-300 bg-center bg-cover rounded-lg shadow-md'
              style={{ backgroundImage: `url(${preview ?? ''})` }}
            ></div>
            {isLoading && (
              <div className='mt-10 px-1'>
                <Loading />
              </div>
            )}
            {!isLoading && (
              <div className='flex flex-col md:flex-row gap-4 mt-10 px-1'>
                {preview && (
                  <>
                    <span
                      className='bg-red-500 text-white text-center px-14 py-3 cursor-pointer rounded-lg dark:bg-red-400 hover:bg-red-600 dark:hover:bg-red-500'
                      size='large'
                      layout='outline'
                      onClick={removePicture}
                    >
                      Remover Imagem
                    </span>
                    {!isSaved && (
                      <span
                        className='bg-purple-800 text-white text-center px-14 py-3 cursor-pointer rounded-lg dark:bg-purple-600 hover:bg-purple-900 dark:hover:bg-purple-700'
                        size='large'
                        layout='outline'
                        onClick={onSaveImage}
                      >
                        Salvar Imagem
                      </span>
                    )}
                  </>
                )}
                <input
                  id='uploadImage'
                  accept='image/*'
                  className='hidden'
                  type='file'
                  name='file'
                  onChange={onSelectFile}
                />
                <label
                  htmlFor='uploadImage'
                  className='cursor-pointer px-14 py-3 text-center rounded-lg bg-purple-500 text-white  dark:bg-purple-400 hover:bg-purple-600 dark:hover:bg-purple-500'
                >
                  Alterar Imagem
                </label>
                <Link href='/app/admin/configs'>
                  <Button
                    className='px-14 dark:bg-white hover:dark:bg-gray-300'
                    size='large'
                    layout='outline'
                  >
                    Voltar
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <Card colored className='bg-purple-200 mb-4 mt-10 text-gray-600'>
            <CardBody>
              <p className='mb-2 font-semibold uppercase'>Instruções:</p>
              <p>
                - <strong>Formatos suportados:</strong> JPEG (*.jpg), GIF
                (*.gif), PNG (*.png) ou BMP (*.bmp).
              </p>
              <p className='mt-3'>- Tamanho máximo: 2MB.</p>
              <p className='mt-3'>
                - A imagem será redimensionada para 250x100px.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Text
