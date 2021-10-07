import React, { useState } from 'react'

import * as Icons from '../../icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Transition } from '@learn49/aura-ui'
import { useQuery } from '../../lib/graphql'

import Logo from '../../elements/Logo'

const GET_SCHEDULES = `
  query {
    getAllSchedules{
      hour
      classrooms {
        id
        name
        schedules {
          id
          name
          startHour
          endHour
          cameras {
            id
            name
          }
        }
      }
    }
  }
`

function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

const timeFormat = (time) => {
  const timeParts = time.split(':')
  return `${timeParts[0]}:${timeParts[1]}`
}

const SubMenu = ({ schedule }) => {
  const router = useRouter()
  const currentSchedule = router.query.s
  const currentCamera = router.query.c
  const [isDropdownMenuOpen] = useState(true)
  const checkSelected = (schedule, camera) => {
    if (
      schedule === Number(currentSchedule) &&
      camera === Number(currentCamera)
    ) {
      return ' bg-cool-gray-300 bold '
    }
    return ''
  }
  return (
    <div className='border bg-gray-100'>
      <h3 className='text-sm bg-cool-gray-200 p-2'>
        <Icon icon='CalendarSchedule' className='w-3 h-3 inline-block' />{' '}
        <span className='ml-2'>
          {timeFormat(schedule.startHour)} - {timeFormat(schedule.endHour)}
        </span>
      </h3>
      <Transition
        show={isDropdownMenuOpen}
        enter='transition-all ease-in-out duration-300'
        enterFrom='opacity-25 max-h-0'
        enterTo='opacity-100 max-h-xl'
        leave='transition-all ease-in-out duration-300'
        leaveFrom='opacity-100 max-h-xl'
        leaveTo='opacity-0 max-h-0'
      >
        <ul
          className='space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md  dark:text-gray-400 dark:bg-gray-900'
          aria-label='submenu'
        >
          <li className='transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200'>
            <div className='w-full'>
              <ul>
                {schedule.cameras.map((camera) => (
                  <li key={camera.id}>
                    <Link href={`/app/parents?s=${schedule.id}&c=${camera.id}`}>
                      <a
                        className={
                          'block p-2 hover:bg-red-50 ' +
                          checkSelected(schedule.id, camera.id)
                        }
                      >
                        <Icon
                          icon='VideoCamera'
                          className='w-5 h-5 inline-block'
                        />{' '}
                        {camera.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </Transition>
    </div>
  )
}

const SidebarContent = () => {
  const { data } = useQuery(GET_SCHEDULES, {
    refreshInterval: 60 * 1000
  })

  return (
    <div className='text-gray-500 dark:text-gray-400'>
      <Logo />

      {!data && <p>Carregando...</p>}
      {data &&
        data.getAllSchedules &&
        data.getAllSchedules.classrooms &&
        data.getAllSchedules.classrooms.length === 0 && (
          <p className='font-bold m-2 p-2 bg-yellow-100 border rounded-lg text-xs'>
            Nenhuma câmera disponível no momento.
          </p>
        )}
      {data && (
        <>
          <span className='hidden'>{data.getAllSchedules.hour}</span>
          <ul className='mt-6'>
            {data.getAllSchedules.classrooms.map((classroom) => {
              return (
                <li className='relative px-6 py-3' key={classroom.name}>
                  <a className='inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200'>
                    {false && (
                      <span
                        className='absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg'
                        aria-hidden='true'
                      ></span>
                    )}
                    <Icon
                      className='w-5 h-5'
                      aria-hidden='true'
                      icon={'AcademicCap2'}
                    />
                    <span className='ml-2'>{classroom.name}</span>
                  </a>
                  {classroom.schedules.map((schedule) => (
                    <SubMenu schedule={schedule} />
                  ))}
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}

export default SidebarContent
