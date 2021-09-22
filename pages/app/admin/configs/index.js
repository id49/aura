import React from 'react'
import { Card, CardBody } from '@learn49/aura-ui'
import Link from 'next/link'

import Head from '../../../../elements/Head'
import Title from '../../../../elements/Title'

const routes = [
  {
    path: '/app/admin/configs/logo',
    name: 'Alterar logo do Aluno.Tv',
    desc: 'Substitua o logo do Aluno.TV pelo logo de sua escola.'
  },
  {
    path: '/app/admin/configs/background',
    name: 'Alterar fundo do Aluno.Tv',
    desc: 'Altere a imagem de fundo do Aluno.TV por uma de sua preferência.'
  },
  {
    path: '/app/admin/configs/starter',
    name: 'Alterar imagem inicial do Aluno.Tv',
    desc: 'Altere a imagem inicial do Aluno.TV por uma de sua preferência.'
  },
  {
    path: '/app/admin/configs/text',
    name: 'Alterar o texto inicial do Aluno.Tv',
    desc: 'Altere o texto inicial do Aluno.TV por um de sua preferência.'
  },
  {
    path: '/app/admin/configs/email',
    name: 'Configurações de e-mail',
    desc: 'Altere as configurações dos e-mails enviados pelo Aluno.TV'
  },
  {
    path: '/app/admin/configs/api',
    name: 'Api de integração',
    desc: 'Integre o Aluno.TV com seu sistema.'
  }
]

const Configs = () => (
  <>
    <Head title='Configurações do Sistema' />
    <div className='mt-4 mb-6'>
      <Title text='Configurações do Sistema' />
    </div>

    <div className='grid grid-flow-row auto-rows-max md:grid-cols-3 gap-4 mb-4'>
      {routes.map((route, i) => (
        <Link href={route.path} key={i}>
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
        </Link>
      ))}
    </div>
  </>
)

export default Configs
