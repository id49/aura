import { EditorState, convertFromRaw } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createEmbedPlugin from 'draft-js-embed-plugin'
import createImagePlugin from 'draft-js-image-plugin'
import createVideoPlugin from 'draft-js-video-plugin'
import createLinkifyPlugin from '@draft-js-plugins/linkify'
import '@draft-js-plugins/linkify/lib/plugin.css'

const embedPlugin = createEmbedPlugin()
const imagePlugin = createImagePlugin()
const videoPlugin = createVideoPlugin()
const linkifyPlugin = createLinkifyPlugin()

const plugins = [imagePlugin, embedPlugin, videoPlugin, linkifyPlugin]

const EditorDraftJS = ({ parsedBody }) => {
  const editorState = parsedBody
    ? EditorState.createWithContent(convertFromRaw(parsedBody))
    : EditorState.createEmpty()

  return (
    <div className='lg:container pt-2 text-gray-800 bg-gray-100'>
      <Editor editorState={editorState} plugins={plugins} readOnly />
    </div>
  )
}
export default EditorDraftJS
