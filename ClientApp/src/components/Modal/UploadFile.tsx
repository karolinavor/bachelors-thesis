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
      formData.append("name", file.name.split('.').slice(0, -1).join('.'));
      formData.append("filetype", file.name.split('.').pop());
      formData.append("description", form[1].value);
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
      <form onSubmit={(e) => submitModal(e)}>
        <label htmlFor="file">Please name your files meaningfully. The file names are used in the application. Maximum size of file is 28.6 MB.</label>
        <input name="file" id="file" type="file" required />
        <label htmlFor="description">Description - max. 400 characters</label>
        <textarea name="description" id="description" maxLength={400} />
        <button type='submit' className="Button Button--green">Upload</button>
      </form>
    </div>
  )
}