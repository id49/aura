import React, { useContext } from 'react'

import Head from '../../elements/Head'
import Title from '../../elements/Title'
import CardHero from '../../components/Cards/Dashboard/CardHero'
import CardSubHero from '../../components/Cards/Dashboard/CardSubHero'
import CardTemplate from '../../components/Cards/Dashboard/CardTemplate'
import { AccountContext } from '../../context/AccountContext'
import { useQuery } from 'urql'

import SuppCardOne from '../../components/Cards/Dashboard/SuppCardOne'
import SuppCardTwo from '../../components/Cards/Dashboard/SuppCardTwo'
import SuppCardThree from '../../components/Cards/Dashboard/SuppCardThree'
import Copyright from '../../components/Copyright'

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
    return (
      <div className='container px-6 py-6 mx-auto'>
        <Head title='Dashboard' />
        <Title text='Carregando dados...' />
      </div>
    )
  }

  return (
    <div className='container px-6 py-6 mx-auto'>
      <Head title='Dashboard' />
      <Title text='Destaque' />
      <CardHero {...data?.getCourses[0]} />
      <Title text='Evolua ainda mais' subText='Aperfeiçoe seus conhecimentos' />
      <CardSubHero
        courseOne={data?.getCourses[1] || {}}
        courseTwo={data?.getCourses[2] || {}}
        courseThree={data?.getCourses[3] || {}}
      />
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
    </div>
  )
}

export default Dashboard
