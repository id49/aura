import { Card, CardBody } from '@learn49/aura-ui'
import Image from 'next/image'
import Link from 'next/link'

const CardTemplateTwo = () => (
  <div className='flex flex-col md:flex-row gap-4 my-4 w-full'>
    {[0, 1, 2].map((e) => (
      <Link href='/app/courses'>
        <Card key={e} className='py-4 hover:bg-gray-200  cursor-pointer'>
          <img src='/img/implementacionApi.png' />
          <CardBody>
            <p className='font-bold text-2xl text-gray-600 dark:text-gray-300'>
              Fullstack Master
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
            <p className='text-gray-600 dark:text-gray-400'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga,
              cum commodi a omnis numquam quod? Totam exercitationem quos hic
              ipsam at qui cum numquam, sed amet ratione! Ratione, nihil
              dolorum.
            </p>
          </CardBody>
        </Card>
      </Link>
    ))}
  </div>
)

export default CardTemplateTwo
