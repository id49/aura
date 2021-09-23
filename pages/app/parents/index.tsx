import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import dynamic from 'next/dynamic'
import { AccountContext } from '../../../context/AccountContext'

import Title from '../../../elements/Title'
import Head from '../../../elements/Head'

import { useQuery } from '../../../lib/graphql'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

// const GET_SCHEDULES = `
//   query {
//     getAllSchedules{
//       hour
//       classrooms {
//         id
//         name
//         schedules {
//           id
//           name
//           startHour
//           endHour
//           cameras {
//             id
//             name
//           }
//         }
//       }
//     }
//   }
// `

const GET_CAMERA = (scheduleId, cameraId) => `
query {
  getCamera(schedule: ${scheduleId}, camera: ${cameraId})
}`

const Camera = ({ schedule, camera }) => {
  // url={`${data?.panelGetPlayerUrlById.url}`}
  const { data } = useQuery(GET_CAMERA(schedule, camera), {
    refreshInterval: 60 * 1000
  })
  if (!data) {
    return <p>Carregando...</p>
  }
  if (data.getCamera === '') {
    return <p>Seu acesso a essa câmera terminou.</p>
  }
  const url = data.getCamera
  return (
    <ReactPlayer
      url={url}
      controls={true}
      playing={true}
      muted={true}
      width={'100%'}
      height={'auto'}
      className='rounded shadow-lg'
    />
  )
}

const ParentsIndex = () => {
  const router = useRouter()
  const account = useContext(AccountContext)

  return (
    <>
      <Head title={`${account.name} - App`} />
      <div className='flex flex-col justify-center items-center mt-10'>
        {(!router.query.s || !router.query.c) && (
          <>
            {account.homeImage && (
              <div
                className='h-64 w-full mx-auto rounded-lg bg-contain bg-no-repeat bg-center'
                style={{ backgroundImage: `url(${account.homeImage})` }}
              ></div>
            )}
            {/* //TODO: forçar trocar senha */}
            <div className='mt-4 mb-6'>
              <Title text={account.name} />
            </div>
          </>
        )}
        {router.query.s && router.query.c && (
          <Camera schedule={router.query.s} camera={router.query.c} />
        )}
      </div>
    </>
  )
}

export default ParentsIndex
