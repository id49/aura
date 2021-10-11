import React, { useContext } from 'react'

import Head from '../../elements/Head'
import Title from '../../elements/Title'
import CardTemplate from '../../components/Cards/Dashboard/CardTemplate'
import CardTemplateOne from '../../components/Cards/Dashboard/TemplateOne'
import CardTemplateTwo from '../../components/Cards/Dashboard/TemplateTwo'
import { useAuth } from '../../context/AuthContext'
import { AccountContext } from '../../context/AccountContext'
import { useQuery } from 'urql'

import SuppCardOne from '../../components/Cards/Dashboard/SuppCardOne'
import SuppCardTwo from '../../components/Cards/Dashboard/SuppCardTwo'
import SuppCardThree from '../../components/Cards/Dashboard/SuppCardThree'
import Copyright from '../../components/Footer/Copyright'

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
    <div className='container px-6 mx-auto'>
      <Head title='Dashboard' />
      <Title text='Destaque' />
      <CardTemplateOne />
      <Title text='Evolua ainda mais' subText='Aperfeiçoe seus conhecimentos' />
      <CardTemplateTwo />
      <Title
        text='Especialize-se!'
        subText='Mini cursos específicos e direto ao ponto'
      />
      <div className='flex flex-wrap gap-4 py-4'>
        {[0, 1, 2].map((each, i) => (
          <CardTemplate key={i} />
        ))}
      </div>

      <section className='py-4'>
        <Title text='Suporte' subText='Avance ainda mais rápido' />
        <div className='bg-gray-200 rounded-sm flex flex-col md:flex-row gap-4 py-2 px-2'>
          <SuppCardOne />
          <div className='flex flex-col w-full justify-between gap-4'>
            <SuppCardTwo />
            <SuppCardThree />
          </div>
        </div>
      </section>

      <Copyright />
      {/* {data && (
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
      )} */}
    </div>
  )
}

export default Dashboard
