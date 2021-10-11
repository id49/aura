import React from 'react'
import Image from 'next/image'
import { Input } from '@learn49/aura-ui'

import Head from '../../../elements/Head'
import Title from '../../../elements/Title'

const Learn = () => {
  return (
    <>
      <Head title='Fullstack Master' />
      <section className='pb-6 flex flex-col lg:flex-row xl:container xl:mx-auto md:gap-2'>
        <div className='lg:w-2/3 xl:w-3/4 m-2'>
          <div className='h-96 bg-gray-200 flex place-items-center justify-center'>
            <p>Video</p>
          </div>
          <div className='py-3'>
            <p className='text-2xl font-extrabold text-gray-800'>
              Fullstack Master
            </p>
            <p className='font-thin text-sm'>Duração: 42min - 10 aulas</p>
          </div>
          <div className='flex items-center gap-2 pb-4'>
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
          <Title text='Descrição' />
          <p className='text-sm my-2'>
            O principal objetivo de um desenvolvedor de software é sem dúvida
            construir aplicações, então que tal construir duas aplicação do
            absoluto zero usando o principal framework web do mercado? A
            proposta do curso de React é te guiar passo a passo na construções
            de duas aplicações completas, mas se você ainda está iniciando no
            mundo do React, não tem problema porque antes de entrarmos no
            desenvolvimento das aplicações, serão apresentados vários exercícios
            para ensinar os fundamentos de Webpack, React, Redux e todo o
            ecossistema envolvido no processo. Inclusive tecnologias de backend,
            como Node, Express e MongoDB. Falaremos desde o básico, mostrando os
            primeiros passos, até assuntos complexos como geração de formulários
            dinâmicos e middlewares. Curso 100% prático, mas sempre deixando
            muito claro os conceitos essenciais para que o aluno aprenda os
            princípios associados à prática. Neste curso também você vai
            aprender os principais fundamentos e conceitos do NextJS. O NextJS
            nada mais é do que um framework para React, a principal biblioteca
            para desenvolvimento web. As principais funcionalidades do Next são
            a renderização estática e pelo lado do servidor (SSR), possuir
            suporte para o TypeScript e um serviço próprio de tratamento de
            rotas. Teremos uma aplicação para Criação, Leitura, Edição e Remoção
            de dados, o famoso CRUD (Create, Read, Update, Delete) com NextJS.
            Utilizando o Firebase e Firestore como banco de dados, utilizando
            também o TailwindCSS para criar o visual do projeto e integrando com
            TypeScript. Tudo isso será mostrado e explicado durante a seção,
            desde a criação do projeto, a instalação das dependências,
            configuração e integração com o banco de dados e também a integração
            e uso tanto do Tailwind quanto do TypeScript. Tenho certeza que esse
            curso te dará uma visão bastante robusta sobre desenvolvimento Web
            com Javascript! Seja muito bem vindo!
          </p>
        </div>
        <div className='lg:w-1/3 xl:w-1/4 mt-2'>
          <div className='py-2 px-2 bg-gray-200 rounded-l-xl'>
            <div className='mt-5'>
              <Title text='Conteúdo' />

              <div className='py-4'>
                {[1, 2, 3].map((e) => (
                  <div key={e} className='flex py-0.5 items-center gap-2'>
                    {e % 2 === 0 && <Input css='' type='checkbox' checked />}
                    {e % 2 !== 0 && <Input css='' type='checkbox' />}
                    <div className='font-semibold flex'>
                      <div className='w-6'>0{e}.</div> Tópico Aqui
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Learn
