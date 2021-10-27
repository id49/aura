interface IContent {
  title: string
}

interface IProps {
  pos: number
  title: string
  lessons: [IContent]
}

const CoursesContent = ({ pos, title, lessons }: IProps) => {
  return (
    <div className='flex py-2'>
      <div className='w-6'>{pos < 10 ? '0' + pos : pos}. </div>
      <div>
        <p className='ml-2 font-semibold'>{title}</p>
        <div>
          {lessons.length > 0 &&
            lessons.map((lesson: IContent) => (
              <p className='text-sm font-thin mt-0.5'>{lesson.title}</p>
            ))}
        </div>
      </div>
    </div>
  )
}

export default CoursesContent
