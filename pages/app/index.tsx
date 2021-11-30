import React, { useContext } from 'react'
import { useQuery } from 'urql'
import Link from 'next/link'
import Image from 'next/image'

import { AccountContext } from '@/context/AccountContext'
import Title from '@/elements/Title'
import Head from '@/elements/Head'
import Support from '@/components/Dashboard/Support'
import Copyright from '@/components/Copyright'
import CarouselDest from '@/components/Dashboard/Carousel'
import fullCourses from '@/data/fullCourses.json'

const HOME_QUERY = `
  query getHome($accountId: String!, $limit: Float!, $offset: Float!) {
    getCourses(accountId: $accountId, limit: $limit, offset: $offset) {
      id
      title
      description
      courseVersionId
      defaultVersion
      progress
      versions
      latestVersion
      labels {
        label,
        isPrivate
      }
    }
    getLastCourseAccess(accountId: $accountId) {
      id
      courseId
      courseVersionId
      lessonId
      courseTitle
      moduleTitle
      lessonTitle
      lastAccess
    }
  }
`

const Dashboard = () => {
  const { id: accountId } = useContext(AccountContext)

  const [result] = useQuery({
    query: HOME_QUERY,
    requestPolicy: 'network-only',
    variables: {
      accountId,
      limit: 20,
      offset: 0
    }
  })
  const { data, fetching } = result

  if (fetching) {
    return null
  }

  return (
    <>
      <Head title='Dashboard' />
      <div
        className='bg-fixed bg-auto md:bg-cover bg-no-repeat bg-center'
        style={{
          backgroundImage: `url(${fullCourses[data?.getLastCourseAccess.courseId].image
            })`
        }}
      >
        <div className='flex flex-col lg:flex-row xl:container xl:mx-auto gap-6'>
          <div className='lg:ml-8 lg:w-1/2 py-20 lg:py-40'>
            <div className='bg-gray-800 px-4 h-72 flex flex-col justify-center text-white backdrop-filter backdrop-blur-lg bg-opacity-30'>
              {Object.keys(data).length > 0 &&
                Object.keys(fullCourses).includes(
                  data?.getLastCourseAccess?.courseId
                ) && (
                  <>
                    {/* <span className='text-sm'>Curso Completo</span> */}
                    <div className='text-4xl font-extrabold'>
                      {[
                        data?.getLastCourseAccess.courseTitle,
                        data?.getLastCourseAccess.moduleTitle
                      ]
                        .filter((x) => x)
                        .join(' - ')}
                    </div>
                    <p className='text-gray-200 mt-2'>
                      Assunto: {data?.getLastCourseAccess.lessonTitle}
                    </p>
                    <div className='py-2'>
                      <button className='w-full px-6 py-4 bg-yellow-400 hover:bg-yellow-500 text-right font-medium uppercase rounded'>
                        Continue assistindo
                      </button>
                    </div>
                  </>
                )}
            </div>
          </div>
          <div className='w-full  lg:w-1/2 text-white flex flex-col self-end mb-4'>
            <div className='text-2xl uppercase font-extrabold border-b-4 text-yellow-300 shadow-sm'>
              Cursos Completos
            </div>
            <CarouselDest
              courseOne={Object.values(fullCourses)[0]}
              courseTwo={Object.values(fullCourses)[1]}
              courseThree={Object.values(fullCourses)[2]}
            />
          </div>
        </div>
      </div>
      <div className='container px-2 py-4 mx-auto'>
        <Title
          text='Especialize-se!'
          subText='Cursos específicos e direto ao ponto'
        />
        <div className='py-4 grid lg:grid-cols-3 gap-10'>
          {Object.values(fullCourses)
            .filter((_, id) => id > 2)
            .map((each, i) => {
              // const labelList = each?.labels.filter((e) => !e.isPrivate)
              return (
                <Link
                  key={i}
                  href={`/app/courses/${each.id}/version/${each.version}`}
                >
                  <a>
                    <div className='bg-cool-gray-800 h-40 flex items-center justify-center relative'>
                      <Image
                        src={each.image}
                        alt={each.title}
                        objectFit='cover'
                        layout='fill'
                      />
                    </div>
                    {/* {labelList.length > 0 &&
                    labelList.map((label) => (
                      <div className='flex gap-4 items-center py-2'>
                        <p className='px-2 text-sm bg-yellow-400 rounded-sm text-white uppercase'>
                          Label
                        </p>
                        <p>Label</p>
                      </div>
                    ))} */}
                    <div className='flex flex-col gap-1 py-2'>
                      <div className='font-bold text-gray-600'>
                        {each.title}
                      </div>
                      <div className='text-sm font-mono text-gray-500'>
                        {each.description}
                      </div>
                    </div>
                  </a>
                </Link>
              )
            })}
        </div>

        <Support />
        <Copyright />
      </div>
    </>
  )
}

export default Dashboard
