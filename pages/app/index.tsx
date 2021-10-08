import React, { useContext } from 'react'

import Head from '../../elements/Head'
import Title from '../../elements/Title'
import CardTemplate from '../../components/Cards/Dashboard/CardTemplate'
import CardTemplateOne from '../../components/Cards/Dashboard/TemplateOne'
import CardTemplateTwo from '../../components/Cards/Dashboard/TemplateTwo'
import { useAuth } from '../../context/AuthContext'
import { AccountContext } from '../../context/AccountContext'
import { useQuery } from 'urql'
import { Card, CardBody } from '@learn49/aura-ui'

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
      <Title
        text='Especialize-se!'
        subText='Mini cursos específicos e direto ao ponto'
      />
      <div className='flex flex-wrap gap-4 py-4'>
        {[0, 1, 2, 3, 4].map((each, i) => (
          <CardTemplate key={i} />
        ))}
      </div>

      <section className='py-4'>
        <Title text='Suporte' subText='Avance ainda mais rápido' />
        <div className='bg-gray-200 rounded-sm flex flex-col md:flex-row gap-4 py-2 px-2'>
          <Card className='flex flex-col md:w-1/2'>
            <img className='object-cover' src='/login.png' />
            <CardBody>
              <p className='mb-2 text-2xl font-bold text-gray-600 dark:text-gray-300'>
                Canais de Comunicação
              </p>
              <p className='text-gray-600 dark:text-gray-400'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga,
                cum commodi a omnis numquam quod? Totam exercitationem quos hic
              </p>
            </CardBody>
          </Card>
          <div className='flex flex-col w-full justify-between gap-10'>
            <Card className='flex h-3/4'>
              <img className='object-fill w-1/3' src='/login.png' />
              <CardBody>
                <p className='mb-4 text-3xl font-bold text-gray-600 dark:text-gray-300'>
                  Office Hours
                </p>
                <p className='text-gray-600 dark:text-gray-400'>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Fuga, cum commodi a omnis numquam quod? Totam exercitationem
                  quos hic ipsam at qui cum numquam, sed amet ratione! Ratione,
                  nihil dolorum.
                </p>
              </CardBody>
            </Card>
            <Card className='flex flex-col h-full'>
              <img className='object-cover h-40' src='/login.png' />
              <CardBody>
                <p className='mb-4 text-3xl font-bold text-gray-600 dark:text-gray-300'>
                  Inglês pra Dev
                </p>
                <p className='text-gray-600 dark:text-gray-400'>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Fuga, cum commodi a omnis numquam quod? Totam exercitationem
                  quos hic ipsam at qui cum numquam, sed amet ratione! Ratione,
                  nihil dolorum.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <section className='py-4 flex flex-col md:flex-row justify-between md:items-center'>
        <div>
          <p className='text-sm font-semibold mb-2'>
            Copyright © 2020 Devpleno.
          </p>
          <p className='text-xs'>Todos os direitos reservados. </p>
          <p className='text-xs'>
            Um produto We Dev Ideas / CNPJ: 06.189.599/0001-30
          </p>
        </div>
        <div className='flex gap-8 justify-center items-center my-4'>
          <a href='https://www.instagram.com/devpleno/' target='_blank'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9.99999 6.87579C8.27968 6.87579 6.87577 8.2797 6.87577 10C6.87577 11.7203 8.27968 13.1242 9.99999 13.1242C11.7203 13.1242 13.1242 11.7203 13.1242 10C13.1242 8.2797 11.7203 6.87579 9.99999 6.87579ZM19.3703 10C19.3703 8.70626 19.382 7.42423 19.3094 6.13283C19.2367 4.63283 18.8945 3.30158 17.7976 2.2047C16.6984 1.10548 15.3695 0.765639 13.8695 0.692982C12.5758 0.620326 11.2937 0.632045 10.0023 0.632045C8.70858 0.632045 7.42655 0.620326 6.13515 0.692982C4.63515 0.765639 3.3039 1.10783 2.20702 2.2047C1.1078 3.30392 0.767958 4.63283 0.695302 6.13283C0.622645 7.42658 0.634364 8.70861 0.634364 10C0.634364 11.2914 0.622645 12.5758 0.695302 13.8672C0.767958 15.3672 1.11015 16.6985 2.20702 17.7953C3.30624 18.8945 4.63515 19.2344 6.13515 19.307C7.4289 19.3797 8.71093 19.368 10.0023 19.368C11.2961 19.368 12.5781 19.3797 13.8695 19.307C15.3695 19.2344 16.7008 18.8922 17.7976 17.7953C18.8969 16.6961 19.2367 15.3672 19.3094 13.8672C19.3844 12.5758 19.3703 11.2938 19.3703 10ZM9.99999 14.807C7.33983 14.807 5.19296 12.6602 5.19296 10C5.19296 7.33986 7.33983 5.19298 9.99999 5.19298C12.6601 5.19298 14.807 7.33986 14.807 10C14.807 12.6602 12.6601 14.807 9.99999 14.807ZM15.0039 6.11876C14.3828 6.11876 13.8812 5.6172 13.8812 4.99611C13.8812 4.37501 14.3828 3.87345 15.0039 3.87345C15.625 3.87345 16.1266 4.37501 16.1266 4.99611C16.1267 5.14359 16.0978 5.28966 16.0415 5.42595C15.9851 5.56224 15.9024 5.68607 15.7981 5.79036C15.6939 5.89464 15.57 5.97733 15.4337 6.03368C15.2974 6.09004 15.1514 6.11895 15.0039 6.11876Z'
                fill='#444444'
              ></path>
            </svg>
          </a>
          <a href='https://www.youtube.com/devplenocom' target='_blank'>
            <svg
              width='22'
              height='16'
              viewBox='0 0 22 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M21.0617 2.93984C20.9422 2.49462 20.7078 2.0886 20.382 1.76243C20.0563 1.43625 19.6505 1.20136 19.2055 1.08125C17.5672 0.640625 11 0.640625 11 0.640625C11 0.640625 4.43281 0.640625 2.79453 1.07891C2.34927 1.19862 1.94334 1.43339 1.61751 1.75962C1.29169 2.08586 1.05744 2.49208 0.938281 2.9375C0.5 4.57812 0.5 8 0.5 8C0.5 8 0.5 11.4219 0.938281 13.0602C1.17969 13.9648 1.89219 14.6773 2.79453 14.9188C4.43281 15.3594 11 15.3594 11 15.3594C11 15.3594 17.5672 15.3594 19.2055 14.9188C20.1102 14.6773 20.8203 13.9648 21.0617 13.0602C21.5 11.4219 21.5 8 21.5 8C21.5 8 21.5 4.57813 21.0617 2.93984ZM8.91406 11.1406V4.85938L14.3516 7.97656L8.91406 11.1406Z'
                fill='#444444'
              ></path>
            </svg>
          </a>
          <a href='http://facebook.com/devpleno' target='_blank'>
            <svg
              width='18'
              height='18'
              viewBox='0 0 18 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M3.28669 0C1.46601 0 0 1.46601 0 3.28669V14.7133C0 16.534 1.46601 18 3.28669 18H9.47981V10.9631H7.61906V8.42962H9.47981V6.26512C9.47981 4.56457 10.5792 3.00319 13.1119 3.00319C14.1373 3.00319 14.8955 3.10163 14.8955 3.10163L14.8359 5.46751C14.8359 5.46751 14.0626 5.4602 13.2187 5.4602C12.3054 5.4602 12.159 5.881 12.159 6.57958V8.42964H14.9085L14.7887 10.9631H12.159V18H14.7133C16.534 18 18 16.534 18 14.7133V3.2867C18 1.46602 16.534 1.8e-05 14.7133 1.8e-05H3.28667L3.28669 0Z'
                fill='#444444'
              ></path>
            </svg>
          </a>
          <a href='https://github.com/devpleno' target='_blank'>
            <svg
              width='22'
              height='22'
              viewBox='0 0 22 22'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10.9906 0.788331C5.19453 0.785987 0.5 5.47818 0.5 11.2696C0.5 15.8493 3.43672 19.7422 7.52656 21.1719C8.07734 21.3102 7.99297 20.9188 7.99297 20.6516V18.8352C4.8125 19.2079 4.68359 17.1032 4.47031 16.7516C4.03906 16.0157 3.01953 15.8282 3.32422 15.4766C4.04844 15.104 4.78672 15.5704 5.64219 16.8336C6.26094 17.7501 7.46797 17.5954 8.07969 17.443C8.21328 16.8922 8.49922 16.4001 8.89297 16.018C5.59766 15.4274 4.22422 13.4165 4.22422 11.0258C4.22422 9.86567 4.60625 8.79927 5.35625 7.93911C4.87812 6.52114 5.40078 5.30708 5.47109 5.12661C6.83281 5.00474 8.24844 6.10161 8.35859 6.18833C9.13203 5.97974 10.0156 5.86958 11.0047 5.86958C11.9984 5.86958 12.8844 5.98443 13.6648 6.19536C13.9297 5.9938 15.2422 5.05161 16.5078 5.16646C16.5758 5.34692 17.0867 6.53286 16.6367 7.93208C17.3961 8.79458 17.7828 9.87036 17.7828 11.0329C17.7828 13.4282 16.4 15.4415 13.0953 16.0227C13.3784 16.3011 13.6031 16.633 13.7564 16.9992C13.9098 17.3654 13.9886 17.7585 13.9883 18.1555V20.7922C14.007 21.0032 13.9883 21.2118 14.3398 21.2118C18.4906 19.8126 21.4789 15.8915 21.4789 11.2719C21.4789 5.47817 16.782 0.788331 10.9906 0.788331Z'
                fill='#444444'
              ></path>
            </svg>
          </a>
        </div>
      </section>
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
    </>
  )
}

export default Dashboard
