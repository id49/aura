import React from 'react'

interface Props {
  text: string
  subText?: string
}

const Title = ({ text, subText }: Props) => (
  <div className='mt-3'>
    <h1 className='text-2xl font-semibold text-gray-600'>{text}</h1>
    {subText && <p className='text-gray-500'>{subText}</p>}
  </div>
)

export default Title
