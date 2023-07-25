import React, { PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'

import { modalClose } from '../../store/reducers/modalSlice'
import { AppDispatch } from '../../store/store'
import { ModalInterface } from './UploadFile'

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
			dispatch(modalClose())
		}
	}

  return (
	  <div>
		<p>Do you really want to delete this course? This change is final.</p>
		<button className="Button" onClick={() => deleteCourse()}>Delete course</button>
		<button className="Button" onClick={() => dispatch(modalClose())}>Cancel</button>
	</div>
  )
}