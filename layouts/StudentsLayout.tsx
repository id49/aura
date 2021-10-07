import React from 'react'
import { Windmill } from '@learn49/aura-ui'
import { SidebarProvider } from '../context/SidebarContext'

import Header from '../components/Header'
// import SidebarStudent from '../components/SidebarStudent'
import Footer from '../components/Footer'

interface Props {
  children: JSX.Element[]
}

const StudentLayout = ({ children }: Props) => {
  return (
    <>
      <SidebarProvider>
        {/* usePreferences */}
        <Windmill>
          <div className='flex h-screen bg-gray-50 dark:bg-gray-900'>
            {/* <SidebarStudent /> */}
            <div className='flex flex-col flex-1 w-full'>
              <Header />
              <main className='h-full overflow-y-auto'>
                <div className='container px-6 mx-auto'>{children}</div>
              </main>
              <Footer />
            </div>
          </div>
        </Windmill>
      </SidebarProvider>
    </>
  )
}

export default StudentLayout
