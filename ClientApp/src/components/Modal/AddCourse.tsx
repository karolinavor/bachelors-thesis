import React from 'react'
import { useDispatch } from 'react-redux'

import { modalClose } from '../../store/reducers/modalSlice'
import { AppDispatch } from '../../store/store'
import { fetchCourses } from '../../store/reducers/coursesSlice'

export default function AddCourse() {
  const dispatch: AppDispatch = useDispatch()

  async function submitModal(e:React.ChangeEvent<any>) {
    e.preventDefault();

    const form = e.target;
    const formData = {
        title: form[0].value,
        short: form[1].value,
    }

    const response = await fetch(`/api/course/add`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(formData)
    });
    const data = await response.json();
    if (response.status === 201 && data) {
      dispatch(modalClose())
      dispatch(fetchCourses())
    }  
  }

  return (
    <div>
      <form onSubmit={event => submitModal(event)} className="flex-column">
        <div>
          <label htmlFor="name">Course name</label>
          <input id="name" type="text" required></input>
        </div>
        <div>
          <label htmlFor="short">Course short</label>
          <input id="short" type="text" required></input>
        </div>
        <button className="Button" type="submit">Submit</button>
      </form>
    </div>
  )
}