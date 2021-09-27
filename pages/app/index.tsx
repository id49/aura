import React from 'react'
import Image from 'next/image'
import { Card, CardBody } from '@learn49/aura-ui'

import Head from '../../elements/Head'
import Title from '../../elements/Title'

const CardTemplate = () => (
  <Card className='flex w-full xl:max-w-md hover:bg-gray-200 cursor-pointer'>
    <img className='w-1/3' src='/img/login-office.jpeg' />
    <CardBody>
      <p className='font-bold text-2xl text-gray-600 dark:text-gray-300'>
        Fullstack Master
      </p>
      <div className='flex items-center gap-2 my-2'>
        <Image
          className='rounded-full'
          src='/img/login-office.jpeg'
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
  return (
    <>
      <Head title='Dashboard' />
      <div className='mt-4 mb-6'>
        <Title text='Lista de Cursos' />
      </div>
      <div className='flex flex-wrap gap-4'>
        {[0, 1, 2, 3, 4].map((each, i) => (
          <CardTemplate key={i} />
        ))}
      </div>
    </>
  )
}

export default Dashboard
