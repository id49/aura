import React from 'react'
import { useCourseData } from '@/context/CourseContext'
import { useCurrentWidth } from 'react-breakpoints-hook'
import { EditorState, convertFromRaw } from 'draft-js'
import createEmbedPlugin from '@/components/EditorEmbed'
import createImagePlugin from 'draft-js-image-plugin'
import Editor from '@draft-js-plugins/editor'
import createVideoPlugin from '@draft-js-plugins/video'

const embedPlugin = createEmbedPlugin()
const imagePlugin = createImagePlugin()
const videoPlugin = createVideoPlugin()

const plugins = [imagePlugin, videoPlugin, embedPlugin]

const EditorDraftJS = () => {
  const { parsedBody, error } = useCourseData()
  let width = useCurrentWidth()
  const editorState = parsedBody
    ? EditorState.createWithContent(convertFromRaw(parsedBody))
    : EditorState.createEmpty()

  if (error && error.message === '[GraphQL] Enrollment not found')
    return (
      <div
        className='lg:container pt-2 text-gray-800 bg-gray-100 mb-4'
        style={{
          minHeight: width > 1024 && 580,
          height: 350,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          flexDirection: 'column'
        }}
      >
        <strong>Atenção: Matrícula não encontrada.</strong>
        Entre em contato em contato@devpleno.com
      </div>
    )

  return (
    <div
      className='lg:container pt-2 text-gray-800 bg-gray-100 mb-4'
      style={{
        minHeight: width > 1024 && 580
      }}
    >
      <Editor {...{ editorState, plugins }} readOnly />
    </div>
  )
}
export default EditorDraftJS
