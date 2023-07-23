import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function NewsAdd() {

  const navigate = useNavigate();

  async function addNews(e) {
    e.preventDefault()

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
      navigate(`/`);
    }
  }

  return (
      <>
          <section>
                <h1>Add news</h1>
                <form onSubmit={event => addNews(event)} className="flex-column">
                    <div>
                        <label htmlFor="content">News content</label>
                        <textarea id="content" required></textarea>
                    </div>
                    <button className="Button" type="submit">Submit</button>
                </form>
          </section>
      </>
  )
}