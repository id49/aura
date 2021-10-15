import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from 'urql'
import { useRouter } from 'next/router'
import { Button } from '@learn49/aura-ui'

import { AccountContext } from '../../../../../context/AccountContext'
import Head from '../../../../../elements/Head'
import Title from '../../../../../elements/Title'
import CardTemplate from '../../../../../components/Cards/Dashboard/CardTemplate'

const GET_COURSE = `
  query getCourse($accountId: String!, $courseId: String!) {
    getCourse(accountId: $accountId, courseId: $courseId) {
      id
      title
      description
      progress
    }
  }
`

const Courses = () => {
  const router = useRouter()
  const { id: accountId } = useContext(AccountContext)
  const { courseId, courseVersionId } = router.query

  const [result] = useQuery({
    query: GET_COURSE,
    variables: {
      accountId,
      courseId,
      courseVersionId
    }
  })
  const { data, fetching } = result

  if (fetching) {
    return (
      <div className='container px-6 py-6 mx-auto'>
        <Head title='Carregando dados...' />
        <Title text='Carregando dados...' />
      </div>
    )
  }

  return (
    <div className='container px-6 mx-auto'>
      <Head title='Fullstack Master' />
      <div className='inline-flex text-xs font-medium leading-5 rounded-full text-purple-700 bg-purple-200 mt-2 md:mt-6 py-1 px-6'>
        Explorador
      </div>
      <section className='mt-2 pb-6 flex flex-col md:flex-row md:gap-4 lg:gap-10'>
        <div className='order-1 md:order-none md:w-2/3'>
          <div className='py-3'>
            <p className='text-2xl font-extrabold text-gray-800'>
              Fullstack Master
            </p>
          </div>
          <Title text='Descrição' />
          <p className='text-sm my-2'>
            {JSON.stringify(data)}O principal objetivo de um desenvolvedor de
            software é sem dúvida construir aplicações, então que tal construir
            duas aplicação do absoluto zero usando o principal framework web do
            mercado? A proposta do curso de React é te guiar passo a passo na
            construções de duas aplicações completas, mas se você ainda está
            iniciando no mundo do React, não tem problema porque antes de
            entrarmos no desenvolvimento das aplicações, serão apresentados
            vários exercícios para ensinar os fundamentos de Webpack, React,
            Redux e todo o ecossistema envolvido no processo. Inclusive
            tecnologias de backend, como Node, Express e MongoDB. Falaremos
            desde o básico, mostrando os primeiros passos, até assuntos
            complexos como geração de formulários dinâmicos e middlewares. Curso
            100% prático, mas sempre deixando muito claro os conceitos
            essenciais para que o aluno aprenda os princípios associados à
            prática. Neste curso também você vai aprender os principais
            fundamentos e conceitos do NextJS. O NextJS nada mais é do que um
            framework para React, a principal biblioteca para desenvolvimento
            web. As principais funcionalidades do Next são a renderização
            estática e pelo lado do servidor (SSR), possuir suporte para o
            TypeScript e um serviço próprio de tratamento de rotas. Teremos uma
            aplicação para Criação, Leitura, Edição e Remoção de dados, o famoso
            CRUD (Create, Read, Update, Delete) com NextJS. Utilizando o
            Firebase e Firestore como banco de dados, utilizando também o
            TailwindCSS para criar o visual do projeto e integrando com
            TypeScript. Tudo isso será mostrado e explicado durante a seção,
            desde a criação do projeto, a instalação das dependências,
            configuração e integração com o banco de dados e também a integração
            e uso tanto do Tailwind quanto do TypeScript. Tenho certeza que esse
            curso te dará uma visão bastante robusta sobre desenvolvimento Web
            com Javascript! Seja muito bem vindo!
          </p>
          <Title text='Requisitos' />
          <p className='text-sm my-2'>
            É importante que o aluno conheça o básico da linguagem Javascript É
            importante que o aluno conheça o básico de HTML
          </p>
          <Title text='Indicado Para Quem?' />
          <p className='text-sm my-2'>
            Programadores Javascript que desejem aprender a desenvolver
            aplicações profissionais Programadores que desejem aprender React
            Programadores que desejem aprender React com Redux Programadores que
            desejem aprender a desenvolver uma aplicação do zero
          </p>
          <div className='py-20'>
            <Title
              text='Aprenda mais!'
              subText='Aprofunde seus conhecimentos'
            />
            <div className='flex flex-wrap gap-4 py-4'>
              {[0, 1, 2].map((each, i) => (
                <CardTemplate key={i} />
              ))}
            </div>
          </div>
        </div>
        <div className='order-0 md:order-none md:w-1/3'>
          <img
            className='rounded-lg'
            src='https://res.cloudinary.com/codersociety/image/fetch/f_webp,ar_16:9,c_fill,w_1140/https://cdn.codersociety.com/uploads/graphql-reasons.png'
          />
          <div className='py-5'>
            <Link href='/app/courses/learn'>
              <Button size='large' block>
                Começar Agora
              </Button>
            </Link>
            <div className='flex items-center gap-2 mt-5 md:mt-8 bg-gray-200 rounded-md py-4 px-2'>
              <Image
                className='rounded-full'
                src='/navbar/profile-empty.png'
                height={50}
                width={50}
              />
              <div className='flex flex-col text-gray-600'>
                <p className='font-thin text-sm'>Instrutor</p>
                <p className='font-semibold'>Tulio Faria</p>
              </div>
            </div>
            <div className='mt-5'>
              <Title text='Conteúdo' />
              <p className='font-thin text-sm'>Duração: 42min - 10 aulas</p>
              <div className='py-4'>
                {[1, 2, 3].map((e) => (
                  <div key={e} className='flex py-0.5'>
                    <div className='w-6'>0{e}</div>
                    <div className='font-semibold'>Tópico Aqui</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Courses
