import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { AccountContext } from '../../../context/AccountContext'

import Title from '../../../elements/Title'
import Head from '../../../elements/Head'

const StudentsIndex = () => {
  const router = useRouter()
  const account = useContext(AccountContext)

  return (
    <>
      <Head title={[account.name, 'App'].filter((x) => x).join(' - ')} />
      <div className='flex flex-col justify-center items-center mt-10'>
        {(!router.query.s || !router.query.c) && (
          <>
            {account.homeImage && (
              <div
                className='h-64 w-full mx-auto rounded-lg bg-contain bg-no-repeat bg-center'
                style={{ backgroundImage: `url(${account.homeImage})` }}
              ></div>
            )}
            {/* //TODO: forçar trocar senha */}
            <div className='mt-4 mb-6'>
              <Title text={account.name} />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default StudentsIndex
