import React from 'react'
import Link from 'next/link'

import Head from '../elements/Head'
import { ForbiddenIcon } from '../icons'

const Page404 = () => (
  <>
    <Head title='Página Não Encontrada' />
    <div className='flex flex-col items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900'>
      <ForbiddenIcon
        className='w-12 h-12 mt-8 text-purple-200'
        aria-hidden='true'
      />
      <h1 className='text-6xl font-semibold text-gray-700 dark:text-gray-200 mt-4'>
        Erro 404
      </h1>
      <p className='text-gray-700 dark:text-gray-300 my-4'>
        Página Não Encontrada.
      </p>
      <p>
        <Link href='/'>
          <a className='text-purple-600 hover:underline dark:text-purple-300'>
            Voltar
          </a>
        </Link>
      </p>
    </div>
  </>
)

export default Page404
