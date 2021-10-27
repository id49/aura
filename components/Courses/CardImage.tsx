import Image from 'next/image'

interface IProps {
  image: string
  title: string
}

const CardImage = ({ image, title }: IProps) => (
  <div
    className='flex items-center justify-center py-8 rounded-md'
    style={{
      backgroundColor: '#000024'
    }}
  >
    <Image
      width={220}
      height={70}
      src={image}
      alt={title}
      layout='fixed'
      objectFit='contain'
    />
  </div>
)

export default CardImage
