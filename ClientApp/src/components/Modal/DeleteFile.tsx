import React, { PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'

import { modalClose } from '../../store/reducers/modalSlice'
import { AppDispatch } from '../../store/store'
import { ModalInterface } from './Modal'
import { toastNotificationAdd } from '../../store/reducers/toastNotificationsSlice'
import { fetchCourse } from '../../store/reducers/courseSlice'

export default function DeleteFile(props: PropsWithChildren<ModalInterface>) {
	const dispatch: AppDispatch = useDispatch()

	async function deleteCourse() {
		const response = await fetch(`/api/file/${props.fileID}/delete`, {
			method: "DELETE",
		});
		if (response.status === 200) {
			window.location.href = `/course/${props.courseID}`;
			dispatch(
				toastNotificationAdd({
					notificationID: Date.now(),
					title: "File deleted.",
					customDuration: 5000,
				})
			);
			dispatch(fetchCourse(props.courseID))
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

  return (
	  <div>
			<p className="mb-1">Do you really want to delete this file? This change is final.</p>
			<div className="Button-row mb-0">
				<button className="Button" onClick={() => deleteCourse()}>Delete file</button>
				<button className="Button" onClick={() => dispatch(modalClose())}>Cancel</button>
			</div>
		</div>
  )
}