import React from 'react'
import classNames from 'classnames'

export type BadgeTypes = 'default'
interface IProps {
  text: string
  type?: BadgeTypes
}

const Logo = ({ text, type = 'default' }: IProps) => {
  const defaultWrapper =
    'inline-flex text-xs font-medium leading-5 rounded-full mt-2 md:mt-6 py-1 px-6'
  const typeModels = {
    default: 'text-purple-700 bg-purple-200'
  }[type]
  const Styles = classNames(defaultWrapper, typeModels)

  return <div className={Styles}>{text}</div>
}

export default Logo
