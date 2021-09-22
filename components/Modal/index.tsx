import React, { useState } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@learn49/aura-ui'
import Loading from '../Loading'

interface Props {
  data: Data
  title: string
  text: string
  closeModal(Params: Params): any
  action(id: number): any
}

interface Data {
  id: number
  state: boolean
}

interface Params {
  state: boolean
  id: number
}

const ModalPage = ({ data, closeModal, title, text, action }: Props) => {
  const [isLoading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    await action(data.id)
    setLoading(false)
    closeModal({ state: false, id: null })
  }
  return (
    <Modal
      isOpen={data.state}
      onClose={() => closeModal({ state: false, id: null })}
    >
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{text}</ModalBody>
      <ModalFooter className='mb-4'>
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            <Button className='w-full sm:w-auto' onClick={handleClick}>
              Confirmar
            </Button>
            <Button
              className='w-full sm:w-auto'
              layout='outline'
              onClick={() => closeModal({ state: false, id: null })}
            >
              Cancelar
            </Button>
          </>
        )}
      </ModalFooter>
    </Modal>
  )
}
export default ModalPage
