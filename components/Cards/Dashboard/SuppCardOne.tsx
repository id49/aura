import { Card, CardBody } from '@learn49/aura-ui'
import Image from 'next/image'

const supportChannels = [
  {
    text: 'Whatsapp',
    image: '/dashboard/whatsapp.png',
    url: 'https://api.whatsapp.com/send?1=pt_BR&phone=5535999090011&text=Gostaria%20de%20saber%20mais%20sobre%20o%20curso'
  },
  {
    text: 'Facebook',
    image: '/dashboard/facebook.png',
    url: 'https://www.facebook.com/groups/516548602154162/'
  },
  {
    text: 'Email',
    image: '/dashboard/email.png',
    url: 'mailto:contato@devpleno.com'
  },
  {
    text: 'Discord',
    image: '/dashboard/discord.png',
    url: 'https://discord.gg/6ztTrdDeHT'
  }
]

const SuppCardOne = () => (
  <Card className='flex flex-col md:w-2/3'>
    <div
      className='flex items-center justify-center py-12'
      style={{
        backgroundColor: '#000024'
      }}
    >
      <Image
        alt='Suporte'
        src='/dashboard/help.png'
        height={100}
        width={100}
        objectFit='contain'
      />
    </div>
    <CardBody>
      <p className='mb-2 text-2xl font-bold text-gray-600 dark:text-gray-300'>
        Canais de Comunicação
      </p>
      {supportChannels.map(({ url, text, image }) => (
        <div className='text-gay-600 font-medium mt-2'>
          <a href={url} target='_blank'>
            <div className='flex gap-2 items-center bg-gray-200 hover:bg-gray-300 py-2 px-2 rounded-lg'>
              <Image src={image} width={32} height={32} alt={text} />
              <p className='text-gray-600 text-sm'>{text}</p>
            </div>
          </a>
        </div>
      ))}
    </CardBody>
  </Card>
)

export default SuppCardOne
