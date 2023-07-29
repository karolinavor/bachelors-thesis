import React, { PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'

import { modalClose } from '../../store/reducers/modalSlice'
import { AppDispatch } from '../../store/store'
import { ModalInterface } from './Modal'
import { fetchCourses } from '../../store/reducers/coursesSlice'
import { toastNotificationAdd } from '../../store/reducers/toastNotificationsSlice'

export default function EditCourse(props: PropsWithChildren<ModalInterface>) {
	const dispatch: AppDispatch = useDispatch()

 	async function deleteCourse() {
		const response = await fetch(`/api/course/${props.courseId}/delete`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "DELETE"
		});
		if (response.status === 200) {
			window.location.href = "/";
			dispatch(
				toastNotificationAdd({
					notificationId: Date.now(),
					title: "Course deleted.",
					customDuration: 5000,
				})
			);
			dispatch(fetchCourses())
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
			<p className="mb-1">Do you really want to delete this course? This change is final.</p>
			<div className="Button-row mb-0">
				<button className="Button" onClick={() => deleteCourse()}>Delete course</button>
				<button className="Button" onClick={() => dispatch(modalClose())}>Cancel</button>
			</div>
		</div>
  )
}