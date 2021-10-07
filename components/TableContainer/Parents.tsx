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
import ActionButton from '../../elements/ActionButton'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import {
  Key,
  EditIcon,
  TrashIcon,
  LinkIcon,
  Pause,
  CheckCircle
} from '../../icons'
import { useMutation } from '../../lib/graphql'

interface Props {
  data: EachParent[]
  revalidate: () => Promise<boolean>
}

interface EachParent {
  id: number
  name: string
  email: string
  active: boolean
  extraId: string
}

const EDIT_PARENT = `
  mutation panelUpdateParent($id: Int!, $active: Boolean!) {
    panelUpdateParent(input: {
        id: $id,
        active: $active
    }) {
        id
    }
}
`

const TableContainerCustom = ({ data, revalidate }: Props) => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState({ state: false, id: null })
  const [, edit] = useMutation(EDIT_PARENT)
  // const [, remove] = useMutation(REMOVE_PARENT)

  const handleRemove = (id) => () => {
    setIsModalOpen({ state: true, id })
  }

  const actionModal = async () => {
    // const result = await remove({ id })
    revalidate()
    //TODO: Como checar isso?
    // if (data && data.panelCreateUser) {
    // } else {
    //   toast.error('Ocorreu um Erro')
    // }
  }

  const handleEdit = (id) => () => {
    router.push(`/app/admin/parents/${id}/edit`)
  }

  const handleChangePasswd = (id) => () => {
    router.push(`/app/admin/parents/${id}/password`)
  }

  const handleChangeStatus = (id, active) => async () => {
    const input = { id, active }
    const result = await edit(input)
    if (result && result?.panelUpdateParent) {
      toast.success('Alteração Completada')
      revalidate()
    } else {
      toast.error('Erro ao Salvar.')
    }
  }

  return (
    <>
      <Modal
        data={isModalOpen}
        closeModal={setIsModalOpen}
        title='Deseja Excluir?'
        text='Deseja realmente excluir esse responsável?'
        action={actionModal}
      />
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Responsável</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell className='text-center'>Ações</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((parent) => (
              <TableRow key={parent.id}>
                <TableCell>
                  <div className='flex items-center text-sm'>
                    <div>
                      <p className='font-semibold'>
                        {parent.name}
                        {parent.extraId && (
                          <>
                            <br />
                            <span className='text-xs flex align-center'>
                              <LinkIcon
                                className='w-4 h-4 mr-2'
                                aria-hidden='true'
                              />
                              {parent.extraId}
                            </span>
                          </>
                        )}
                      </p>
                      {/* //TODO: Turmas do responsável */}
                      {false && (
                        <p className='text-xs text-gray-600 dark:text-gray-400 flex flex-col md:flex-row gap-1'>
                          Turmas:
                          {['Berçario 2', 'Turma Teste', 'JFL'].map(
                            (item, i) => (
                              <span
                                key={i}
                                className='bg-green-500 ml-1 px-2 rounded text-white font-bold text-center'
                              >
                                {item}
                              </span>
                            )
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className='text-sm text-gray-600'>{parent.email}</span>
                </TableCell>
                <TableCell>
                  <span className='text-sm text-gray-600'>
                    {parent.active ? 'Ativo' : 'Inativo'}
                  </span>
                </TableCell>
                <TableCell>
                  <span className='flex space-x-4 justify-end'>
                    <ActionButton
                      alt={`
                      ${parent.active ? 'Desativar' : 'Ativar'} Responsável`}
                      onClick={handleChangeStatus(parent.id, !parent.active)}
                    >
                      {parent.active && (
                        <CheckCircle
                          className='w-5 h-5 text-purple-500'
                          aria-hidden='true'
                        />
                      )}
                      {!parent.active && (
                        <Pause
                          className='w-5 h-5 text-red-500'
                          aria-hidden='true'
                        />
                      )}
                    </ActionButton>
                    <ActionButton
                      alt='Alterar Senha'
                      onClick={handleChangePasswd(parent.id)}
                    >
                      <Key className='w-5 h-5' aria-hidden='true' />
                    </ActionButton>
                    <ActionButton
                      alt='Editar Responsável'
                      onClick={handleEdit(parent.id)}
                    >
                      <EditIcon className='w-5 h-5' aria-hidden='true' />
                    </ActionButton>
                    <ActionButton
                      alt='Excluir Responsável'
                      onClick={handleRemove(parent.id)}
                    >
                      <TrashIcon className='w-5 h-5' aria-hidden='true' />
                    </ActionButton>
                  </span>
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
      {/* <div className="flex flex-col md:flex-row justify-end gap-2 mt-4 mb-4">
        <span className="font-extralight text-sm text-gray-700 dark:text-white">
          Legenda:
        </span>
        <Badge>
          <Key className="w-5 h-5 mr-1" aria-hidden="true" />
          Alterar Senha
        </Badge>
        <Badge type="warning">
          <EditIcon className="w-5 h-5 mr-1" aria-hidden="true" />
          Editar Responsável
        </Badge>
        <Badge type="danger">
          <TrashIcon className="w-5 h-5 mr-1" aria-hidden="true" />
          Excluir Responsável
        </Badge>
      </div> */}
    </>
  )
}

export default TableContainerCustom
