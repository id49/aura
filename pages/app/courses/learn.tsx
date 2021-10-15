import React, { useState } from 'react'
import Image from 'next/image'
import { Input, Transition } from '@learn49/aura-ui'

import Head from '../../../elements/Head'
import Title from '../../../elements/Title'

const Learn = () => {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false)

  const handleDropdownMenuClick = () => {
    setIsDropdownMenuOpen(!isDropdownMenuOpen)
  }

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
          <div className='py-2 px-2 bg-gray-200 rounded-l-xl xl:rounded-xl'>
            <div className='mt-1'>
              <Title text='Conteúdo' />
              <div className='py-2'>
                <div className='relative px-1 py-3 bg-purple-300 rounded-lg hover:bg-purple-400'>
                  <button
                    className='inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 pr-3'
                    onClick={handleDropdownMenuClick}
                    aria-haspopup='true'
                  >
                    <span className='inline-flex items-center'>
                      <span className='ml-1'>Topico</span>
                    </span>
                    <Image
                      src={'/forms/dropdown.svg'}
                      width={16}
                      height={16}
                      alt='Show more'
                    />
                  </button>
                  <Transition
                    show={isDropdownMenuOpen}
                    enter='transition-all ease-in-out duration-300'
                    enterFrom='opacity-25 max-h-0'
                    enterTo='opacity-100 max-h-xl'
                    leave='transition-all ease-in-out duration-300'
                    leaveFrom='opacity-100 max-h-xl'
                    leaveTo='opacity-0 max-h-0'
                  >
                    <ul
                      className='p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900'
                      aria-label='submenu'
                    >
                      {[1, 2, 3].map((e) => (
                        <div
                          key={e}
                          className='flex items-center gap-2 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer'
                        >
                          {e % 2 === 0 && (
                            <Input css='' type='checkbox' checked />
                          )}
                          {e % 2 !== 0 && <Input css='' type='checkbox' />}
                          <div className='font-semibold flex'>
                            <div className='w-6'>0{e}.</div> Tópico Aqui
                          </div>
                        </div>
                      ))}
                    </ul>
                  </Transition>
                </div>
                <div className='relative px-1 py-3 mt-1 bg-purple-300 rounded-lg hover:bg-purple-400'>
                  <button
                    className='inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 pr-3'
                    onClick={handleDropdownMenuClick}
                    aria-haspopup='true'
                  >
                    <span className='inline-flex items-center'>
                      <span className='ml-1'>Topico</span>
                    </span>
                    <Image
                      src={'/forms/dropdown.svg'}
                      width={16}
                      height={16}
                      alt='Show more'
                    />
                  </button>
                  <Transition
                    show={isDropdownMenuOpen}
                    enter='transition-all ease-in-out duration-300'
                    enterFrom='opacity-25 max-h-0'
                    enterTo='opacity-100 max-h-xl'
                    leave='transition-all ease-in-out duration-300'
                    leaveFrom='opacity-100 max-h-xl'
                    leaveTo='opacity-0 max-h-0'
                  >
                    <ul
                      className='p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900'
                      aria-label='submenu'
                    >
                      {[1, 2, 3].map((e) => (
                        <div
                          key={e}
                          className='flex items-center gap-2 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer'
                        >
                          {e % 2 === 0 && (
                            <Input css='' type='checkbox' checked />
                          )}
                          {e % 2 !== 0 && <Input css='' type='checkbox' />}
                          <div className='font-semibold flex'>
                            <div className='w-6'>0{e}.</div> Tópico Aqui
                          </div>
                        </div>
                      ))}
                    </ul>
                  </Transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Learn
