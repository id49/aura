import React from 'react'

import * as Icons from '../../icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Logo from '../../elements/Logo'

const routes = [
  {
    path: '/app/admin',
    icon: 'HomeIcon',
    name: 'Dashboard'
  },
  {
    path: '/app/admin/cameras',
    icon: 'VideoCamera',
    name: 'Câmeras'
  },
  {
    path: '/app/admin/admins',
    icon: 'PeopleIcon2',
    name: 'Administradores'
  },
  {
    path: '/app/admin/parents',
    icon: 'User',
    name: 'Responsáveis'
  },
  {
    path: '/app/admin/classroom',
    icon: 'AcademicCap2',
    name: 'Turmas'
  },
  {
    path: '/app/admin/configs',
    icon: 'FormsIcon',
    name: 'Configurações'
  },
  {
    path: '/app/admin/stats',
    icon: 'ChartsIcon',
    name: 'Estatísticas'
  }
]

function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

const SidebarContent = () => {
  const { pathname } = useRouter()

  const isItemMenuSelected = (path) => {
    if (pathname === '/app/admin' && path === '/app/admin') {
      return true
    }
    return path !== '/app/admin' && pathname.startsWith(path)
  }
  return (
    <div className='text-gray-500 dark:text-gray-400'>
      <Logo />
      <ul className='mt-6'>
        {routes.map((route) => (
          <li className='relative px-6 py-3' key={route.name}>
            <Link href={route.path}>
              <a className='inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200'>
                {isItemMenuSelected(route.path) && (
                  <span
                    className='absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg'
                    aria-hidden='true'
                  ></span>
                )}
                <Icon
                  className='w-5 h-5'
                  aria-hidden='true'
                  icon={route.icon}
                />
                <span className='ml-4'>{route.name}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SidebarContent
