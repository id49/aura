import Image from 'next/image'
import classNames from 'classnames'

export type CardTypes = 'default' | 'clean'
interface IProps {
  type?: CardTypes
}

const CardInstructor = ({ type = 'default' }: IProps) => {
  // <div className='pb-4'>
  const defaultWrapper = 'flex items-center gap-2'
  const typeModels = {
    default: 'mt-5 md:mt-8 bg-gray-200 rounded-md py-4 px-2',
    clean: 'pb-4'
  }[type]
  const Styles = classNames(defaultWrapper, typeModels)

  return (
    <div className={Styles}>
      <Image
        className='rounded-full'
        src='/tuliofaria.jpg'
        height={50}
        width={50}
        alt='Tulio Faria'
      />
      <div className='flex flex-col text-gray-600'>
        <p className='font-thin text-sm'>Instrutor</p>
        <p className='font-semibold'>Tulio Faria</p>
      </div>
    </div>
  )
}

export default CardInstructor
