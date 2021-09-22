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
  CheckCircle,
  Pause
} from '../../icons'
import { useMutation } from '../../lib/graphql'
interface Props {
  data: EachAdmin[]
  revalidate: () => Promise<boolean>
}

interface EachAdmin {
  id: number
  name: string
  email: string
  active: boolean
  extraId: string
}

const REMOVE_ADMIN = `
  mutation panelDeleteAdmin($id: Int!) {
    panelDeleteAdmin(id: $id)
  }
`

const EDIT_ADMIN = `
  mutation panelUpdateAdmin($id: Int!, $active: Boolean!) {
    panelUpdateAdmin(input: {
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
  const [, edit] = useMutation(EDIT_ADMIN)
  const [, remove] = useMutation(REMOVE_ADMIN)

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
    router.push(`/app/admin/admins/${id}/edit`)
  }

  const handleChangePasswd = (id) => () => {
    router.push(`/app/admin/admins/${id}/password`)
  }

  const handleChangeStatus = (id, active) => async () => {
    const input = { id, active }
    const result = await edit(input)
    if (result && result?.panelUpdateAdmin) {
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
        text='Deseja realmente excluir este usuário administrador?'
        action={actionModal}
      />
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell className='text-center'>Ações</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>
                  <div className='flex items-center text-sm'>
                    <p>
                      <span className='font-semibold'>{admin.name}</span>
                      {admin.extraId && (
                        <>
                          <br />
                          <span className='text-xs flex align-center'>
                            <LinkIcon
                              className='w-4 h-4 mr-2'
                              aria-hidden='true'
                            />
                            {admin.extraId}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className='text-sm text-gray-600'> {admin.email}</span>
                </TableCell>
                <TableCell>
                  <span className='text-sm text-gray-600'>
                    {' '}
                    {admin.active ? 'Ativo' : 'Inativo'}
                  </span>
                </TableCell>
                <TableCell>
                  <span className='flex space-x-4 justify-end'>
                    <ActionButton
                      alt={`${
                        admin.active ? 'Desativar' : 'Ativar'
                      } Administrador`}
                      onClick={handleChangeStatus(admin.id, !admin.active)}
                    >
                      {admin.active && (
                        <CheckCircle
                          className='w-5 h-5 text-purple-500'
                          aria-hidden='true'
                        />
                      )}
                      {!admin.active && (
                        <Pause
                          className='w-5 h-5 text-red-500'
                          aria-hidden='true'
                        />
                      )}
                    </ActionButton>
                    <ActionButton
                      alt='Alterar Senha'
                      onClick={handleChangePasswd(admin.id)}
                    >
                      <Key className='w-5 h-5' aria-hidden='true' />
                    </ActionButton>
                    <ActionButton
                      alt='Editar Administrador'
                      onClick={handleEdit(admin.id)}
                    >
                      <EditIcon className='w-5 h-5' aria-hidden='true' />
                    </ActionButton>
                    <ActionButton
                      alt='Excluir Administrador'
                      onClick={handleRemove(admin.id)}
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
          Editar Administador
        </Badge>
        <Badge type="danger">
          <TrashIcon className="w-5 h-5 mr-1" aria-hidden="true" />
          Excluir Administador
        </Badge>
      </div> */}
    </>
  )
}

export default TableContainerCustom
