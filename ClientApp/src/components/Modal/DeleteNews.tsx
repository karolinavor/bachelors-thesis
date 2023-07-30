import React, { PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'

import { modalClose } from '../../store/reducers/modalSlice'
import { AppDispatch } from '../../store/store'
import { ModalInterface } from './Modal'
import { toastNotificationAdd } from '../../store/reducers/toastNotificationsSlice'
import { fetchAllNews } from '../../store/reducers/newsSlice'

export default function DeleteNews(props: PropsWithChildren<ModalInterface>) {
	const dispatch: AppDispatch = useDispatch()

	async function deleteNews() {
		const response = await fetch(`/api/news/${props.newsId}/delete`, {
			method: "DELETE",
		});
		if (response.status === 200) {
			dispatch(modalClose());
			dispatch(
				toastNotificationAdd({
					notificationId: Date.now(),
					title: "News deleted.",
					customDuration: 5000,
				})
			);
			dispatch(fetchAllNews())
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
			<p className="mb-1">Do you really want to delete this news? This change is final.</p>
			<div className="Button-row mb-0">
				<button className="Button" onClick={() => deleteNews()}>Delete news</button>
				<button className="Button" onClick={() => dispatch(modalClose())}>Cancel</button>
			</div>
		</div>
  )
}