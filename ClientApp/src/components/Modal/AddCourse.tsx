import React from 'react'
import { useDispatch } from 'react-redux'

import { modalClose } from '../../store/reducers/modalSlice'
import { AppDispatch } from '../../store/store'
import { fetchCourses } from '../../store/reducers/coursesSlice'
import { toastNotificationAdd } from '../../store/reducers/toastNotificationsSlice'

export default function AddCourse() {
  const dispatch: AppDispatch = useDispatch()

  async function submitModal(e:React.ChangeEvent<any>) {
    e.preventDefault();

    const form = e.target;
    const formData = {
        title: form[0].value,
        short: form[1].value.toUpperCase(),
    }

    const response = await fetch(`/api/course/add`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(formData)
    });
    if (response.status === 201) {
      dispatch(modalClose())
      dispatch(
        toastNotificationAdd({
          notificationID: Date.now(),
          title: "New course added.",
          customDuration: 5000,
        })
      );
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
          <input id="name" type="text" required maxLength={45}></input>
        </div>
        <div>
          <label htmlFor="short">Course short - max. 5 characters</label>
          <input id="short" type="text" required maxLength={5}></input>
        </div>
        <button className="Button" type="submit">Submit</button>
      </form>
    </div>
  )
}