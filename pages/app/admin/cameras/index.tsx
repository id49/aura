import React from 'react'
import { Button, Input } from '@learn49/aura-ui'
import Link from 'next/link'

import TableContainer from '../../../../components/TableContainer/Cameras'
import CardWarning from '../../../../components/CardWarning'
import Loading from '../../../../components/Loading'

import Head from '../../../../elements/Head'
import Title from '../../../../elements/Title'

import { SearchIcon, VideoCamera } from '../../../../icons'
import { useQuery } from '../../../../lib/graphql'

const GET_ALL_CAMERAS = `
  query{
    panelGetCameras {
      id
      name
      friendlyName
      url
    }
  }
`
const Cameras = () => {
  const { data, revalidate } = useQuery(GET_ALL_CAMERAS)

  return (
    <>
      <Head title='Visualizar Câmeras' />
      <div className='flex flex-col md:flex-row justify-between mt-4'>
        <Title text='Câmeras' />
        <span>
          <Link href='cameras/create'>
            <Button block>Nova Câmera</Button>
          </Link>
        </span>
      </div>

      {false && (
        <div className='flex justify-center flex-1 lg:mr-32 text-purple-700 mt-6'>
          <div className='relative w-full max-w-xl focus-within:text-purple-500'>
            <div className='absolute inset-y-0 flex items-center pl-2'>
              <SearchIcon className='w-4 h-4' aria-hidden='true' />
            </div>
            <Input
              css='pl-8 text-gray-700 rounded'
              placeholder='Pesquisar por...'
              aria-label='Pesquisar'
            />
          </div>
        </div>
      )}

      <div className='mb-8 mt-6'>
        {!data && <Loading />}
        {data && data.panelGetCameras?.length === 0 && (
          <CardWarning text='Nenhuma Câmera Cadastrada.'>
            <VideoCamera className='w-5 h-5 text-white' aria-hidden='true' />
          </CardWarning>
        )}
        {data && data.panelGetCameras?.length > 0 && (
          <TableContainer data={data.panelGetCameras} revalidate={revalidate} />
        )}
      </div>
    </>
  )
}

export default Cameras
