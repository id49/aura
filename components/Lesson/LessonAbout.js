import { useState } from 'react'
import Editor from 'draft-js-plugins-editor'
import { EditorState, convertFromRaw } from 'draft-js'
import createMentionPlugin from 'draft-js-mention-plugin'
import createImagePlugin from 'draft-js-image-plugin'
import createVideoPlugin from 'draft-js-video-plugin'
import LessonTabItem from '@/elements/TabItem'

const imagePlugin = createImagePlugin()
const mentionPlugin = createMentionPlugin()
const videoPlugin = createVideoPlugin()

const plugins = [imagePlugin, mentionPlugin, videoPlugin]

const TabOptions = [
  { id: 1, title: 'Sobre o Curso' },
  { id: 2, title: 'Notas da Aula' }
]

const LessonAbout = ({ parsedBody, description }) => {
  const [showTab, setShowTab] = useState(1)

  const editorState = parsedBody
    ? EditorState.createWithContent(convertFromRaw(parsedBody))
    : EditorState.createEmpty()

  return (
    <div className='py-4'>
      <div className='flex text-lg font-medium pt-2 bg-gray-100'>
        {TabOptions.map((e) => (
          <LessonTabItem key={e.id} action={setShowTab} show={showTab} {...e} />
        ))}
      </div>
      <div className='mt-4 text-gray-600 text-sm'>
        {showTab === 1 ? (
          description
        ) : (
          <Editor editorState={editorState} plugins={plugins} readOnly />
        )}
      </div>
    </div>
  )
}
export default LessonAbout
