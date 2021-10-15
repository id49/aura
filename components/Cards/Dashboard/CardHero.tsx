import { Card, CardBody } from '@learn49/aura-ui'
import Link from 'next/link'
import Image from 'next/image'

interface PropsValues {
  id: string
  title: string
  description: string
  courseVersionId: string
  defaultVersion: string
}

const CardHero = ({
  id,
  title,
  description,
  courseVersionId,
  defaultVersion
}: PropsValues) => (
  <Link
    href={`/app/courses/${id}/version/${courseVersionId || defaultVersion}`}
  >
    <Card className='flex flex-col lg:flex-row w-full mt-2 mb-4 py-10 lg:py-20 px-4 lg:px-10 gap-4 bg-teal-700 hover:bg-teal-600 cursor-pointer'>
      <img
        className='lg:w-1/3 rounded-lg'
        src='https://res.cloudinary.com/codersociety/image/fetch/f_webp,ar_16:9,c_fill,w_1140/https://cdn.codersociety.com/uploads/graphql-reasons.png'
      />
      <CardBody>
        <p className='font-bold text-2xl lg:text-4xl text-green-100 hover:text-white'>
          {title}
        </p>
        <div className='flex items-center gap-2 my-2'>
          <Image
            className='rounded-full'
            src='/navbar/profile-empty.png'
            height={40}
            width={40}
          />
          <p className='font-semibold text-white py-4'>Tulio Faria</p>
        </div>
        <p className='text-gray-200 mt-6'>{description}</p>
      </CardBody>
    </Card>
  </Link>
)

export default CardHero
