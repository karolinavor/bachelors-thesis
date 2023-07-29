import React, { PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'

import { modalClose } from '../../store/reducers/modalSlice'
import { AppDispatch } from '../../store/store'
import { ModalInterface } from './Modal'

export default function DeleteComment(props: PropsWithChildren<ModalInterface>) {
	const dispatch: AppDispatch = useDispatch()

	async function deleteComment() {
		const response = await fetch(`/api/comment/${props.commentId}/delete`, {
			method: "DELETE",
		});
		if (response.status === 200) {
			dispatch(modalClose())
		}
	}

	console.log(props)

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