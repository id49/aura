import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import classNames from 'classnames'

interface IProps {
  nextLesson: string
  completed: boolean
  isLoadingMarkUpdate: boolean
  isLoadingNextLesson: boolean
  action: any
}

const LessonControls = ({
  completed,
  nextLesson,
  isLoadingMarkUpdate,
  isLoadingNextLesson,
  action
}: IProps) => {
  const router = useRouter()
  const { courseId, courseVersionId } = router.query
  const [isCompleted, setCompleted] = useState(completed)

  const defaultStyle =
    'w-1/2 md:w-auto text-center text-sm py-3 font-semibold rounded text-white'

  const buttonStyles = classNames(
    defaultStyle,
    'cursor-pointer',
    isCompleted
      ? 'bg-purple-500 hover:bg-purple-400 md:px-12'
      : 'bg-purple-700 hover:bg-purple-600 md:px-4'
  )

  const linkStyles = classNames(
    defaultStyle,
    'md:px-12',
    nextLesson ? 'bg-purple-700 hover:bg-purple-600 ' : 'bg-purple-300'
  )

  useEffect(() => {
    setCompleted(completed)
  }, [completed])

  const handleAction = () => {
    action(!isCompleted)
    setCompleted(!isCompleted)
  }

  const HasNextLesson = ({ children }) => {
    const url = `/app/courses/${courseId}/version/${courseVersionId}/learn/${nextLesson}`
    if (isLoadingNextLesson) {
      return <div className={linkStyles}>Buscando Aula</div>
    }
    if (nextLesson) {
      return (
        <Link href={url}>
          <a className={linkStyles}>{children}</a>
        </Link>
      )
    }
    return <div className={linkStyles}>Fim da(s) Aula(s)</div>
  }

  return (
    <div className='flex justify-between px-4 md:px-0 gap-4 bg-white'>
      <button
        onClick={handleAction}
        disabled={isLoadingMarkUpdate}
        className={buttonStyles}
      >
        {isCompleted ? 'Aula Concluida' : 'Marcar como Concluída'}
      </button>
      <HasNextLesson>Próxima Aula</HasNextLesson>
    </div>
  )
}

export default LessonControls
