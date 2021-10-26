import { Card, CardBody } from '@learn49/aura-ui'
import Image from 'next/image'
import Link from 'next/link'

const CardTemplate = ({ image, title, description }) => (
  <Link href='/app/courses'>
    <a>
      <Card className='flex flex-col md:flex-row gap-2 md:gap-10 w-full hover:bg-gray-200 cursor-pointer'>
        <div
          className='flex items-center justify-center py-2 px-6 md:w-1/5'
          style={{
            backgroundColor: '#000024'
          }}
        >
          <Image src={image} height={100} width={100} alt={title} />
        </div>
        <div className='md:w-4/5'>
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
        </div>
      </Card>
    </a>
  </Link>
)

export default CardTemplate
