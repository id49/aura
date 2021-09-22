import React from 'react'

import {
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow
} from '@learn49/aura-ui'

import CTA from '../../../components/CTA'

import Head from '../../../elements/Head'
import Title from '../../../elements/Title'
import { useAccount } from '../../../context/AccountContext'
import CardWarning from '../../../components/CardWarning'
import { PeopleIcon } from '../../../icons'
import { useRealtimeDatabase } from '../../../lib/firebase'
import { useQuery } from '../../../lib/graphql'

interface Props {
  userId: string
}

const GET_PARENT = (id) => `
  query {
    panelGetParentById(id: ${id}){
      id
      name
    }
  }

`

const UserData = ({ userId }: Props) => {
  const { data } = useQuery(GET_PARENT(userId))
  if (!data) {
    return null
  }
  return (
    <span className='px-5 py-3 bg-purple-500 rounded font-bold text-white'>
      <PeopleIcon
        className='w-4 h-4 inline-block text-white'
        aria-hidden='true'
      />{' '}
      {data?.panelGetParentById.name}
    </span>
  )
}

const Dashboard = () => {
  const account = useAccount()
  const data = useRealtimeDatabase(`/presence/alunotv/${account.id}`)
  return (
    <>
      <Head title='Dashboard' />
      <div className='mt-4 mb-6'>
        <Title text='Dashboard' />
      </div>
      {/* //TODO: Adicionar CallToAction */}
      {false && <CTA />}

      <TableContainer className='mb-8'>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Quem Está Online?</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className='flex gap-4 mt-4'>
                  {data &&
                    Object.keys(data).map((userId) => {
                      return <UserData key={userId} userId={userId} />
                    })}
                  {(!data ||
                    data === null ||
                    (data && Object.keys(data).length === 0)) && (
                    <CardWarning text='Nenhum responsável online no momento.'>
                      <PeopleIcon
                        className='w-5 h-5 text-white'
                        aria-hidden='true'
                      />
                    </CardWarning>
                  )}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Dashboard
