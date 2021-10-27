import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from 'urql'
import { useRouter } from 'next/router'
import { Button } from '@learn49/aura-ui'

import { AccountContext } from '../../../../../../context/AccountContext'
import Head from '../../../../../../elements/Head'
import Title from '../../../../../../elements/Title'
import CoursesContent from '../../../../../../components/CoursesContent'
import fullCourses from '../../../../../../data/fullCourses.json'

const GET_COURSE = `
  query getCourse(
    $accountId: String!
    $courseId: String!
    $courseVersionId: String!
    $limit: Int
    $offset: Int
  ) {
    getCourse(accountId: $accountId, courseId: $courseId) {
      id
      title
      description
      progress
    }
    getCourseModules(
      accountId: $accountId
      courseVersionId: $courseVersionId
      limit: $limit
      offset: $offset
    ) {
      id
      title
      isActive
      baseId
      courseVersionId
      sortOrder
      lessons {
        id
        title
        accountId
        releaseOnDate
        completed
      }
    }
  }
`

const Courses = () => {
  const router = useRouter()
  const { id: accountId } = useContext(AccountContext)
  const { courseId, courseVersionId } = router.query

  const [result] = useQuery({
    query: GET_COURSE,
    variables: {
      accountId,
      courseId,
      courseVersionId,
      limit: 50,
      offset: 0
    }
  })
  const { data, fetching } = result

  if (fetching) {
    return (
      <div className='container px-6 py-6 mx-auto'>
        <Head title='Carregando dados...' />
        <Title text='Carregando dados...' />
      </div>
    )
  }

  return (
    <div className='container px-6 mx-auto'>
      <Head title='Fullstack Master' />
      <div className='inline-flex text-xs font-medium leading-5 rounded-full text-purple-700 bg-purple-200 mt-2 md:mt-6 py-1 px-6'>
        Explorador
      </div>
      <section className='mt-2 pb-6 flex flex-col md:flex-row md:gap-4 lg:gap-10'>
        <div className='order-1 md:order-none md:w-2/3'>
          <div className='py-3'>
            <p className='text-2xl font-extrabold text-gray-800'>
              {fullCourses[data.getCourse.id].title}
            </p>
          </div>
          <Title text='Descrição' />
          <p className='text-sm my-2'>{data.getCourse.description}</p>
          <pre>{JSON.stringify(data.getCourseModules, null, 2)}</pre>
        </div>
        <div className='order-0 md:order-none md:w-1/3'>
          <div
            className='flex items-center justify-center py-8'
            style={{
              backgroundColor: '#000024'
            }}
          >
            <Image
              width={220}
              height={70}
              src={fullCourses[data.getCourse.id].image}
              alt={fullCourses[data.getCourse.id].title}
              layout='fixed'
              objectFit='contain'
            />
          </div>
          <div className='relative py-1'>
            <div className='overflow-hidden h-2 text-xs flex rounded-sm bg-purple-200'>
              <div
                style={{ width: `${data.getCourse?.progress}%` }}
                // eslint-disable-next-line prettier/prettier
                className={`h-full ${data.getCourse?.progress < 70 ? 'bg-purple-600' : 'bg-purple-900'}`}
              ></div>
            </div>
          </div>
          <div className='py-5'>
            <Link
              href={`/app/courses/${courseId}/version/${courseVersionId}/learn/${'lessonId'}`}
            >
              <Button size='large' block>
                {data.getCourse?.progress ? 'Continuar Curso' : 'Começar Agora'}
              </Button>
            </Link>
            <div className='flex items-center gap-2 mt-5 md:mt-8 bg-gray-200 rounded-md py-4 px-2'>
              <Image
                className='rounded-full'
                src='/tuliofaria.jpg'
                height={50}
                width={50}
              />
              <div className='flex flex-col text-gray-600'>
                <p className='font-thin text-sm'>Instrutor</p>
                <p className='font-semibold'>Tulio Faria</p>
              </div>
            </div>
            <div className='mt-5'>
              <Title text='Conteúdo' />
              {/* <p className='font-thin text-sm'>Duração: 42min - 10 aulas</p> */}
              <div className='py-4'>
                {data &&
                  data.getCourseModules.map((e, pos) => (
                    <CoursesContent key={pos} pos={pos + 1} {...e} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Courses
