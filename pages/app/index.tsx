import React, { useContext } from 'react'
import { useQuery } from 'urql'

import { AccountContext } from '@/context/AccountContext'
import Title from '@/elements/Title'
import Head from '@/elements/Head'
import CardLastCourseAccess from '@/components/Dashboard/CardLastCourseAccess'
import CardTop3 from '@/components/Dashboard/CardTop3'
import CardCourses from '@/components/Dashboard/CardCourses'
import Support from '@/components/Dashboard/Support'
import Copyright from '@/components/Copyright'
import fullCourses from '@/data/fullCourses.json'

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

  const WrapperLayout = ({ children }) => (
    <div className='container px-6 py-6 mx-auto'>
      <Head title='Dashboard' />
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
      {Object.keys(fullCourses).includes(data.getLastCourseAccess.courseId) && (
        <CardLastCourseAccess {...data?.getLastCourseAccess} />
      )}
      <Title text='Destaques' />
      <CardTop3
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
            <CardCourses key={i} {...each} />
          ))}
      </div>
      <Support />
      <Copyright />
    </WrapperLayout>
  )
}

export default Dashboard
