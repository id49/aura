import Image from 'next/image'

const CardInstructor = () => (
  <div className='flex items-center gap-2 mt-5 md:mt-8 bg-gray-200 rounded-md py-4 px-2'>
    <Image
      className='rounded-full'
      src='/tuliofaria.jpg'
      height={50}
      width={50}
      alt='Tulio Faria'
    />
    <div className='flex flex-col text-gray-600'>
      <p className='font-thin text-sm'>Instrutor</p>
      <p className='font-semibold'>Tulio Faria</p>
    </div>
  </div>
)

export default CardInstructor
