import { Card, CardBody } from '@learn49/aura-ui'
import Image from 'next/image'

const SuppCardTwo = () => (
  <Card className='flex'>
    <div
      className='flex items-center justify-center p-8'
      style={{
        backgroundColor: '#000024'
      }}
    >
      <Image
        alt='Suporte'
        src='/dashboard/officehours.png'
        objectFit='contain'
        height={200}
        width={150}
      />
    </div>
    <CardBody>
      <p className='mb-4 text-2xl font-bold text-gray-600 dark:text-gray-300'>
        Office Hours
      </p>
      <p className='text-gray-600 dark:text-gray-400'>
        Surgiu alguma dúvida durante as aulas? Vamos conversar sobre isso e
        outros assuntos ao vivo?
      </p>
    </CardBody>
  </Card>
)

export default SuppCardTwo
