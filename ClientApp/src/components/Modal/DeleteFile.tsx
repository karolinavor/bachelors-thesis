import React, { PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'

import { modalClose } from '../../store/reducers/modalSlice'
import { AppDispatch } from '../../store/store'
import { ModalInterface } from './Modal'
import { toastNotificationAdd } from '../../store/reducers/toastNotificationsSlice'

export default function DeleteFile(props: PropsWithChildren<ModalInterface>) {
	const dispatch: AppDispatch = useDispatch()

	async function deleteCourse() {
		const response = await fetch(`/api/file/${props.fileId}/delete`, {
			method: "DELETE",
		});
		if (response.status === 200) {
			let courseUrl = window.location.href.split("file")[0]
			window.location.href = courseUrl;
			dispatch(
				toastNotificationAdd({
					notificationId: Date.now(),
					title: "File deleted.",
					customDuration: 5000,
				})
			);
		} else {
			dispatch(
				toastNotificationAdd({
					notificationId: Date.now(),
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