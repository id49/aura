import { Card, CardBody } from '@learn49/aura-ui'
import Image from 'next/image'
import Link from 'next/link'

interface PropsValues {
  title: string
  image: string
  description: string
}

const CardTemplate = ({ image, title, description }: PropsValues) => (
  <Link href='/app/courses'>
    <a>
      <Card className='flex flex-col md:flex-row gap-2 md:gap-10 w-full h-56 hover:bg-gray-200 cursor-pointer'>
        <div
          className='flex items-center justify-center py-2 px-6 md:w-1/5'
          style={{
            backgroundColor: '#000024'
          }}
        >
          <Image src={image} height={100} width={100} alt={title} />
        </div>
        <div className='md:w-4/5 md:py-3'>
          <CardBody>
            <p className='font-bold text-2xl text-gray-600 dark:text-gray-300'>
              {title}
            </p>
            <p className='text-gray-600 dark:text-gray-400 py-3'>
              {description}
            </p>
          </CardBody>
        </div>
      </Card>
    </a>
  </Link>
)

export default CardTemplate
