import React, { useState } from 'react'
import { Alert } from '@learn49/aura-ui'

const CTA = () => {
  const [isOpen, setClose] = useState(true)
  return (
    <>
      {isOpen && (
        <a className='p-4 mb-8'>
          <Alert type='warning' onClose={() => setClose(false)}>
            Atenção, existe uma pendência.
          </Alert>
        </a>
      )}
    </>
  )
}

export default CTA
