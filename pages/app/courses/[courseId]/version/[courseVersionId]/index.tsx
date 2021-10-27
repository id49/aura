import React, { useContext } from 'react'
import Link from 'next/link'
import { useQuery } from 'urql'
import { useRouter } from 'next/router'
import { Button } from '@learn49/aura-ui'

import fullCourses from '@/data/fullCourses.json'
import { AccountContext } from '@/context/AccountContext'
import Head from '@/elements/Head'
import Title from '@/elements/Title'
import Badge from '@/elements/Badge'
import ContentList from '@/components/Courses/ContentList'
import CardLastCourseAccess from '@/components/Dashboard/CardLastCourseAccess'
import CardInstructor from '@/components/Courses/CardInstructor'
import ProgressBar from '@/components/ProgressBar'
import CardImage from '@/components/Courses/CardImage'

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

  const WrapperLayout = ({ children }) => (
    <div className='container px-6 py-6 mx-auto'>
      <Head title='Fullstack Master' />
      {children}
    </div>
  )

  if (fetching) {
    return (
      <WrapperLayout>
        <Title text='Carregando dados...' />
      </WrapperLayout>
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
    <WrapperLayout>
      <Badge text='Explorador' />
      <section className='mt-2 pb-6 flex flex-col md:flex-row md:gap-4 lg:gap-10'>
        <div className='order-1 md:order-none md:w-2/3'>
          <div className='py-3'>
            <p className='text-2xl font-extrabold text-gray-800'>
              {fullCourses[data.getCourse.id].title}
            </p>
          </div>
          {data.getLastCourseAccess && isIncluded && (
            <CardLastCourseAccess type='lite' {...data?.getLastCourseAccess} />
          )}
          <Title text='Descrição' />
          <p className='text-sm my-2'>{data.getCourse.description}</p>
        </div>
        <div className='order-0 md:order-none md:w-1/3'>
          <CardImage {...fullCourses[data.getCourse.id]} />
          <ProgressBar {...data.getCourse} />
          <div className='py-5'>
            <Link href={createLink(data.getCourse?.progress)}>
              <Button size='large' block>
                {data.getCourse?.progress ? 'Continuar Curso' : 'Começar Agora'}
              </Button>
            </Link>
            <CardInstructor />
            <div className='mt-5'>
              <Title text='Conteúdo' />
              {/* <p className='font-thin text-sm'>Duração: 42min - 10 aulas</p> */}
              <div className='py-4'>
                {data?.getCourseModules.map((e, pos) => (
                  <ContentList
                    key={pos}
                    pos={pos + 1}
                    courseId={courseId}
                    courseVersionId={courseVersionId}
                    {...e}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </WrapperLayout>
  )
}

export default Courses
