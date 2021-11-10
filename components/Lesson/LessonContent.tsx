import React, { useContext } from 'react'
import { CourseContext } from '@/context/CourseContext'
import LessonsModule from './LessonsModule'

const LessonContent = () => {
  const { getCourseModules } = useContext(CourseContext)

  return (
    <>
      {getCourseModules?.map((e) => (
        <LessonsModule key={e.id} {...e} />
      ))}
    </>
  )
}

export default LessonContent
