import React, { useEffect, useState } from 'react'
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Label,
  Select,
  ModalBody,
  ModalFooter,
  Button
} from '@learn49/aura-ui'
import Modal from '../Modal'
import ModalCustom from '../ModalCustom'
import { useRouter } from 'next/router'
import ActionButton from '../../elements/ActionButton'
import {
  LinkIcon,
  EditIcon,
  TrashIcon,
  Email,
  DocumentDownload,
  PeopleIcon,
  Calendar
} from '../../icons'

import { useMutation, useQuery } from '../../lib/graphql'
import Loading from '../Loading'
import { useFormik } from 'formik'

interface Props {
  data: EachCamera[]
  revalidate: () => Promise<boolean>
}

interface EachCamera {
  id: number
  name: string
  description: string
  extraId: string
}

const REMOVE_CLASSROOM = `
  mutation panelDeleteClass($id: Int!) {
    panelDeleteClass(id: $id)
  }
`

const GET_ALL_LAYERS_CLASSROOMS = `
  query{
    panelGetAllLayersGroups {
      id
      name
    }
  }
`

const EDIT_CLASSROOM_EXTRA_ID = `
  mutation panelUpdateClass($id: Int!, $extraId: String!) {
    panelUpdateClass(input: {
        id: $id,
        extraId: $extraId
    }) {
        id
    }
}
`

interface LinkLayersFormValues {
  layersId: string
}
const LayersClassroomSelector = ({ id, closeModal, extraId, revalidate }) => {
  const { data } = useQuery(GET_ALL_LAYERS_CLASSROOMS)
  const [, setCurrentValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [, saveExtraId] = useMutation(EDIT_CLASSROOM_EXTRA_ID)
  const close = () => {
    closeModal({ state: false, id: null, extraId: null })
  }
  const form = useFormik({
    initialValues: {
      layersId: extraId || ''
    },
    onSubmit: async (values: LinkLayersFormValues) => {
      setIsLoading(true)
      await saveExtraId({
        id,
        extraId: values.layersId
      })
      setIsLoading(false)
      revalidate()
      close()
    }
  })
  useEffect(() => {
    setCurrentValue('')
  }, [id])

  return (
    <form onSubmit={form.handleSubmit}>
      <ModalBody>
        <Label className='mt-3'>
          <span>Turma na Layers:</span>
          <Select
            css='mt-1 border'
            value={form.values.layersId}
            name='layersId'
            onChange={form.handleChange}
          >
            <option value=''>-</option>
            {data &&
              data.panelGetAllLayersGroups &&
              data.panelGetAllLayersGroups
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((group) => {
                  return (
                    <option value={group.id} key={group.id}>
                      {group.name}
                    </option>
                  )
                })}
          </Select>
          <p className='text-xs mt-1 text-gray-500 italic'>
            Ps: os dados são sincronizados quando o responsável entra no
            Aluno.TV via Layers.
          </p>
        </Label>
      </ModalBody>
      <ModalFooter className='mb-4'>
        {(isLoading || !data) && <Loading />}
        {!isLoading && data && (
          <>
            <Button className='w-full sm:w-auto' type='submit'>
              Confirmar
            </Button>
            <Button
              className='w-full sm:w-auto'
              layout='outline'
              onClick={close}
            >
              Cancelar
            </Button>
          </>
        )}
      </ModalFooter>
    </form>
  )
}

const TableContainerCustom = ({ data, revalidate }: Props) => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState({ state: false, id: null })
  const [isLinkModalOpen, setIsLinkModalOpen] = useState({
    state: false,
    id: null,
    extraId: null
  })
  const [, remove] = useMutation(REMOVE_CLASSROOM)

  const handleRemove = (id) => () => {
    setIsModalOpen({ state: true, id })
  }
  const handleLinkLayers = (id, extraId) => () => {
    setIsLinkModalOpen({ state: true, id, extraId })
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
    router.push(`/app/admin/classroom/${id}/edit`)
  }

  const handleSchedule = (id) => () => {
    router.push(`/app/admin/classroom/${id}/schedule`)
  }

  const handleParents = (id) => () => {
    router.push(`/app/admin/classroom/${id}/parents`)
  }

  const sortedData = data.sort((a, b) => (a.name > b.name ? 1 : 0))
  return (
    <>
      <Modal
        data={isModalOpen}
        closeModal={setIsModalOpen}
        title='Deseja Excluir?'
        text='Deseja realmente excluir esta turma?'
        action={actionModal}
      />
      <ModalCustom
        data={isLinkModalOpen}
        closeModal={setIsLinkModalOpen}
        title='Vincular com grupo/turma na Layers?'
        text='Deseja realmente excluir esta turma?'
      >
        <LayersClassroomSelector
          id={isLinkModalOpen.id}
          closeModal={setIsLinkModalOpen}
          extraId={isLinkModalOpen.extraId}
          revalidate={revalidate}
        />
      </ModalCustom>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Turma</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell className='text-center'>Ações</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {sortedData.map((classroom) => (
              <TableRow key={classroom.id}>
                <TableCell>
                  <div className='flex items-center text-sm'>
                    <p>
                      <span className='font-semibold'>{classroom.name}</span>
                      {classroom.extraId && (
                        <>
                          <br />
                          <span className='text-xs flex align-center'>
                            <LinkIcon
                              className='w-4 h-4 mr-0'
                              aria-hidden='true'
                            />
                            {classroom.extraId}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className='text-sm text-gray-600'>
                    {classroom.description}
                  </span>
                </TableCell>
                <TableCell>
                  <div className='flex space-x-4 justify-end'>
                    <ActionButton
                      alt='Vincular turma'
                      onClick={handleLinkLayers(
                        classroom.id,
                        classroom.extraId
                      )}
                    >
                      <LinkIcon className='w-5 h-5' aria-hidden='true' />
                    </ActionButton>
                    {false && (
                      <ActionButton
                        alt='Enviar Email'
                        onClick={handleEdit(classroom.id)}
                      >
                        <Email className='w-5 h-5' aria-hidden='true' />
                      </ActionButton>
                    )}
                    {false && (
                      <ActionButton
                        alt='Exportar Turma'
                        onClick={handleEdit(classroom.id)}
                      >
                        <DocumentDownload
                          className='w-5 h-5'
                          aria-hidden='true'
                        />
                      </ActionButton>
                    )}
                    <ActionButton
                      alt='Gerenciar Responsável'
                      onClick={handleParents(classroom.id)}
                    >
                      <PeopleIcon className='w-5 h-5' aria-hidden='true' />
                    </ActionButton>
                    <ActionButton
                      alt='Gerenciar Agenda'
                      onClick={handleSchedule(classroom.id)}
                    >
                      <Calendar className='w-5 h-5' aria-hidden='true' />
                    </ActionButton>
                    <ActionButton
                      alt='Editar Turma'
                      onClick={handleEdit(classroom.id)}
                    >
                      <EditIcon className='w-5 h-5' aria-hidden='true' />
                    </ActionButton>
                    <ActionButton
                      alt='Excluir Turma'
                      onClick={handleRemove(classroom.id)}
                    >
                      <TrashIcon className='w-5 h-5' aria-hidden='true' />
                    </ActionButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TableContainerCustom
