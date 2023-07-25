import React, { PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'

import { modalClose } from '../../store/reducers/modalSlice'
import { AppDispatch } from '../../store/store'
import { ModalInterface } from './Modal'

export default function DeleteFile(props: PropsWithChildren<ModalInterface>) {
	const dispatch: AppDispatch = useDispatch()

	async function deleteCourse() {
		const response = await fetch(`/api/file/${props.fileId}/delete`, {
			method: "DELETE",
		});
		if (response.status === 200) {
			let courseUrl = window.location.href.split("file")[0]
			window.location.href = courseUrl;
		}
	}

  return (
	  <div>
			<p className="mb-1">Do you really want to delete this file? This change is final.</p>
			<button className="Button" onClick={() => deleteCourse()}>Delete file</button>
			<button className="Button" onClick={() => dispatch(modalClose())}>Cancel</button>
		</div>
  )
}