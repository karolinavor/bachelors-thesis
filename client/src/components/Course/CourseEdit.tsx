import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CourseEdit() {

    const navigate = useNavigate();

    const [warning, setWarning] = useState("");

    function addCourse(e:React.ChangeEvent<any>) {
        e.preventDefault();

        const form = e.target;
        const course = {
            name: form[0].value,
            short: form[1].value
        }

        /*
        axios.put(`http://localhost:3001/api/courses/add`, course)
        .then(res => {
            if (res.data.created) {
                navigate('/courses');
            }
        })
        */
    }

    return (
        <section>
            <h1>
                Course Edit
            </h1>
            <form onSubmit={event => addCourse(event)} className="text-center flex-column">
                <div className="warning">{warning}</div>
                <label htmlFor="name">Course name</label>
                <input id="name" type="text" required></input>
                <label htmlFor="short">Course short</label>
                <input id="short" type="text" required></input>
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}