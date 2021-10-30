import React from 'react'
import classNames from 'classnames'

export type BadgeTypes = 'default'
interface IProps {
  text: string
  type?: BadgeTypes
  className?: string
}

const Logo = ({ text, type = 'default', className }: IProps) => {
  const defaultWrapper =
    'inline-flex text-xs font-medium leading-5 rounded-full py-1 px-6'
  const typeModels = {
    default: 'text-purple-700 bg-purple-200'
  }[type]
  const styles = classNames(defaultWrapper, typeModels, className)

  return <div className={styles}>{text}</div>
}

export default Logo
