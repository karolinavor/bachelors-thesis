import React, { PropsWithChildren } from 'react'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'

import { modalClose, ModalSliceState } from '../../store/reducers/modalSlice'
import { AppDispatch } from '../../store/store'
import UploadFile from './UploadFile'
import closeIcon from "../../assets/close.svg"
import AddCourse from './AddCourse'
import AddNews from './AddNews'
import EditCourse from './EditCourse'
import DeleteCourse from './DeleteCourse'
import DeleteFile from './DeleteFile'

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

export interface ModalInterface {
  courseId?: number,
  fileId?: number
}

export default function ModalContainer(props: PropsWithChildren<ModalSliceState>) {
  const dispatch: AppDispatch = useDispatch()
  Modal.setAppElement(`body`)

  function getHeading() {
    switch (props.type) {
      case `uploadFile`:
        return `Upload file`
      case `addCourse`:
        return `Add course`
      case `editCourse`:
        return `Edit course`
      case `deleteCourse`:
        return `Delete course`
      case `deleteFile`:
        return `Delete file`
      case `addNews`:
        return `Add news`
    }
  }

  function getContent() {
    switch (props.type) {
      case `uploadFile`:
        return <UploadFile courseId={props.data.courseId ?? 0} />
      case `addCourse`:
        return <AddCourse />
      case `editCourse`:
        return <EditCourse courseId={props.data.courseId ?? 0} />
      case `deleteCourse`:
        return <DeleteCourse courseId={props.data.courseId ?? 0} />
      case `deleteFile`:
        return <DeleteFile fileId={props.data.courseId ?? 0} />
      case `addNews`:
        return <AddNews />
    }
  }

  function getSize() {
    switch (props.type) {
      case `uploadFile`:
      case `addCourse`:
      case `addNews`:
      case `editCourse`:
      case `deleteCourse`:
      case `deleteFile`:
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