import React from 'react'
import { Button, Input } from '@learn49/aura-ui'
import Link from 'next/link'

import TableContainer from '../../../../components/TableContainer/Classroom'
import CardWarning from '../../../../components/CardWarning'
import Loading from '../../../../components/Loading'

import Head from '../../../../elements/Head'
import Title from '../../../../elements/Title'

import { SearchIcon, AcademicCap } from '../../../../icons'
import { useQuery } from '../../../../lib/graphql'

const GET_ALL_CLASSROOMS = `
  query{
    panelGetClasses {
      id
      name
      description
      extraId
    }
  }
`

const Classroom = () => {
  const { data, revalidate } = useQuery(GET_ALL_CLASSROOMS)

  return (
    <>
      <Head title='Turmas' />
      <div className='flex flex-col md:flex-row justify-between mt-4'>
        <Title text='Turmas' />
        <Link href='classroom/create'>
          <Button>Criar Nova Turma</Button>
        </Link>
      </div>

      {false && (
        <div className='flex justify-center flex-1 lg:mr-32 text-purple-700 mt-6'>
          <div className='relative w-full max-w-xl focus-within:text-purple-500'>
            <div className='absolute inset-y-0 flex items-center pl-2'>
              <SearchIcon className='w-4 h-4' aria-hidden='true' />
            </div>
            <Input
              css='pl-8 text-gray-700 rounded'
              placeholder='Pesquisar por...'
              aria-label='Pesquisar'
            />
          </div>
        </div>
      )}
      <div className='mb-8 mt-6'>
        {!data && <Loading />}
        {data && data.panelGetClasses.length === 0 && (
          <CardWarning text='Nenhuma Turma Cadastrada.'>
            <AcademicCap className='w-5 h-5 text-white' aria-hidden='true' />
          </CardWarning>
        )}
        {data && data.panelGetClasses.length > 0 && (
          <TableContainer data={data.panelGetClasses} revalidate={revalidate} />
        )}
      </div>
    </>
  )
}

export default Classroom
