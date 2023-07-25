import React from 'react'
import { useDispatch } from 'react-redux'

import { modalClose } from '../../store/reducers/modalSlice'
import { AppDispatch } from '../../store/store'

export default function AddNews() {
  const dispatch: AppDispatch = useDispatch()

  async function submitModal(e:React.ChangeEvent<any>) {
    e.preventDefault();

    const form = e.target;
    const formData = {
        content: form[0].value,
    }

    const response = await fetch(`/api/news/add`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(formData)
    });
    const data = await response.json();
    if (response.status === 201 && data) {
      dispatch(modalClose());
    }
  }

  return (
    <div>
      <form onSubmit={event => submitModal(event)} className="flex-column">
          <div>
              <label htmlFor="content">News content</label>
              <textarea id="content" required></textarea>
          </div>
          <button className="Button" type="submit">Submit</button>
      </form>
    </div>
  )
}