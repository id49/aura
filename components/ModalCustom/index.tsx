import { FunctionComponent } from 'react'
import { Modal, ModalHeader } from '@learn49/aura-ui'

interface Props {
  data: Data
  title: string
  text: string
  closeModal(Params: Params): any
}

interface Data {
  id: number
  state: boolean
}

interface Params {
  state: boolean
  id: number
  extraId: string
}

const ModalPage: FunctionComponent<Props> = ({
  data,
  closeModal,
  title,
  children
}) => {
  return (
    <Modal
      isOpen={data.state}
      onClose={() => closeModal({ state: false, id: null, extraId: null })}
    >
      <ModalHeader>{title}</ModalHeader>
      {children}
    </Modal>
  )
}
export default ModalPage
