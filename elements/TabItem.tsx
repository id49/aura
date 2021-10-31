import React from 'react'
import classNames from 'classnames'

interface IProps {
  id: number
  title: string
  show: number
  action: any
}

const LessonTabItem = ({ id, title, show, action }: IProps) => {
  const defaultStyle = 'border-b-2 cursor-pointer px-1 pr-4'
  const styles = classNames(
    defaultStyle,
    'bg-gray-100',
    show === id && 'text-white bg-purple-700 border-gray-600'
  )

  return (
    <div onClick={() => action(id)} className={styles}>
      {title}
    </div>
  )
}

export default LessonTabItem
