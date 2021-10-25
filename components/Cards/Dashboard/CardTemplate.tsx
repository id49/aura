import { Card, CardBody } from '@learn49/aura-ui'
import Image from 'next/image'
import Link from 'next/link'

const CardTemplate = () => (
  <Link href='/app/courses'>
    <Card className='flex flex-col md:flex-row gap-2 md:gap-10 w-full hover:bg-gray-200 cursor-pointer'>
      <Image
        className='object-contain w-1/4'
        src='/img/implementacionApi.png'
        width={300}
        height={300}
        layout='intrinsic'
      />
      <CardBody>
        <p className='font-bold text-2xl text-gray-600 dark:text-gray-300'>
          Fullstack Master
        </p>
        <div className='flex items-center gap-2 my-2'>
          <Image
            className='rounded-full'
            src='/tuliofaria.jpg'
            height={40}
            width={40}
          />
          <p className='font-semibold text-gray-600'>Tulio Faria</p>
        </div>
        <p className='text-gray-600 dark:text-gray-400'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, cum
          commodi a omnis numquam quod? Totam exercitationem quos hic ipsam at
          qui cum numquam, sed amet ratione! Ratione, nihil dolorum.
        </p>
      </CardBody>
    </Card>
  </Link>
)

export default CardTemplate
