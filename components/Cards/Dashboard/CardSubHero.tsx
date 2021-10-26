import { Card, CardBody } from '@learn49/aura-ui'
import Image from 'next/image'
import Link from 'next/link'

interface CourseValues {
  id: string
  image: string
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
    {[courseOne, courseTwo, courseThree].map(
      ({ id, image, title, description }: CourseValues) => (
        <Link key={id} href='/app/courses'>
          <Card className='pb-4 w-1/3 hover:bg-gray-200 cursor-pointer'>
            <div
              className='flex items-center justify-center py-2'
              style={{
                backgroundColor: '#000024'
              }}
            >
              <Image
                width={250}
                height={100}
                src={image}
                alt={title}
                layout='fixed'
                objectFit='contain'
              />
            </div>
            <CardBody>
              <p className='font-bold text-2xl text-gray-600 dark:text-gray-300'>
                {title}
              </p>
              <div className='flex items-center gap-2 my-2'>
                <Image
                  className='rounded-full'
                  src='/tuliofaria.jpg'
                  height={40}
                  width={40}
                  alt='Tulio Faria'
                />
                <p className='font-semibold text-gray-600'>Tulio Faria</p>
              </div>
              <p className='text-gray-600 dark:text-gray-400'>{description}</p>
            </CardBody>
          </Card>
        </Link>
      )
    )}
  </div>
)

export default CardSubHero
