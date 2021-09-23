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
import CardWarning from '../../../components/CardWarning'

const Dashboard = () => {
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
                  <CardWarning text='Nenhum responsável online no momento.'>
                    <>a</>
                  </CardWarning>
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
