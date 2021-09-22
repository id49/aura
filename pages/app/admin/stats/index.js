import React from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { Card, CardBody } from '@learn49/aura-ui'

import Head from '../../../../elements/Head'
import Title from '../../../../elements/Title'

const routes = [
  {
    path: '/admin',
    icon: 'HomeIcon',
    name: 'Acessos realizados',
    desc: 'Visualize quando os responsáveis entraram no sistema (login).'
  },
  {
    path: '/admin/cameras',
    icon: 'FormsIcon',
    name: 'Acessos a Turmas',
    desc: 'Visualize quando os responsáveis entraram e sairam de alguma Turma.'
  },
  {
    path: '/admin/admins',
    icon: 'CardsIcon',
    name: 'Tempo total de acesso de responsáveis por Turma',
    desc:
      'Visualize a totalização de tempo em que o responsável permaneceu visualizando alguma turma.'
  }
]

const Stats = () => {
  const router = useRouter()

  return (
    <>
      <Head title='Administradores do Sistema' />
      <div className='mt-4 mb-6'>
        <Title text='Estatísticas de Acesso' />
      </div>

      <div className='grid grid-flow-row auto-rows-max md:grid-cols-3 gap-4'>
        {routes.map((route) => (
          <Card
            colored
            className='bg-purple-700 hover:bg-purple-800 cursor-pointer'
            key={route.name}
          >
            <CardBody>
              <p className='mb-4 font-semibold text-white'>{route.name}</p>
              <p className='text-white font-light'>{route.desc}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  )
}

export default Stats
