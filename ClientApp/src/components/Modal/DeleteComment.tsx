import React, { PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'

import { modalClose } from '../../store/reducers/modalSlice'
import { AppDispatch } from '../../store/store'
import { ModalInterface } from './Modal'
import { toastNotificationAdd } from '../../store/reducers/toastNotificationsSlice'
import { fetchCourseComments } from '../../store/reducers/courseSlice'
import { fetchFileComments } from '../../store/reducers/fileSlice'
import { fetchDashboardComments } from '../../store/reducers/dashboardSlice'
import { fetchUser } from '../../store/reducers/userSlice'

export default function DeleteComment(props: PropsWithChildren<ModalInterface>) {
	const dispatch: AppDispatch = useDispatch()

	async function deleteComment() {
		const response = await fetch(`/api/comment/${props.commentID}/delete`, {
			method: "DELETE",
		});
		if (response.status === 200) {
			dispatch(modalClose())
			dispatch(
        toastNotificationAdd({
          notificationID: Date.now(),
          title: "Comment deleted.",
          customDuration: 5000,
        })
			);
			props.courseFileID > 0 ? dispatch(fetchFileComments({id: props.courseFileID, showItems: 5})) : dispatch(fetchCourseComments({id: props.courseID, showItems: 5}))
			if (window.location.pathname.includes("dashboard")) {
				dispatch(fetchDashboardComments())
			} else if (window.location.pathname.includes("profile")) {
				dispatch(fetchUser())
			}
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
			<p className="mb-1">Do you really want to delete this comment? This change is final.</p>
			<div className="Button-row mb-0">
				<button className="Button" onClick={() => deleteComment()}>Delete comment</button>
				<button className="Button" onClick={() => dispatch(modalClose())}>Cancel</button>
			</div>
		</div>
  )
}