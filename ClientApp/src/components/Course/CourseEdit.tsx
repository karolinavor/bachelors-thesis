import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function CourseEdit() {

    const navigate = useNavigate()
    const { id } = useParams();

    async function addCourse(e:React.ChangeEvent<any>) {
        e.preventDefault();

        const form = e.target;
        const formData = {
            id: id,
            title: form[0].value,
            short: form[1].value
        }

        await fetch(`/api/course/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(formData)
        });
    }

    function goToCourse() {
        let url = window.location.href
        url = url.replace(/\/edit/gi, '')
        let urlParts = url.split("/")
        navigate("/" + urlParts[urlParts.length-2] + "/" + urlParts[urlParts.length-1])
    }

    return (
        <>
            <button className="Button" onClick={() => goToCourse()}>Back to course</button>
            <section>
                <h1>Edit course</h1>
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
        </>
    )
}