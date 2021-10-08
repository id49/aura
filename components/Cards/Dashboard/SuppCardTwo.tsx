import { Card, CardBody } from '@learn49/aura-ui'

const SuppCardTwo = () => (
  <Card className='flex h-3/4'>
    <img className='object-fill w-1/3' src='/login.png' />
    <CardBody>
      <p className='mb-4 text-3xl font-bold text-gray-600 dark:text-gray-300'>
        Office Hours
      </p>
      <p className='text-gray-600 dark:text-gray-400'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, cum
        commodi a omnis numquam quod? Totam exercitationem quos hic ipsam at qui
        cum numquam, sed amet ratione! Ratione, nihil dolorum.
      </p>
    </CardBody>
  </Card>
)

export default SuppCardTwo
