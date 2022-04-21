import React from 'react'
import { useCourseData } from '@/context/CourseContext'
import LessonsModule from './LessonsModule'

const LessonContent = () => {
  const { getCourseModules, getCourseLessonByEnrollment } = useCourseData()

  return (
    <>
      {getCourseModules?.map((e) => (
        <LessonsModule
          key={e.id}
          isExpanded={e.id === getCourseLessonByEnrollment?.moduleId}
          {...e}
        />
      ))}
    </>
  )
}

export default LessonContent
