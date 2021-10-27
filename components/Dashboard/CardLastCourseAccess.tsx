import { Card, CardBody } from '@learn49/aura-ui'
import Link from 'next/link'
import Image from 'next/image'

import Title from '@/elements/Title'
import fullCourses from '@/data/fullCourses.json'

interface PropsValues {
  courseId: string
  moduleTitle: string
  lessonTitle: string
  courseVersionId: string
  defaultVersion: string
}

const LastCourseAccess = ({
  courseId,
  moduleTitle,
  lessonTitle,
  courseVersionId,
  defaultVersion
}: PropsValues) => (
  <>
    <Title
      text='Continue Assistindo'
      subText='Não perca o foco! Continue de onde parou.'
    />
    <Link
      href={`
    /app/courses/${courseId}/version/${courseVersionId || defaultVersion}`}
    >
      <Card
        className='flex flex-col lg:flex-row w-full mt-2 mb-4 py-10 lg:py-20 px-4 lg:px-10 gap-4 cursor-pointer'
        style={{
          backgroundColor: '#000024'
        }}
      >
        <div className='flex items-center justify-center py-8 mr-4 text-white'>
          <Image
            width={220}
            height={70}
            src={fullCourses[courseId].image}
            alt={fullCourses[courseId].title}
            layout='fixed'
            objectFit='contain'
          />
        </div>
        <CardBody>
          <p className='font-bold text-2xl lg:text-3xl text-green-100 hover:text-white'>
            {moduleTitle}
          </p>
          <p className='text-gray-200 mt-2'>Assunto: {lessonTitle}</p>
        </CardBody>
      </Card>
    </Link>
  </>
)

export default LastCourseAccess
