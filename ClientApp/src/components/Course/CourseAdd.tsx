import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CourseEdit() {

    const navigate = useNavigate();

    async function addCourse(e:React.ChangeEvent<any>) {
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
            navigate(`/course/${data.id}`);
        }
    }

    return (
        <section>
            <h1>Add new course</h1>
            <form onSubmit={event => addCourse(event)} className="flex-column">
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
        </section>
    )
}