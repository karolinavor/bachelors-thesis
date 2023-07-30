import React, { PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'

import { modalClose } from '../../store/reducers/modalSlice'
import { AppDispatch } from '../../store/store'
import { ModalInterface } from './Modal'
import { toastNotificationAdd } from '../../store/reducers/toastNotificationsSlice'
import { fetchCourseFiles } from '../../store/reducers/courseSlice'

export default function UploadFile(props: PropsWithChildren<ModalInterface>) {
  const dispatch: AppDispatch = useDispatch()

  async function submitModal(e:React.ChangeEvent<any>) {
    e.preventDefault();

    const form = e.target;

    let files = form[0].files

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userID", "0");
      formData.append("name", file.name.split('.')[0]);
      formData.append("filetype", file.name.split('.')[1]);
      formData.append("size", file.size);

      const response = await fetch(`/api/course/${props.courseID}/file/add`, {
        method: "POST",
        body: formData
      });

      if (response.status === 201) {
        dispatch(modalClose())
        dispatch(
          toastNotificationAdd({
            notificationID: Date.now(),
            title: "New file uploaded.",
            customDuration: 5000,
          })
        );
        dispatch(fetchCourseFiles(props.courseID))
      } else {
        dispatch(
          toastNotificationAdd({
            notificationID: Date.now(),
            title: "Error occured.",
            customDuration: 5000,
          })
        );
      }
    }
  }

  return (
    <div>
      <p className='mb-1'>Allowed file extensions are jpeg, docx, pdf, txt.</p>
      <form onSubmit={(e) => submitModal(e)}>
        <input name="file" id="file" type="file" required />
        <button type='submit' className='Button Button--green'>Upload</button>
      </form>
    </div>
  )
}