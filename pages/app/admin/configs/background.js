import React, { useState, useEffect, useContext } from 'react'
import { Button, Card, CardBody, Select } from '@learn49/aura-ui'
import Link from 'next/link'
import { toast } from 'react-toastify'

import Loading from '../../../../components/Loading'

import Head from '../../../../elements/Head'
import Title from '../../../../elements/Title'

import { AccountContext } from '../../../../context/AccountContext'
import { useMutation, useQuery, useUpload } from '../../../../lib/graphql'

const GET_ACCOUNT_SETTINGS = `
  query {
    panelGetSettings {
      background
    }
  }
`

const UPLOAD_BACKGROUND = `
  mutation panelUpdateBackground($file: Upload!, $config: String!) {
    panelUpdateBackground(file: $file, config: $config) {
      id
    }
  }
`

const REMOVE_BACKGROUND = `
  mutation {
    panelRemoveBackground {
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
  const [config, setConfig] = useState('bg-no-repeat bg-cover')

  const { data } = useQuery(GET_ACCOUNT_SETTINGS)
  const [, upload] = useUpload(UPLOAD_BACKGROUND)
  const [, remove] = useMutation(REMOVE_BACKGROUND)

  useEffect(() => {
    if (data && data.panelGetSettings.background) {
      const { url, config } = JSON.parse(data.panelGetSettings.background)
      setPreview(url)
      setConfig(config)
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

  const handleChangeConfig = (e) => {
    setConfig(e.target.value)
  }

  const onSaveImage = async () => {
    setLoading(true)
    const result = await upload({ file: selectedFile, config })
    if (result && result.panelUpdateBackground.id) {
      // TODO: Api deve retornar a URL salva
      const background = JSON.stringify({ file: '', config })
      account.setAccount({ ...account, background })
      toast.success('Imagem Salva com Sucesso.')
      setSelectedFile(null)
      setSaved(true)
    }
    setLoading(false)
  }

  const removePicture = async () => {
    setLoading(true)
    const result = await remove()
    if (result && result?.panelRemoveBackground.id) {
      account.setAccount({ ...account, background: null })
      toast.success('Imagem Removida com Sucesso.')
      setSaved(false)
      setSelectedFile(null)
      setPreview(null)
      setConfig('bg-no-repeat bg-cover')
    }
    setLoading(false)
  }

  return (
    <>
      <Head title='Alterar Fundo do Aluno.Tv' />
      <div className='flex flex-col md:flex-row justify-between mt-4'>
        <Title text='Alterar Fundo do Aluno.Tv' />
      </div>
      <div
        className={`mb-8 mt-6 bg-center rounded-lg ${config} `}
        style={{ backgroundImage: `url(${preview ?? ''})` }}
      >
        <div className='sm:px-4 py-3 rounded-lg shadow-md'>
          <div className='flex flex-col items-center justify-center max-w-lg mx-auto'>
            {isLoading && (
              <div className='mt-10 px-1'>
                <Loading />
              </div>
            )}
            {!isLoading && preview && selectedFile && (
              <Card colored className='bg-purple-200 mt-5 text-gray-600'>
                <CardBody className='flex flex-col gap-2'>
                  <p className='font-semibold'>Repetir Fundo:</p>
                  <Select
                    name='config'
                    value={config}
                    onChange={handleChangeConfig}
                    onBlur={handleChangeConfig}
                  >
                    <option value={'bg-no-repeat bg-cover'}>
                      Não Repetir (Esticar)
                    </option>
                    <option value={'bg-repeat-y'}>Repetir na Vertical</option>
                    <option value={'bg-repeat-x'}>Repetir na Horizontal</option>
                    <option value={'bg-repeat'}>
                      Repetir Imagem (Horizontal e Vertical)
                    </option>
                  </Select>
                  {!isSaved && (
                    <span
                      className='bg-purple-800 w-full text-white text-center px-14 py-3 cursor-pointer rounded-lg dark:bg-purple-600 hover:bg-purple-900 dark:hover:bg-purple-700'
                      onClick={onSaveImage}
                    >
                      Salvar Imagem
                    </span>
                  )}
                </CardBody>
              </Card>
            )}
            {!isLoading && (
              <div className='flex flex-col md:flex-row gap-4 mt-5 px-1'>
                {preview && (
                  <span
                    className='bg-red-500 text-white text-center px-14 py-3 cursor-pointer rounded-lg dark:bg-red-400 hover:bg-red-600 dark:hover:bg-red-500'
                    size='large'
                    layout='outline'
                    onClick={removePicture}
                  >
                    Remover Imagem
                  </span>
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
                    className='px-14 bg-white hover:dark:bg-gray-300'
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
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Text
