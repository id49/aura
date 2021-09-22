import { useState } from 'react'
import Link from 'next/link'
import {
  Button,
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  Badge
} from '@learn49/aura-ui'
import { useRouter } from 'next/router'
import ActionButton from '../../../../../../elements/ActionButton'
import Modal from '../../../../../../components/Modal'
import { parseISO, format } from 'date-fns'

import { AiOutlineArrowRight } from 'react-icons/ai'

// import TableContainer from '../../../../../components/TableContainer/Classroom'
import CardWarning from '../../../../../../components/CardWarning'
import Loading from '../../../../../../components/Loading'

import Head from '../../../../../../elements/Head'
import Title from '../../../../../../elements/Title'

import { AcademicCap, EditIcon, TrashIcon } from '../../../../../../icons'
import { useMutation, useQuery } from '../../../../../../lib/graphql'

const GET_ALL_SCHEDULES = (id) => `
   query{
    panelAllSchedulesByClassroom(classroomId: ${id}) {
       id
       name
       recurrency
       startDate
       endDate
       startHour
       endHour
       cameras {
         id
         name
       }
     }
   }
 `
const GET_CLASSROOM = (id) => `
 query{
   panelGetClassById(id: ${id}) {
     id
     name
     description
   }
 }
`
const DayOfWeek = ({ date }) => {
  if (!date) {
    return null
  }
  const days = {
    0: 'Todo Domingo',
    1: 'Toda Segunda-feira',
    2: 'Toda Terça-feira',
    3: 'Toda Quarta-feira',
    4: 'Toda Quinta-feira',
    5: 'Toda Sexta-feira',
    6: 'Todo Sábado'
  }
  return <>{days[format(parseISO(date), 'i')]}</>
}
const Date = ({ date }) => {
  if (!date) {
    return null
  }
  return <>{format(parseISO(date), 'dd/MM/yyyy')}</>
}
const Time = ({ time }) => {
  const timeParts = time?.split(':')
  return <>{timeParts[0] + ':' + timeParts[1]}</>
}

export const RecurringTypes = {
  0: 'Evento único',
  1: 'Todo dia',
  2: 'Segunda a sexta',
  3: 'Mesmo dia da semana da data início'
  //5: 'Mesmo dia do mês',
  //6: 'Anualmente'
}
/*
"0" - Evento único    
"1" - Diariamente
"2" - Toda Semana (Seg-Sex)
"3" - Semanalmente (dia da semana)
"4" - Mensalmente (a cada x semana) Nao Implementado
"5" - Mensalmente (No dia x do mes)
"6" - Anualmente (Em x de mes y) </option>';
*/

const REMOVE_SCHEDULE = `
  mutation panelDeleteSchedule($id: Int!) {
    panelDeleteSchedule(id: $id)
  }
`

const Classroom = () => {
  const router = useRouter()
  const { data, revalidate } = useQuery(GET_ALL_SCHEDULES(router.query.id))
  const { data: turma } = useQuery(GET_CLASSROOM(router.query.id))
  const [isModalOpen, setIsModalOpen] = useState({ state: false, id: null })

  const handleEdit = (id) => () => {
    router.push(`/app/admin/classroom/${router.query.id}/schedule/${id}/edit`)
  }

  const [, remove] = useMutation(REMOVE_SCHEDULE)

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

  return (
    <>
      <Head title='Gerenciar Agenda' />
      <div className='flex flex-col md:flex-row justify-between mt-4'>
        <div className=''>
          <Title
            text='Gerenciar agendamentos'
            subText={`Turma: ${turma?.panelGetClassById.name}`}
          />
        </div>
        <div className='flex justify-between'>
          <span>
            <Link href='/app/admin/classroom/'>
              <Button>Voltar à Turmas</Button>
            </Link>
          </span>
          <span className='ml-4'>
            <Link
              href={`/app/admin/classroom/${router.query.id}/schedule/create`}
            >
              <Button>Criar Nova Agenda</Button>
            </Link>
          </span>
        </div>
      </div>
      <Modal
        data={isModalOpen}
        closeModal={setIsModalOpen}
        title='Deseja Excluir?'
        text='Deseja realmente excluir este agendamento?'
        action={actionModal}
      />
      <div className='mb-8 mt-6'>
        {!data && <Loading />}
        {data && data.panelAllSchedulesByClassroom.length === 0 && (
          <CardWarning text='Nenhum agendamento cadastrado.'>
            <AcademicCap className='w-5 h-5 text-white' aria-hidden='true' />
          </CardWarning>
        )}
        {data && data.panelAllSchedulesByClassroom.length > 0 && (
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Agendamento</TableCell>
                  <TableCell>Período</TableCell>
                  <TableCell>Horário</TableCell>
                  <TableCell>Repetição</TableCell>
                  <TableCell className='text-right'>Opções</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.panelAllSchedulesByClassroom.map((schedule) => {
                  return (
                    <TableRow>
                      <TableCell>
                        <div className='flex items-center text-sm'>
                          <div>
                            <p className='font-semibold'>{schedule.name}</p>
                            <div className='flex flex-col'>
                              <p className='text-xs text-gray-600 dark:text-gray-400 flex flex-col md:flex-row gap-1'>
                                Câmeras:
                              </p>
                              {schedule.cameras.map((cam) => (
                                <span
                                  key={cam.id}
                                  className='bg-green-500 mb-1 px-2 rounded text-white font-bold text-center'
                                >
                                  {cam.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className='text-sm'>
                          <Date date={schedule.startDate} />
                          <AiOutlineArrowRight className='inline-block mx-1' />
                          <Date date={schedule.endDate} />
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className='text-sm'>
                          <Time time={schedule.startHour} />
                          <AiOutlineArrowRight className='inline-block mx-1' />
                          <Time time={schedule.endHour} />
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge type='success' className='text-center'>
                          {schedule.recurrency !== 3 &&
                            RecurringTypes[schedule.recurrency]}
                          {schedule.recurrency === 3 && (
                            <DayOfWeek date={schedule.startDate} />
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className='flex space-x-4 justify-end'>
                          <ActionButton
                            alt='Editar Agenda'
                            onClick={handleEdit(schedule.id)}
                          >
                            <EditIcon className='w-5 h-5' aria-hidden='true' />
                          </ActionButton>
                          <ActionButton
                            alt='Excluir Agenda'
                            onClick={handleRemove(schedule.id)}
                          >
                            <TrashIcon className='w-5 h-5' aria-hidden='true' />
                          </ActionButton>
                        </span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            <TableFooter>
              {/* <Pagination totalResults={10} resultsPerPage={4} onChange={() => { }} label="Table navigation" /> */}
            </TableFooter>
          </TableContainer>
        )}
      </div>
    </>
  )
}

export default Classroom
