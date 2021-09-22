import React from 'react'
import { Button, Input } from '@learn49/aura-ui'
import Link from 'next/link'

import TableContainer from '../../../../components/TableContainer/Parents'
import CardWarning from '../../../../components/CardWarning'
import Loading from '../../../../components/Loading'

import Head from '../../../../elements/Head'
import Title from '../../../../elements/Title'

import { SearchIcon, User } from '../../../../icons'
import { useQuery } from '../../../../lib/graphql'

const GET_ALL_PARENTS = `
  query{
    panelGetParents {
      id
      name
      email
      active
      extraId
    }
  }
`

const Parents = () => {
  const { data, revalidate } = useQuery(GET_ALL_PARENTS)

  return (
    <>
      <Head title='Responsáveis' />
      <div className='flex flex-col md:flex-row justify-between mt-4'>
        <Title text='Responsáveis' />
        {/* //TODO: importação */}
        {/* {false && (
            <span>
              <Button>Importar</Button>
            </span>
          )} */}
        <span>
          <Link href='parents/create'>
            <Button block>Criar Novo Responsável</Button>
          </Link>
        </span>
      </div>

      {false && (
        <div className='flex justify-center flex-1 lg:mr-32 text-purple-700 mt-6'>
          <div className='relative w-full max-w-xl focus-within:text-purple-500'>
            <div className='absolute inset-y-0 flex items-center pl-2'>
              <SearchIcon className='w-4 h-4' aria-hidden='true' />
            </div>
            <Input
              className='pl-8 text-gray-700 rounded'
              placeholder='Pesquisar por...'
              aria-label='Pesquisar'
            />
          </div>
        </div>
      )}

      <div className='mb-8 mt-6'>
        {!data && <Loading />}
        {data && data.panelGetParents.length === 0 && (
          <CardWarning text='Nenhum Responsável Cadastrado.'>
            <User className='w-5 h-5 text-white' aria-hidden='true' />
          </CardWarning>
        )}
        {data && data.panelGetParents.length > 0 && (
          <TableContainer data={data.panelGetParents} revalidate={revalidate} />
        )}
      </div>
    </>
  )
}

export default Parents
