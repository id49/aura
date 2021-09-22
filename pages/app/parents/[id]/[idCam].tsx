import React from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import Head from '../../../../elements/Head'
import Title from '../../../../elements/Title'
import Loading from '../../../../components/Loading'

import { useQuery } from '../../../../lib/graphql'

const ReactHlsPlayer = dynamic(() => import('react-player'), { ssr: false })

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
  const { data } = useQuery(GET_CAMERA_DATA(Number(router.query?.id)))

  if (!data) {
    return (
      <div className='flex h-64 items-center'>
        <Loading />
      </div>
    )
  }

  return (
    <>
      <Head title='Assistir' />
      <div className='flex flex-col md:flex-row justify-between mt-4'>
        <Title text={'data?.panelGetCameraById.name'} />
      </div>
      <div className='mb-8 mt-2'>
        <ReactHlsPlayer url={`${data?.panelGetPlayerUrlById.url}`} />
      </div>
    </>
  )
}

export default Test
