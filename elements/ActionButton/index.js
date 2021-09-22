import React, { useState, createRef } from 'react'
import Popper from 'popper.js'

const ActionButton = ({ alt, children, onClick }) => {
  const [tooltipShow, setTooltipShow] = useState(false)
  const btnRef = createRef()
  const tooltipRef = createRef()
  const openLeftTooltip = () => {
    new Popper(btnRef.current, tooltipRef.current, {
      placement: 'left'
    })
    setTooltipShow(true)
  }
  const closeLeftTooltip = () => {
    setTooltipShow(false)
  }
  return (
    <>
      <div className='flex flex-wrap'>
        <div className='w-full text-center'>
          <button
            className={
              'bg-gray-100 text-gray-600 p-4 hover:bg-gray-300 rounded-lg'
            }
            type='button'
            aria-label={alt}
            style={{ transition: 'all .15s ease' }}
            onMouseEnter={openLeftTooltip}
            onMouseLeave={closeLeftTooltip}
            onClick={onClick}
            ref={btnRef}
          >
            {children}
          </button>
          <div
            className={
              (tooltipShow ? '' : 'hidden ') +
              'bg-gray-200 border-0 mr-1 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg'
            }
            ref={tooltipRef}
          >
            <div className='text-gray-600 py-2 px-3'>{alt}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ActionButton
