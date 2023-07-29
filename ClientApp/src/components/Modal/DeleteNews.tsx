import React, { PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'

import { modalClose } from '../../store/reducers/modalSlice'
import { AppDispatch } from '../../store/store'
import { ModalInterface } from './Modal'

export default function DeleteNews(props: PropsWithChildren<ModalInterface>) {
	const dispatch: AppDispatch = useDispatch()

	async function deleteNews() {
		const response = await fetch(`/api/news/${props.newsId}/delete`, {
			method: "DELETE",
		});
		if (response.status === 200) {
			dispatch(modalClose());
		}
	}

  return (
	  <div>
			<p className="mb-1">Do you really want to delete this news? This change is final.</p>
			<button className="Button" onClick={() => deleteNews()}>Delete news</button>
			<button className="Button" onClick={() => dispatch(modalClose())}>Cancel</button>
		</div>
  )
}