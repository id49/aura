import React from 'react'

interface Props {
  text: string
  children: JSX.Element
}

const CardWarning = ({ text, children }: Props) => {
  return (
    <div className='mb-8 mt-6 flex w-full mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800'>
      <div className='flex items-center justify-center w-12 bg-yellow-400'>
        {children}
      </div>
      <div className='px-4 py-5 -mx-3'>
        <div className='mx-3'>
          <p className='text-sm text-gray-600 dark:text-gray-200'>{text}</p>
        </div>
      </div>
    </div>
  )
}

export default CardWarning
