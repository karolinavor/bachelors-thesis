import React, { PropsWithChildren } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { modalClose } from '../../store/reducers/modalSlice'
import { AppDispatch, RootState } from '../../store/store'
import { ModalInterface } from './Modal'
import { fetchCourses } from '../../store/reducers/coursesSlice'
import { toastNotificationAdd } from '../../store/reducers/toastNotificationsSlice'
import { fetchCourse } from '../../store/reducers/courseSlice'

export default function EditCourse(props: PropsWithChildren<ModalInterface>) {
	const dispatch: AppDispatch = useDispatch()

	const courseState = useSelector((state: RootState) => state.course)

  async function submitModal(e:React.ChangeEvent<any>) {
    e.preventDefault();

    const form = e.target;
    const formData = {
        ID: props.courseID,
        title: form[0].value,
        short: form[1].value
    }

    const response = await fetch(`/api/course/${props.courseID}/edit`, {
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
					notificationID: Date.now(),
					title: "Course edited.",
					customDuration: 5000,
				})
      );
      dispatch(fetchCourse(props.courseID))
      dispatch(fetchCourses())
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
      <form onSubmit={event => submitModal(event)} className="flex-column">
          <div>
              <label htmlFor="name">Course name - max. 45 characters</label>
              <input id="name" type="text" required defaultValue={courseState?.title} maxLength={45}></input>
          </div>
          <div>
              <label htmlFor="short">Course short - max. 5 characters</label>
              <input id="short" type="text" required defaultValue={courseState?.short} maxLength={5}></input>
          </div>
          <button className="Button" type="submit">Submit</button>
      </form>
    </div>
  )
}