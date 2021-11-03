import React, { useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'urql'
import { useRouter } from 'next/router'

import { AccountContext } from '@/context/AccountContext'
import Head from '@/elements/Head'
import Title from '@/elements/Title'
import Badge from '@/elements/Badge'
import ProgressBar from '@/components/ProgressBar'
import CardInstructor from '@/components/Courses/CardInstructor'
import LessonsList from '@/components/Lesson/LessonsList'
import LessonControls from '@/components/Lesson/LessonControls'
import FetchingData from '@/components/Lesson/FetchingData'
import EditorDraftJS from '@/components/EditorDraftJS'

const GET_COURSE = `
  query getCourse(
    $accountId: String!
    $courseId: String!
  ) {
    getCourse(accountId: $accountId, courseId: $courseId) {
      id
      title
      description
      progress
    }
  }
`

const GET_COURSE_MODULES = `
  query getCourseModules(
    $accountId: String!
    $courseVersionId: String!
    $limit: Int
    $offset: Int
  ) {
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
      sortOrder
      lessons {
        id
        title
        releaseOnDate
        releaseAfter
        completed
      }
    }
  }
`

const GET_COURSE_LESSON_BY_ENROLLMENT = `
  query getCourseLessonByEnrollment(
    $accountId: String!
    $courseId: String!
    $courseVersionId: String!
    $lessonId: String!
  ) {
    getCourseLessonByEnrollment(
      accountId: $accountId
      courseId: $courseId
      courseVersionId: $courseVersionId
      lessonId: $lessonId
    ) {
      id
      title
      sortOrder
      blocks
      baseLessonId
      moduleId
      nextLesson
      releaseOnDate
      completed
    }
  }
`

const MARK_LESSON_AS_SEEN = `
  mutation markLessonAsSeen(
    $accountId: String!
    $courseId: String!
    $lessonId: String!
    $isCompleted: Boolean!
  ) {
    markLessonAsSeen(
      accountId: $accountId
      courseId: $courseId
      lessonId: $lessonId
      isCompleted: $isCompleted
    )
  }
`

const Learn = () => {
  const router = useRouter()
  const { id: accountId } = useContext(AccountContext)
  const { courseId, courseVersionId, lessonId } = router.query
  const [selectedModule, setSelectedModule] = useState()
  const [marked, markLesson] = useMutation(MARK_LESSON_AS_SEEN)

  const [courseData] = useQuery({
    query: GET_COURSE,
    variables: { accountId, courseId }
  })
  const { data: course, fetching: fetchingCourse } = courseData

  const [modulesData] = useQuery({
    query: GET_COURSE_MODULES,
    variables: {
      accountId,
      courseVersionId,
      limit: 50,
      offset: 0
    }
  })
  const { data: modules } = modulesData

  const [lessonsData] = useQuery({
    query: GET_COURSE_LESSON_BY_ENROLLMENT,
    variables: {
      accountId,
      courseId,
      courseVersionId,
      lessonId
    }
  })
  const { data: lessons, fetching: fetchingLessons } = lessonsData

  useEffect(() => {
    const newValue = lessons?.getCourseLessonByEnrollment.moduleId
    if (newValue && newValue !== selectedModule) {
      setSelectedModule(newValue)
    }
  }, [fetchingLessons])

  const markLessonAsSeen = async (isCompleted) => {
    await markLesson({
      accountId,
      courseId,
      lessonId,
      isCompleted
    })
  }

  const parsedBody =
    lessons?.getCourseLessonByEnrollment?.blocks &&
    JSON.parse(lessons?.getCourseLessonByEnrollment?.blocks)

  return (
    <>
      <Head title={course?.getCourse.title || 'Aguarde'} />
      <main className='flex flex-col lg:flex-row xl:container xl:max-w-7xl xl:mx-auto'>
        <div className='w-full lg:w-3/4 m-0 p-0'>
          <div className='flex flex-col'>
            {fetchingLessons && <FetchingData />}
            {!fetchingLessons && <EditorDraftJS parsedBody={parsedBody} />}
            <div className='text-2xl text-gray-600 font-semibold my-2'>
              Aula: {lessons?.getCourseLessonByEnrollment.title}
            </div>
            <div className='w-full md:flex md:flex-row md:justify-between md:items-center md:px-4 lg:px-2'>
              <Badge text='Explorador' className='hidden md:block' />
              <LessonControls
                action={markLessonAsSeen}
                isLoadingNextLesson={fetchingLessons}
                isLoadingMarkUpdate={marked.fetching}
                {...lessons?.getCourseLessonByEnrollment}
              />
            </div>
          </div>
          {!fetchingCourse && course && (
            <div className='flex flex-col justify-center px-4 lg:px-2'>
              <CardInstructor type='clean' />
              <div className='text-2xl font-extrabold text-gray-700 leading-none sm:text-4xl'>
                {course?.getCourse.title}
                {/* <p className='font-thin text-sm'>Duração: 42min - 10 aulas</p> */}
                <ProgressBar {...course?.getCourse} />
              </div>
              <p className='py-4 mb-5 text-gray-600 text-sm'>
                {course?.getCourse.description}
              </p>
            </div>
          )}
          <div className='lg:py-10'></div>
        </div>
        <div className='py-10 lg:py-0 lg:w-1/4'>
          <div className='flex justify-between items-center bg-gray-300'>
            <Title text='Conteúdo' className='p-2' />
          </div>
          <div className='pb-2'>
            {modules?.getCourseModules.map((e) => (
              <LessonsList
                key={e.id}
                isExpanded={e.id === selectedModule}
                {...e}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default Learn
