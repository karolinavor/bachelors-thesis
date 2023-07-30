import React, { PropsWithChildren, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { modalClose } from '../../store/reducers/modalSlice'
import { AppDispatch } from '../../store/store'
import { NewsType } from '../../types/types'
import { ModalInterface } from './Modal'
import { toastNotificationAdd } from '../../store/reducers/toastNotificationsSlice'
import { fetchAllNews } from '../../store/reducers/newsSlice'

export default function EditNews(props: PropsWithChildren<ModalInterface>) {
	const dispatch: AppDispatch = useDispatch()

	const [news, setNews] = useState<NewsType>();

	useEffect(() => {
		getNews()
	}, [])

	async function getNews() {
		const response = await fetch(`/api/news/${props.newsId}/get`);
		const data = await response.json();
		setNews(data)
	}

  async function submitModal(e:React.ChangeEvent<any>) {
    e.preventDefault();

    const form = e.target;
    const formData = {
      id: props.newsId,
      content: form[0].value
    }

    const response = await fetch(`/api/news/${props.newsId}/edit`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(formData)
    });
    if (response.status === 200) {
      dispatch(modalClose())
      dispatch(
				toastNotificationAdd({
					notificationId: Date.now(),
					title: "News edited.",
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
      <form onSubmit={event => submitModal(event)} className="flex-column">
          <div>
              <label htmlFor="content">News content</label>
              <textarea id="content" required defaultValue={news?.content} />
          </div>
          <button className="Button" type="submit">Submit</button>
      </form>
    </div>
  )
}