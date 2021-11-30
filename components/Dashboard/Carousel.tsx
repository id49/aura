import React from 'react'
import { Carousel } from '@trendyol-js/react-carousel'
import Image from 'next/image'
import Link from 'next/link'

interface LabelsValues {
  label: string
  isPrivate: boolean
}

interface CourseValues {
  id: string
  version: string
  image: string
  title: string
  subTitle?: string
  description: string
  labels?: LabelsValues[]
}

interface PropsValues {
  courseOne: CourseValues
  courseTwo: CourseValues
  courseThree: CourseValues
}

const Highlight = ({
  id,
  title,
  labels,
  version,
  image,
  description
}: CourseValues) => {
  const labelList = labels.filter((e) => !e.isPrivate)
  return (
    <Link key={id} href={`/app/courses/${id}/version/${version}`}>
      <div className='m-1 flex flex-col self-stretch'>
        <div className='bg-cool-gray-800 h-40 flex items-center justify-center'>
          <Image
            width={180}
            height={56}
            src={image}
            alt={title}
            className='h-14 px-2'
          />
        </div>
        <div className='bg-white hover:bg-purple-100 pt-4 pb-8'>
          {labelList.length > 0 &&
            labelList.map(({ label }, id) => (
              <div
                key={id}
                className='text-gray-700 font-semibold text-md px-4 pb-4'
              >
                {label}
              </div>
            ))}
          <div className='text-gray-600 font-mono text-xs px-4 line-clamp-5'>
            {description}
          </div>
        </div>
      </div>
    </Link>
  )
}

const CarouselDest = ({ courseOne, courseTwo, courseThree }: PropsValues) => {
  return (
    <div className='pt-2'>
      <Carousel show={2.5} slide={2} transition={0.5} swiping={true}>
        {[courseOne, courseTwo, courseThree].map((course) => (
          <Highlight key={course.id} {...course} />
        ))}
      </Carousel>
    </div>
  )
}

export default CarouselDest
