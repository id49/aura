import { Card, CardBody } from '@learn49/aura-ui'

const SuppCardOne = () => (
  <Card className='flex flex-col md:w-1/2'>
    <img className='object-cover' src='/login.png' />
    <CardBody>
      <p className='mb-2 text-2xl font-bold text-gray-600 dark:text-gray-300'>
        Canais de Comunicação
      </p>
      <p className='text-gray-600 dark:text-gray-400'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, cum
        commodi a omnis numquam quod? Totam exercitationem quos hic
      </p>
    </CardBody>
  </Card>
)

export default SuppCardOne
