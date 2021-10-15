import { Card, CardBody } from '@learn49/aura-ui'
import Image from 'next/image'
import Link from 'next/link'

interface CourseValues {
  id: string
  title: string
  description: string
}

interface PropsValues {
  courseOne: CourseValues
  courseTwo: CourseValues
  courseThree: CourseValues
}

const CardSubHero = ({ courseOne, courseTwo, courseThree }: PropsValues) => (
  <div className='flex flex-col md:flex-row gap-4 my-4 w-full'>
    {[courseOne, courseTwo, courseThree].map(({ id, title, description }) => (
      <Link key={id} href='/app/courses'>
        <Card className='py-4 hover:bg-gray-200 cursor-pointer'>
          <img src='/img/implementacionApi.png' />
          <CardBody>
            <p className='font-bold text-2xl text-gray-600 dark:text-gray-300'>
              {title}
            </p>
            <div className='flex items-center gap-2 my-2'>
              <Image
                className='rounded-full'
                src='/navbar/profile-empty.png'
                height={40}
                width={40}
              />
              <p className='font-semibold text-gray-600'>Tulio Faria</p>
            </div>
            <p className='text-gray-600 dark:text-gray-400'>{description}</p>
          </CardBody>
        </Card>
      </Link>
    ))}
  </div>
)

export default CardSubHero
