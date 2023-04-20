import React from 'react';

export default function CourseEdit() {

    function addCourse(e:React.ChangeEvent<any>) {
        e.preventDefault();

        const form = e.target;
        const formData = {
            name: form[0].value,
            short: form[1].value
        }

        console.log(formData)

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