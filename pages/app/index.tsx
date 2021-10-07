import React, { useContext } from 'react'

import Head from '../../elements/Head'
import Title from '../../elements/Title'
import CardTemplate from '../../components/Cards/Dashboard/CardTemplate'
import CardTemplateOne from '../../components/Cards/Dashboard/TemplateOne'
import CardTemplateTwo from '../../components/Cards/Dashboard/TemplateTwo'
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
      {data && (
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
      )}
    </>
  )
}

export default Dashboard
