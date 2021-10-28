import React, { useContext } from 'react'
import Link from 'next/link'
import { useQuery } from 'urql'
import { useRouter } from 'next/router'
import { Button } from '@learn49/aura-ui'
import Image from 'next/image'

import fullCourses from '@/data/fullCourses.json'
import { AccountContext } from '@/context/AccountContext'
import Head from '@/elements/Head'
import Title from '@/elements/Title'
import Badge from '@/elements/Badge'
import ContentList from '@/components/Courses/ContentList'
import CardLastCourseAccess from '@/components/Dashboard/CardLastCourseAccess'
import CardInstructor from '@/components/Courses/CardInstructor'
import ProgressBar from '@/components/ProgressBar'
import Copyright from '@/components/Copyright'

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
    getLastCourseAccess(accountId: $accountId, courseId: $courseId) {
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
        <Head title='Aguarde' />
        <Title text='Carregando dados...' />
      </div>
    )
  }

  const isIncluded = () =>
    Object.keys(fullCourses).includes(data.getLastCourseAccess.courseId)

  const createLink = (haveProgress: number) => {
    const preLink = `/app/courses/${courseId}/version/${courseVersionId}/learn/`
    return haveProgress
      ? preLink + data.getLastCourseAccess.lessonId
      : preLink + data.getCourseModules[0].lessons[0].id
  }

  return (
    <>
      <Head title={data?.getCourse.title} />
      <div className='py-4 mx-auto max-w-5xl px-2 lg:px-0'>
        <div className='flex flex-col max-w-screen-lg overflow-hidden bg-white border rounded-lg shadow-xl md:flex-row sm:mx-auto'>
          <div
            className='flex items-center justify-center py-2 relative lg:w-1/2'
            style={{
              backgroundColor: '#000024'
            }}
          >
            <Image
              width={320}
              height={200}
              src={fullCourses[data.getCourse.id].image}
              alt={'title'}
              objectFit='contain'
            />
            <svg
              className='absolute top-0 right-0 hidden h-full text-white lg:inline-block'
              viewBox='0 0 20 104'
              fill='currentColor'
            >
              <polygon points='17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104'></polygon>
            </svg>
          </div>
          <div className='flex flex-col justify-center p-8 bg-white lg:p-16 lg:pl-10 lg:w-1/2'>
            <div className='pb-4'>
              <Badge text='Explorador' />
            </div>
            <div className='mb-3 text-2xl font-extrabold text-gray-700 leading-none sm:text-4xl'>
              {data.getCourse.title}
              <ProgressBar {...data.getCourse} />
            </div>
            <p className='py-4 mb-5 text-gray-600 text-sm'>
              {data.getCourse.description}
            </p>
            <div className='flex items-center'>
              <Link href={createLink(data.getCourse?.progress)}>
                <Button size='large' block>
                  {data.getCourse?.progress
                    ? 'Continuar Curso'
                    : 'Começar Agora'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section className='container mx-auto max-w-5xl px-2 lg:px-0'>
        {data.getLastCourseAccess && isIncluded && (
          <CardLastCourseAccess type='lite' {...data?.getLastCourseAccess} />
        )}
        <CardInstructor type='clean' />
      </section>
      <section className='container mx-auto max-w-5xl py-4 px-2 lg:px-0'>
        <Title text='Conteúdo do curso' />
        <div className='py-4'>
          {data?.getCourseModules.map((e, i) => (
            <ContentList key={i} {...e} />
          ))}
        </div>
        <Copyright />
      </section>
    </>
  )
}

export default Courses
