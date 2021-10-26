import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from 'urql'
import { useRouter } from 'next/router'
import { Button } from '@learn49/aura-ui'

import { AccountContext } from '../../../../../context/AccountContext'
import Head from '../../../../../elements/Head'
import Title from '../../../../../elements/Title'

const GET_COURSE = `
  query getCourse($accountId: String!, $courseId: String!) {
    getCourse(accountId: $accountId, courseId: $courseId) {
      id
      title
      description
      progress
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
      courseVersionId
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
              Fullstack Master
            </p>
          </div>
          <Title text='Descrição' />
          <p className='text-sm my-2'>{data.getCourse.description}</p>
        </div>
        <div className='order-0 md:order-none md:w-1/3'>
          <img
            className='rounded-lg'
            src='https://res.cloudinary.com/codersociety/image/fetch/f_webp,ar_16:9,c_fill,w_1140/https://cdn.codersociety.com/uploads/graphql-reasons.png'
          />
          <div className='py-5'>
            <Link href='/app/courses/learn'>
              <Button size='large' block>
                Começar Agora
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
              <p className='font-thin text-sm'>Duração: 42min - 10 aulas</p>
              <div className='py-4'>
                {[1, 2, 3].map((e) => (
                  <div key={e} className='flex py-0.5'>
                    <div className='w-6'>0{e}</div>
                    <div className='font-semibold'>Tópico Aqui</div>
                  </div>
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
