import React from 'react'

interface Props {
  text: string
  subText?: string
}

const Title = ({ text, subText }: Props) => (
  <>
    <h1 className='text-3xl font-semibold text-gray-600'>{text}</h1>
    {subText && <p className='text-gray-500'>{subText}</p>}
  </>
)

export default Title
