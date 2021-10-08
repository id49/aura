import { Card, CardBody } from '@learn49/aura-ui'
import Link from 'next/link'
import Image from 'next/image'

const CardTemplateOne = () => (
  <Link href='/app/courses'>
    <Card className='flex flex-col lg:flex-row w-full mt-2 mb-4 py-10 lg:py-20 px-4 lg:px-10 gap-4 bg-teal-700 cursor-pointer'>
      <img
        className='lg:w-1/3 rounded-lg'
        src='https://res.cloudinary.com/codersociety/image/fetch/f_webp,ar_16:9,c_fill,w_1140/https://cdn.codersociety.com/uploads/graphql-reasons.png'
      />
      <CardBody>
        <p className='font-bold text-2xl lg:text-4xl text-green-100 hover:text-white'>
          Fullstack Master
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
        <p className='text-gray-200 mt-6'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, cum
          commodi a omnis numquam quod? Totam exercitationem quos hic ipsam at
          qui cum numquam, sed amet ratione! Ratione, nihil dolorum.
        </p>
      </CardBody>
    </Card>
  </Link>
)

export default CardTemplateOne
