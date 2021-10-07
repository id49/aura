import React, { useContext } from 'react'
import Image from 'next/image'
import { Card, CardBody } from '@learn49/aura-ui'

import Head from '../../elements/Head'
import Title from '../../elements/Title'
import { useAuth } from '../../context/AuthContext'
import { AccountContext } from '../../context/AccountContext'
import { useQuery } from 'urql'

const GET_COURSE = `
  query getCourses($accountId: String!, $limit: Float!, $offset: Float!) {
    getCourses(accountId: $accountId, limit: $limit, offset: $offset) {
      id
      title
      description
      courseVersionId
      defaultVersion
      progress
      versions
      latestVersion
      latestVersionAccessed
    }
  }
`

const CardTemplateOne = () => (
  <Card className='flex flex-col lg:flex-row w-full mt-2 mb-4 py-10 lg:py-20 px-4 lg:px-10 gap-4 bg-teal-700 cursor-pointer'>
    <img
      className='lg:w-1/3 rounded-lg'
      src='https://res.cloudinary.com/codersociety/image/fetch/f_webp,ar_16:9,c_fill,w_1140/https://cdn.codersociety.com/uploads/graphql-reasons.png'
    />
    <CardBody>
      <p className='font-bold text-2xl lg:text-4xl text-green-100 hover:text-white'>
        Fullstack Master
      </p>
      <div className='flex items-center gap-2 my-2'>
        <Image
          className='rounded-full'
          src='/navbar/profile-empty.png'
          height={40}
          width={40}
        />
        <p className='font-semibold text-white py-4'>Tulio Faria</p>
      </div>
      <p className='text-gray-200 mt-6'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, cum
        commodi a omnis numquam quod? Totam exercitationem quos hic ipsam at qui
        cum numquam, sed amet ratione! Ratione, nihil dolorum.
      </p>
    </CardBody>
  </Card>
)

const CardTemplateTwo = () => (
  <div className='flex flex-col md:flex-row gap-4 my-4 w-full'>
    {[0, 1, 2].map((e) => (
      <Card key={e} className='py-4 hover:bg-gray-200  cursor-pointer'>
        <img src='/img/implementacionApi.png' />
        <CardBody>
          <p className='font-bold text-2xl text-gray-600 dark:text-gray-300'>
            Fullstack Master
          </p>
          <div className='flex items-center gap-2 my-2'>
            <Image
              className='rounded-full'
              src='/navbar/profile-empty.png'
              height={40}
              width={40}
            />
            <p className='font-semibold text-gray-600'>Tulio Faria</p>
          </div>
          <p className='text-gray-600 dark:text-gray-400'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, cum
            commodi a omnis numquam quod? Totam exercitationem quos hic ipsam at
            qui cum numquam, sed amet ratione! Ratione, nihil dolorum.
          </p>
        </CardBody>
      </Card>
    ))}
  </div>
)

const CardTemplate = () => (
  <Card className='flex w-full hover:bg-gray-200 cursor-pointer'>
    <img className='w-1/3' src='/img/implementacionApi.png' />
    <CardBody>
      <p className='font-bold text-2xl text-gray-600 dark:text-gray-300'>
        Fullstack Master
      </p>
      <div className='flex items-center gap-2 my-2'>
        <Image
          className='rounded-full'
          src='/navbar/profile-empty.png'
          height={40}
          width={40}
        />
        <p className='font-semibold text-gray-600'>Tulio Faria</p>
      </div>
      <p className='text-gray-600 dark:text-gray-400'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, cum
        commodi a omnis numquam quod? Totam exercitationem quos hic ipsam at qui
        cum numquam, sed amet ratione! Ratione, nihil dolorum.
      </p>
    </CardBody>
  </Card>
)

const Dashboard = () => {
  const { user } = useAuth()
  const { id: accountId } = useContext(AccountContext)

  const [result] = useQuery({
    query: GET_COURSE,
    requestPolicy: 'network-only',
    variables: {
      accountId,
      limit: 20,
      offset: 0
    }
  })
  const { data } = result

  return (
    <>
      <Head title='Dashboard' />
      <Title text='Destaque' />
      <CardTemplateOne />
      <Title text='Evolua ainda mais' subText='Aperfeiçoe seus conhecimentos' />
      <CardTemplateTwo />
      <div className='flex flex-wrap gap-4'>
        {[0, 1, 2, 3, 4].map((each, i) => (
          <CardTemplate key={i} />
        ))}
      </div>
      <p>
        User:
        <br />
        {JSON.stringify(user)}
        <br />
        <br />
        AccountID: {accountId}
        <br />
        <br />
        GetCourses
        <br />
        {JSON.stringify(data)}
      </p>
    </>
  )
}

export default Dashboard
