import React, { useState } from 'react'
import Link from 'next/link'
import { BellIcon, OutlineLogoutIcon, OutlineCogIcon, User } from '../icons'
import { Avatar, Badge, Dropdown, DropdownItem } from '@learn49/aura-ui'

// import { SidebarContext } from '../context/SidebarContext'
import { useAuth } from '../context/AuthContext'
import Logo from '../elements/Logo'

const Navbar = () => {
  const { user, signOut } = useAuth()
  // const { mode, toggleMode } = useContext(WindmillContext)
  // const { toggleSidebar } = useContext(SidebarContext)

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  return (
    <header className='z-40 py-2 bg-white shadow-bottom dark:bg-gray-800'>
      <div className='container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300'>
        {/* <!-- Mobile hamburger --> */}
        {/* <button
          className='p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple'
          onClick={toggleSidebar}
          aria-label='Menu'
        >
          <MenuIcon className='w-6 h-6' aria-hidden='true' />
        </button> */}
        <Link href='/app'>
          <a className='pt-2'>
            <Logo />
          </a>
        </Link>
        <ul className='flex items-center flex-shrink-0 space-x-6'>
          {/* <!-- Theme toggler --> */}
          {/* <li className='flex'>
            <button
              className='rounded-md focus:outline-none focus:shadow-outline-purple'
              onClick={toggleMode}
              aria-label='Toggle color mode'
            >
              {mode === 'dark' ? (
                <SunIcon className='w-5 h-5' aria-hidden='true' />
              ) : (
                <MoonIcon className='w-5 h-5' aria-hidden='true' />
              )}
            </button>
          </li> */}
          {/* <!-- Notifications menu --> */}

          {/* <li className='relative'>
            <button
              className='relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple'
              onClick={handleNotificationsClick}
              aria-label='Notifications'
              aria-haspopup='true'
            >
              <BellIcon className='w-6 h-6' aria-hidden='true' />
              <span
                aria-hidden='true'
                className='absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800'
              ></span>
            </button>
            <Dropdown
              align='right'
              isOpen={isNotificationsMenuOpen}
              onClose={() => setIsNotificationsMenuOpen(false)}
            >
              <DropdownItem tag='a' href='#' className='justify-between'>
                <span>Messages</span>
                <Badge type='danger'>13</Badge>
              </DropdownItem>
              <DropdownItem tag='a' href='#' className='justify-between'>
                <span>Sales</span>
                <Badge type='danger'>2</Badge>
              </DropdownItem>
              <DropdownItem onClick={() => alert('Alerts!')}>
                <span>Alerts</span>
              </DropdownItem>
            </Dropdown>
          </li> */}
          {/* <li className='relative'>
            <button
              className='relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple'
              onClick={handleNotificationsClick}
              aria-label='Notifications'
              aria-haspopup='true'
            >
              <BellIcon className='w-6 h-6' aria-hidden='true' />
              <span
                aria-hidden='true'
                className='absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800'
              ></span>
            </button>
            <Dropdown
              align='right'
              isOpen={false}
              onClose={() => setIsNotificationsMenuOpen(false)}
            >
              <DropdownItem tag='a' href='#' className='justify-between'>
                <span>FAQ</span>
              </DropdownItem>
              <DropdownItem tag='a' href='#' className='justify-between'>
                <span>SUPORTE</span>
              </DropdownItem>
              <DropdownItem onClick={() => alert('Alerts!')}>
                <span>Alerts</span>
              </DropdownItem>
            </Dropdown>
          </li> */}
          {/* <!-- Profile menu --> */}
          <li className='relative'>
            <button
              className='rounded-full focus:shadow-outline-purple focus:outline-none'
              onClick={handleProfileClick}
              aria-label='Account'
              aria-haspopup='true'
            >
              {user.profilePicture && (
                <Avatar
                  className='align-middle w-6 h-6'
                  size='regular'
                  src={user.profilePicture}
                  alt={user.firstName}
                  aria-hidden='true'
                />
              )}
              {!user.profilePicture && (
                <User
                  className='w-6 h-6 bg-purple-600 rounded-full text-white p-1'
                  aria-hidden='true'
                />
              )}
            </button>
            <Dropdown
              align='right'
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              {/* <DropdownItem tag='a' href='#'>
                <OutlinePersonIcon
                  className='w-4 h-4 mr-3'
                  aria-hidden='true'
                />
                <span>Profile</span>
              </DropdownItem>*/}
              <DropdownItem>
                <Link href='/app/profile'>
                  <a className='flex items-center'>
                    <OutlineCogIcon
                      className='w-4 h-4 mr-3'
                      aria-hidden='true'
                    />
                    <span>Perfil</span>
                  </a>
                </Link>
              </DropdownItem>
              <DropdownItem onClick={signOut}>
                <div className='flex items-center'>
                  <OutlineLogoutIcon
                    className='w-4 h-4 mr-3'
                    aria-hidden='true'
                  />
                  <span>Deslogar</span>
                </div>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Navbar
