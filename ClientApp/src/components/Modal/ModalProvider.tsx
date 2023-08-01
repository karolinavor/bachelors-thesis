import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../store/store'
import ModalContainer from './Modal'

function ModalProvider(props) {

  const modalState = useSelector((state: RootState) => state.modal)
  const [isOpen, setIsOpen] = useState<boolean>(modalState.isOpen)
  const [type, setType] = useState<string | null>(modalState.type)
  const [data, setData] = useState(modalState.data)

  useEffect(() => {
    setIsOpen(modalState.isOpen)
    setType(modalState.type)
    setData(modalState.data)
  })

  return (
    <div className='ModalProvider'>
      <ModalContainer isOpen={isOpen} type={type} data={data}></ModalContainer>
      {props.children}
    </div>
  )
}

export default ModalProvider