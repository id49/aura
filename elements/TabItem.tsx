import React from 'react'
import classNames from 'classnames'

interface IProps {
  id: number
  title: string
  show: number
  action: any
}

const LessonTabItem = ({ id, title, show, action }: IProps) => {
  const defaultStyle = 'border-b-2 cursor-pointer px-1 pr-4 bg-gray-100'
  const styles = classNames(
    defaultStyle,
    show === id && 'border-gray-600 text-gray-700'
  )

  return (
    <div onClick={() => action(id)} className={styles}>
      {title}
    </div>
  )
}

export default LessonTabItem
