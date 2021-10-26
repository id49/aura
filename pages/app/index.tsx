import React, { useContext } from 'react'

import Head from '../../elements/Head'
import Title from '../../elements/Title'
// import CardHero from '../../components/Cards/Dashboard/CardHero'
import CardSubHero from '../../components/Cards/Dashboard/CardSubHero'
import CardTemplate from '../../components/Cards/Dashboard/CardTemplate'
import { AccountContext } from '../../context/AccountContext'
import { useQuery } from 'urql'

import SuppCardOne from '../../components/Cards/Dashboard/SuppCardOne'
import SuppCardTwo from '../../components/Cards/Dashboard/SuppCardTwo'
import SuppCardThree from '../../components/Cards/Dashboard/SuppCardThree'
import Copyright from '../../components/Copyright'

const fullCourses = [
  {
    id: '1',
    image: '/courses/FSM_branco.png',
    title: 'Fullstack Master',
    subTitle:
      'Entregue aplicações web profissionais com autonomia e destrave a sua carreira para salários acima de 10 mil reais.',
    description:
      'Já se imaginou trabalhando em grandes projetos para empresas nacionais e estrangeiras, sendo muito bem remunerado e ainda tendo mais liberdade na carreira? A realização desse sonho pode estar mais perto do que você imagina.'
  },
  {
    id: '2',
    image: '/courses/logo_devreact_branco.png',
    title: 'DevReact',
    subTitle:
      'Domine a tecnologia que está fazendo desenvolvedores dobrarem seus salários',
    description:
      'No DevReactJS, você vai do zero à entrega aplicações profissionais em React. Você aprenderá na prática, de forma descomplicada, e estará apto para disputar as melhores vagas de emprego nas diversas empresas nacionais e estrangeiras que utilizam ReactJS em seus projetos.'
  },
  {
    id: '3',
    image: '/courses/powersites.png',
    title: 'PowerSites',
    subTitle: 'Crie sites até 10 vezes mais rápidos e 5 vezes mais lucrativos',
    description:
      'O PowerSites é um treinamento Premium que vai te ajudar a faturar na internet com um modelo de negócio simples e recorrente. Você terá tudo que precisa para entregar sites que performam e geram resultados positivos para seus futuros clientes.'
  }
]

const directToPoint = [
  {
    image: '/courses/context.png',
    title: 'ContextAPI em React',
    description:
      'Não entendo ContextAPI! Afinal, por onde começo? Existe no React Native? Posso usar ContextAPI dentro de outro? Quais os benefícios de usar? Aprenda a importância deste recurso em uma aula incrível, com exemplos reais e práticos. Entenda o funcionamento, organização e a implementação da funcionalidade com códigos diretos e explicações detalhadas.'
  },
  {
    image: '/courses/forms.png',
    title: 'Formulários em React',
    description:
      'Não entendo ContextAPI! Afinal, por onde começo? Existe no React Native? Posso usar ContextAPI dentro de outro? Quais os benefícios de usar? Aprenda a importância deste recurso em uma aula incrível, com exemplos reais e práticos. Entenda o funcionamento, organização e a implementação da funcionalidade com códigos diretos e explicações detalhadas.'
  },
  {
    image: '/courses/hooks.png',
    title: 'Tudo sobre React Hooks',
    description:
      'O que é e como funciona os famosos Hooks do React? Aprenda os conceitos e as regras que regem a construção; como criar hooks personalizados e muitas outras dúvidas esclarecidas em um conteúdo completo. Aqui você verá explicações detalhadas sobre como funcionam cada um dos hooks useState, useEffect, useCallBack, useMemo, useRef e também o Swr!'
  },
  {
    image: '/courses/framework.png',
    title: 'Tudo sobre NextJS',
    description:
      'Entenda o que é e como o NextJS é capaz de criar Rotas estáticas, Server Side Rendering (SSR), Server Side Generation (SSG) e Incremental Static Regeneration (ISR). Saiba como aplicar Revalidate, motivos de usar o "Link", observando segurança e privacidade dos dados e a utilização da API.'
  },
  {
    image: '/courses/continuous.png',
    title: 'CI/CD: Continuous Integration / Continuous Deployment',
    description:
      'Como adicionar ainda mais qualidade ao seu projeto com processo de integração contínua e entrega contínua.'
  }
]

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
    },
    pause: true
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
      <Title text='Destaques' />
      {/* <CardHero {...data?.getCourses[0]} /> */}
      {/* <Title text='Evolua ainda mais' subText='Aperfeiçoe seus conhecimentos' /> */}
      <CardSubHero
        courseOne={fullCourses[0]}
        courseTwo={fullCourses[1]}
        courseThree={fullCourses[2]}
      />
      <Title
        text='Especialize-se!'
        subText='Cursos específicos e direto ao ponto'
      />
      <div className='flex flex-col gap-4 py-4'>
        {directToPoint.map((each, i) => (
          <CardTemplate key={i} {...each} />
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
