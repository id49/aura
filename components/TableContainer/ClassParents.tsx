import React from 'react'
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableFooter
} from '@learn49/aura-ui'
import ActionButton from '../../elements/ActionButton'
import { useRouter } from 'next/router'
import { UserAdd, UserRemove } from '../../icons'
import { useMutation } from '../../lib/graphql'

interface Props {
  data: EachParent[]
  revalidate: () => Promise<boolean>
}

interface EachParent {
  id: number
  name: string
  email: string
  existInClassroom: boolean
}

const LINK_PARENT = `
  mutation link($classroomId: Int!, $parentId: Int!) {
    panelLinkParentsClassrom(classroomId: $classroomId, parentId: $parentId)
  }
`
const UNLINK_PARENT = `
  mutation unlink($classroomId: Int!, $parentId: Int!) {
    panelUnlinkParentsClassrom(classroomId: $classroomId, parentId: $parentId)
  }
`

const TableContainerCustom = ({ data, revalidate }: Props) => {
  const router = useRouter()
  const [, link] = useMutation(LINK_PARENT)
  const [, unlink] = useMutation(UNLINK_PARENT)

  const handleLink = (parentId) => async () => {
    console.log({ parentId })
    await link({
      parentId,
      classroomId: Number(router.query.id)
    })
    await revalidate()
  }
  const handleUnlink = (parentId) => async () => {
    await unlink({
      parentId,
      classroomId: Number(router.query.id)
    })
    await revalidate()
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Responsável</TableCell>
              <TableCell>Email</TableCell>
              <TableCell className='text-center'>Ações</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((parent) => (
              <TableRow
                key={parent.id}
                className={`${parent.existInClassroom ? 'bg-purple-50' : ''}`}
              >
                <TableCell>
                  <div className='flex items-center text-sm'>
                    <div>
                      <p className='font-semibold'>{parent.name}</p>
                      {false && (
                        <p className='text-xs text-gray-600 dark:text-gray-400 flex flex-col md:flex-row gap-1'>
                          {/* TODO: Incluir as turmas */}
                          Pertencente às Turmas:
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
                  <span className='flex space-x-4 justify-end'>
                    {!parent.existInClassroom ? (
                      <ActionButton
                        alt='Vincular Responsável'
                        onClick={handleLink(parent.id)}
                      >
                        <UserAdd
                          className='w-5 h-5 text-green-500'
                          aria-hidden='true'
                        />
                      </ActionButton>
                    ) : (
                      <ActionButton
                        alt='Desvincular Responsável'
                        onClick={handleUnlink(parent.id)}
                      >
                        <UserRemove
                          className='w-5 h-5 text-red-500'
                          aria-hidden='true'
                        />
                      </ActionButton>
                    )}
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
    </>
  )
}

export default TableContainerCustom
