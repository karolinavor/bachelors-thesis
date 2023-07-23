import React, { PropsWithChildren } from 'react'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'

import { modalClose, ModalSliceState } from '../../store/reducers/modalSlice'
import { AppDispatch } from '../../store/store'
import UploadFile from './UploadFile'
import closeIcon from "../../assets/close.svg"

const customStyles = {
  content: {
    'background': `white`,
    'borderRadius': `5px`,
    'border': `none`,
    'padding': `3rem`,
  },
  overlay: {
    'background': `rgba(19, 36, 104, 0.15)`
  }
}

export default function ModalContainer(props: PropsWithChildren<ModalSliceState>) {
  const dispatch: AppDispatch = useDispatch()
  Modal.setAppElement(`body`)

  function getHeading() {
    switch (props.type) {
      case `uploadFile`:
        return `Upload file`
    }
  }

  function getContent() {
    switch (props.type) {
      case `uploadFile`:
        return <UploadFile courseId={props.data.courseId ?? 0} />
    }
  }

  function getSize() {
    switch (props.type) {
      case `uploadFile`:
        return `small`
    }

    return ``
  }

  return (
    <Modal
      isOpen={props.isOpen}
      style={customStyles}
      contentLabel="Modal"
      overlayClassName={getSize()}
    >
      <div className='Modal'>
        <div className='Modal-header'>
          <div className='Modal-h1'>{getHeading()}</div>
          <button className='icon-close' onClick={() => dispatch(modalClose())}>
            <img src={closeIcon} alt="user" width="28" height="28" />
          </button>
        </div>
        <div className='Modal-content'>
          {getContent()}
        </div>
      </div>
    </Modal>
  )
}