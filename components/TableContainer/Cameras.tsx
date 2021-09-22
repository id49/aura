import React, { useState } from 'react'
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableFooter
} from '@learn49/aura-ui'
import Modal from '../Modal'
import { useRouter } from 'next/router'
import ActionButton from '../../elements/ActionButton'
import { Computer, EditIcon, TrashIcon } from '../../icons'

import { useMutation } from '../../lib/graphql'

interface Props {
  data: EachCamera[]
  revalidate: () => Promise<boolean>
}

interface EachCamera {
  id: number
  name: string
  friendlyName: string
}

const REMOVE_CAMERA = `
  mutation panelDeleteCamera($id: Int!) {
    panelDeleteCamera(id: $id)
  }
`

const TableContainerCustom = ({ data, revalidate }: Props) => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState({ state: false, id: null })
  const [user, remove] = useMutation(REMOVE_CAMERA)

  const handleRemove = (id) => () => {
    setIsModalOpen({ state: true, id })
  }

  const actionModal = async (id) => {
    const result = await remove({ id })
    revalidate()
    //TODO: Como checar isso?
    // if (data && data.panelCreateUser) {
    // } else {
    //   toast.error('Ocorreu um Erro')
    // }
  }

  const handleEdit = (id) => () => {
    router.push(`/app/admin/cameras/${id}/edit`)
  }

  const handleTest = (id) => () => {
    router.push(`/app/admin/cameras/${id}/test`)
  }

  return (
    <>
      <Modal
        data={isModalOpen}
        closeModal={setIsModalOpen}
        title='Deseja Excluir?'
        text='Deseja realmente excluir esta câmera?'
        action={actionModal}
      />
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Câmera</TableCell>
              <TableCell>Exibição</TableCell>
              <TableCell className='text-center'>Ações</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((camera) => (
              <TableRow key={camera.id}>
                <TableCell>
                  <div className='flex items-center text-sm'>
                    <p className='font-semibold'>{camera.name}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className='text-sm text-gray-600'>
                    {camera.friendlyName}
                  </span>
                </TableCell>
                <TableCell>
                  <div className='flex space-x-4 justify-end'>
                    <ActionButton
                      alt='Testar Câmera'
                      onClick={handleTest(camera.id)}
                    >
                      <Computer className='w-5 h-5' aria-hidden='true' />
                    </ActionButton>
                    <ActionButton
                      alt='Editar Câmera'
                      onClick={handleEdit(camera.id)}
                    >
                      <EditIcon className='w-5 h-5' aria-hidden='true' />
                    </ActionButton>
                    <ActionButton
                      alt='Excluir Câmera'
                      onClick={handleRemove(camera.id)}
                    >
                      <TrashIcon className='w-5 h-5' aria-hidden='true' />
                    </ActionButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          {/* <Pagination
            totalResults={20}
            resultsPerPage={10}
            onChange={() => { }}
            label="Navegação"
          /> */}
        </TableFooter>
      </TableContainer>
      {/* <div className="flex flex-col md:flex-row justify-end gap-2 mb-4">
        <span className="font-extralight text-sm text-gray-700 dark:text-white">
          Legenda:
        </span>
        <Badge>
          <Computer className="w-5 h-5 mr-1" aria-hidden="true" />
          Testar Câmera
        </Badge>
        <Badge type="warning">
          <EditIcon className="w-5 h-5 mr-1" aria-hidden="true" />
          Editar Câmera
        </Badge>
        <Badge type="danger">
          <TrashIcon className="w-5 h-5 mr-1" aria-hidden="true" />
          Excluir Câmera
        </Badge>
      </div> */}
    </>
  )
}

export default TableContainerCustom
