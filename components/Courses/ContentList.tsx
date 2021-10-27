import Link from 'next/link'

interface IContent {
  id: string
  title: string
}

interface IProps {
  pos: number
  id: string
  courseId: string
  courseVersionId: string
  title: string
  lessons: [IContent]
}

const ContentList = ({
  pos,
  courseId,
  courseVersionId,
  title,
  lessons
}: IProps) => {
  return (
    <>
      <div className='flex py-2'>
        <div className='w-6'>{pos < 10 ? '0' + pos : pos}. </div>
        <p className='ml-2 font-semibold'>{title}</p>
      </div>
      <div className='flex flex-col'>
        {lessons.length > 0 &&
          lessons.map((lesson: IContent) => (
            <Link
              // eslint-disable-next-line prettier/prettier
              href={`/app/courses/${courseId}/version/${courseVersionId}/learn/${lesson.id}`}
            >
              <a className='text-sm font-thin mt-0.5 hover:bg-gray-200 rounded-md'>
                - {lesson.title}
              </a>
            </Link>
          ))}
      </div>
    </>
  )
}

export default ContentList
