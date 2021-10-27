import React, { useContext } from 'react'
import { useQuery } from 'urql'

import Head from '../../elements/Head'
import Title from '../../elements/Title'
import { AccountContext } from '../../context/AccountContext'
import CardHero from '../../components/Cards/Dashboard/CardHero'
import CardSubHero from '../../components/Cards/Dashboard/CardSubHero'
import CardTemplate from '../../components/Cards/Dashboard/CardTemplate'
import SuppCardOne from '../../components/Cards/Dashboard/SuppCardOne'
import SuppCardTwo from '../../components/Cards/Dashboard/SuppCardTwo'
// import SuppCardThree from '../../components/Cards/Dashboard/SuppCardThree'
import Copyright from '../../components/Copyright'
import fullCourses from '../../data/fullCourses.json'

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
      {data &&
        Object.keys(fullCourses).includes(
          data.getLastCourseAccess.courseId
        ) && (
          <>
            <Title
              text='Continue Assistindo'
              subText='Não perca o foco! Continue de onde parou.'
            />
            <CardHero {...data?.getLastCourseAccess} />
          </>
        )}
      <Title text='Destaques' />
      {/* <Title text='Evolua ainda mais' subText='Aperfeiçoe seus conhecimentos' /> */}
      <CardSubHero
        courseOne={Object.values(fullCourses)[0]}
        courseTwo={Object.values(fullCourses)[1]}
        courseThree={Object.values(fullCourses)[2]}
      />
      <Title
        text='Especialize-se!'
        subText='Cursos específicos e direto ao ponto'
      />
      <div className='flex flex-col gap-4 py-4'>
        {Object.values(fullCourses)
          .filter((_, id) => id > 2)
          .map((each, i) => (
            <CardTemplate key={i} {...each} />
          ))}
      </div>

      <section className='py-4'>
        <Title text='Suporte' subText='Avance ainda mais rápido' />
        <div className='bg-gray-200 rounded-sm flex flex-col md:flex-row gap-4 py-2 px-2'>
          <SuppCardOne />
          <SuppCardTwo />
          {/* <div className='flex flex-col w-full justify-between gap-4'>
            <SuppCardTwo />
            <SuppCardThree />
          </div> */}
        </div>
      </section>

      <Copyright />
    </div>
  )
}

export default Dashboard
