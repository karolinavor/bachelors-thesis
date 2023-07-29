import React, { PropsWithChildren, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { modalClose } from '../../store/reducers/modalSlice'
import { AppDispatch } from '../../store/store'
import { CourseType } from '../../types/types'
import { ModalInterface } from './Modal'
import { fetchCourses } from '../../store/reducers/coursesSlice'
import { toastNotificationAdd } from '../../store/reducers/toastNotificationsSlice'

export default function EditCourse(props: PropsWithChildren<ModalInterface>) {
	const dispatch: AppDispatch = useDispatch()

	const [course, setCourse] = useState<CourseType>();

	useEffect(() => {
		getCourse()
	}, [])

	async function getCourse() {
		const response = await fetch(`/api/course/${props.courseId}/get`);
		const data = await response.json();
		setCourse(data)
	}

  async function submitModal(e:React.ChangeEvent<any>) {
    e.preventDefault();

    const form = e.target;
    const formData = {
        id: props.courseId,
        title: form[0].value,
        short: form[1].value
    }

    const response = await fetch(`/api/course/${props.courseId}/edit`, {
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
					title: "Course edited.",
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
      <form onSubmit={event => submitModal(event)} className="flex-column">
          <div>
              <label htmlFor="name">Course name</label>
              <input id="name" type="text" required defaultValue={course?.title}></input>
          </div>
          <div>
              <label htmlFor="short">Course short</label>
              <input id="short" type="text" required defaultValue={course?.short}></input>
          </div>
          <button className="Button" type="submit">Submit</button>
      </form>
    </div>
  )
}