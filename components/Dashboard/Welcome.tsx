import Vimeo from '@u-wave/react-vimeo'
import Title from '@/elements/Title'

const Welcome = () => (
  <div className='container mx-auto flex flex-col lg:flex-row md:my-4 w-full overflow-hidden text-gray-800 bg-white md:rounded-lg md:shadow-lg'>
    <div className='w-full'>
      <Vimeo
        className='self-center'
        video='https://player.vimeo.com/video/687758143?h=afdf5e9915'
        responsive
        showByline
      />
    </div>
    <div className='flex flex-col justify-between w-full p-5'>
      <div className='mb-2 md:mb-8'>
        <Title text='Seja bem vindo à Formação!' />
        <p className='leading-relaxed mt-2 text-gray-500'>
          Nesse vídeo você vai encontrar instruções para se organizar nos
          estudos da Formação Fullstack Master, verá como tirar dúvidas e quais
          são as melhores formas de compartilhar suas dificuldades.
        </p>
        <p className='leading-relaxed mt-4 text-gray-500'>
          Ao final da página, você encontrará os links para os canais de
          contato.
        </p>
      </div>
    </div>
  </div>
)

export default Welcome
