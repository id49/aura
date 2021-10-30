const LessonWithoutVideo = () => (
  <div
    className='bg-gray-200 text-gray-600 flex flex-col justify-center items-center py-10 gap-2 h-96'
    style={{
      height: 540,
      maxHeight: 540
    }}
  >
    <p className='text-xl font-semibold'>Esta aula não contém vídeo.</p>
    <p className='font-thin'>
      Veja as informações em "Notas da Aula" logo abaixo.
    </p>
  </div>
)

export default LessonWithoutVideo
