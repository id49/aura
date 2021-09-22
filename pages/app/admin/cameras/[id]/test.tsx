import React from 'react'
import { Button } from '@learn49/aura-ui'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import Head from '../../../../../elements/Head'
import Title from '../../../../../elements/Title'
import Loading from '../../../../../components/Loading'

import { useQuery } from '../../../../../lib/graphql'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

const GET_CAMERA_DATA = (id: number) => `
  query panelGetCameraById{
    panelGetCameraById(id: ${id}){
      name
      friendlyName
      url
    }
    panelGetPlayerUrlById(id: ${id}){
      url
    }
  }
`
const Test = () => {
  const router = useRouter()
  const { data } = useQuery(
    GET_CAMERA_DATA(parseInt(router.query.id.toString()))
  )

  if (!data) {
    return (
      <div className='flex h-64 items-center'>
        <Loading />
      </div>
    )
  }

  return (
    <>
      <Head title='Testar Câmera' />
      <div className='flex flex-col md:flex-row justify-between mt-4'>
        <Title text={data?.panelGetCameraById.name} />
        <span>
          <Link href='/app/admin/cameras'>
            <Button block>Voltar</Button>
          </Link>
        </span>
      </div>
      <p className='text-gray-400 text-sm mb-1 mt-4'>
        Nome amigável: {data?.panelGetCameraById.friendlyName}
      </p>
      <p className='text-gray-400 text-sm mb-4'>
        URL: {data?.panelGetCameraById.url}
      </p>
      <div className='mb-8 mt-2'>
        <ReactPlayer
          url={`${data?.panelGetPlayerUrlById.url}`}
          controls={true}
          playing={true}
          muted={true}
          width={'100%'}
          height={'auto'}
        />
      </div>
    </>
  )
}

export default Test
