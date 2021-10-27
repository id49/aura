import React, { useState, useContext } from 'react'
import Image from 'next/image'
import { Input, Transition } from '@learn49/aura-ui'
import { useQuery } from 'urql'
import { useRouter } from 'next/router'

import { AccountContext } from '@/context/AccountContext'
import Head from '@/elements/Head'
import Title from '@/elements/Title'
import CardInstructor from '@/components/Courses/CardInstructor'

const GET_COURSE = `
  query getCourse(
    $accountId: String!
    $courseId: String!
    $courseVersionId: String!
    $lessonId: String!
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
      sortOrder
      lessons {
        id
        title
        releaseOnDate
        releaseAfter
        completed
      }
    }
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

const Learn = () => {
  const router = useRouter()
  const { id: accountId } = useContext(AccountContext)
  const { courseId, courseVersionId, lessonId } = router.query
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false)

  const [result] = useQuery({
    query: GET_COURSE,
    variables: {
      accountId,
      courseId,
      courseVersionId,
      lessonId,
      limit: 50,
      offset: 0
    }
  })
  const { data, fetching } = result

  const handleDropdownMenuClick = () => {
    setIsDropdownMenuOpen(!isDropdownMenuOpen)
  }

  const WrapperLayout = ({ children }) => (
    <div className='container px-6 py-6 mx-auto'>
      <Head title={data?.getCourse.title || 'Aguarde'} />
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

  return (
    <WrapperLayout>
      <section className='pb-6 flex flex-col lg:flex-row xl:container xl:mx-auto md:gap-2'>
        <div className='lg:w-2/3 xl:w-3/4 m-2'>
          <div className='h-96 bg-gray-200 flex place-items-center justify-center'>
            <p>Video</p>
          </div>
          <div className='py-3'>
            <p className='text-2xl font-extrabold text-gray-800'>
              {data?.getCourse.title}
            </p>
            {/* <p className='font-thin text-sm'>Duração: 42min - 10 aulas</p> */}
          </div>
          <CardInstructor type='clean' />
          <Title text='Descrição' />
          <p className='text-sm my-2'>{data.getCourse.description}</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
        <div className='lg:w-1/3 xl:w-1/4 mt-2'>
          <div className='py-2 px-2 bg-gray-200 rounded-l-xl xl:rounded-xl'>
            <div className='mt-1'>
              <Title text='Conteúdo' />
              <div className='py-2'>
                <div className='relative px-1 py-3 bg-purple-300 rounded-lg hover:bg-purple-400'>
                  <button
                    className='inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 pr-3'
                    onClick={handleDropdownMenuClick}
                    aria-haspopup='true'
                  >
                    <span className='inline-flex items-center'>
                      <span className='ml-1'>Topico</span>
                    </span>
                    <Image
                      src={'/forms/dropdown.svg'}
                      width={16}
                      height={16}
                      alt='Show more'
                    />
                  </button>
                  <Transition
                    show={isDropdownMenuOpen}
                    enter='transition-all ease-in-out duration-300'
                    enterFrom='opacity-25 max-h-0'
                    enterTo='opacity-100 max-h-xl'
                    leave='transition-all ease-in-out duration-300'
                    leaveFrom='opacity-100 max-h-xl'
                    leaveTo='opacity-0 max-h-0'
                  >
                    <ul
                      className='p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900'
                      aria-label='submenu'
                    >
                      {[1, 2, 3].map((e) => (
                        <div
                          key={e}
                          className='flex items-center gap-2 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer'
                        >
                          {e % 2 === 0 && (
                            <Input css='' type='checkbox' checked />
                          )}
                          {e % 2 !== 0 && <Input css='' type='checkbox' />}
                          <div className='font-semibold flex'>
                            <div className='w-6'>0{e}.</div> Tópico Aqui
                          </div>
                        </div>
                      ))}
                    </ul>
                  </Transition>
                </div>
                <div className='relative px-1 py-3 mt-1 bg-purple-300 rounded-lg hover:bg-purple-400'>
                  <button
                    className='inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 pr-3'
                    onClick={handleDropdownMenuClick}
                    aria-haspopup='true'
                  >
                    <span className='inline-flex items-center'>
                      <span className='ml-1'>Topico</span>
                    </span>
                    <Image
                      src={'/forms/dropdown.svg'}
                      width={16}
                      height={16}
                      alt='Show more'
                    />
                  </button>
                  <Transition
                    show={isDropdownMenuOpen}
                    enter='transition-all ease-in-out duration-300'
                    enterFrom='opacity-25 max-h-0'
                    enterTo='opacity-100 max-h-xl'
                    leave='transition-all ease-in-out duration-300'
                    leaveFrom='opacity-100 max-h-xl'
                    leaveTo='opacity-0 max-h-0'
                  >
                    <ul
                      className='p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900'
                      aria-label='submenu'
                    >
                      {[1, 2, 3].map((e) => (
                        <div
                          key={e}
                          className='flex items-center gap-2 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer'
                        >
                          {e % 2 === 0 && (
                            <Input css='' type='checkbox' checked />
                          )}
                          {e % 2 !== 0 && <Input css='' type='checkbox' />}
                          <div className='font-semibold flex'>
                            <div className='w-6'>0{e}.</div> Tópico Aqui
                          </div>
                        </div>
                      ))}
                    </ul>
                  </Transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </WrapperLayout>
  )
}

export default Learn
