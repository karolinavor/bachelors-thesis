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
import DeleteNews from './DeleteNews'
import EditNews from './EditNews'
import DeleteComment from './DeleteComment'

const customStyles = {
  content: {
    'background': `white`,
    'borderRadius': `7px`,
    'border': `none`,
    'padding': `1rem`,
    'inset': `1rem`
  },
  overlay: {
    'background': `rgba(19, 36, 104, 0.15)`
  }
}

export interface ModalInterface {
  courseID?: number,
  courseFileID?: number,
  newsID?: number,
  commentID?: number,
  refresh?: string
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
      case `editNews`:
        return `Edit news`
      case `deleteCourse`:
        return `Delete course`
      case `deleteFile`:
        return `Delete file`
      case `deleteNews`:
        return `Delete news`
      case `addNews`:
        return `Add news`
      case `deleteComment`:
        return `Delete comment`
    }
  }

  function getContent() {
    switch (props.type) {
      case `uploadFile`:
        return <UploadFile courseID={props.data.courseID ?? 0} />
      case `addCourse`:
        return <AddCourse />
      case `editCourse`:
        return <EditCourse courseID={props.data.courseID ?? 0} />
      case `editNews`:
        return <EditNews newsID={props.data.newsID ?? 0} />
      case `deleteCourse`:
        return <DeleteCourse courseID={props.data.courseID ?? 0} />
      case `deleteFile`:
        return <DeleteFile courseFileID={props.data.courseFileID ?? 0} courseID={props.data.courseID ?? 0} refresh={props.data.refresh}/>
      case `deleteComment`:
        return <DeleteComment commentID={props.data.commentID ?? 0} courseFileID={props.data.courseFileID ?? 0} courseID={props.data.courseID ?? 0} />
      case `deleteNews`:
        return <DeleteNews newsID={props.data.newsID ?? 0} />
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
      case `editNews`:
      case `deleteNews`:
      case `deleteCourse`:
      case `deleteFile`:
      case `deleteComment`:
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