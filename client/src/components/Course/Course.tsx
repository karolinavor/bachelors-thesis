import React, { useState, useEffect } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import axios from 'axios';

export default function Course() {

    const { id } = useParams();

    type Course = {
        name: string,
        short: string
        _id: string
    };

    const [course, setCourse] = useState<Course>();

    {/*

    useEffect(() => {
        console.log(id);
        axios.get(`http://localhost:3001/api/courses/` + id)
        .then(res => {
            const courses = res.data;
            setCourse(courses);
        })
    }, [])

    function editCourse(course: Course) {
        axios.put(`http://localhost:3001/api/courses/` + course._id, {
            name: "Matematika 3",
            short: "KMI/MAT3"
        })
        .then(res => {
            console.log(res.data.message);
        })
    }

    function deleteCourse(course: Course) {
        axios.delete(`http://localhost:3001/api/courses/` + course._id)
        .then(res => {
            console.log(res.data.message);
        })
    }
    */}

    return (
        <>
            <h1>
                Informacni technologie
            </h1>
            <div className="mb-1 flex">
                <div className="mr-1">
                    <div>
                        Zkratka
                    </div>
                    <div>
                        XMAT1
                    </div>
                </div>
                <div className="mr-1">
                    <div>
                        Roky
                    </div>
                    <div>
                        2020-2022
                    </div>
                </div>
                <div>
                    <div>
                        Vyučující
                    </div>
                    <div>
                        Karel Novak
                    </div>
                </div>
            </div>
            <div className="mb-1 flex">
                <div className="mr-1">
                    <Link to="files">Přednášky</Link>
                </div>
                <div className="mr-1">
                    <Link to="files">Cvičení</Link>
                </div>
                <div>
                    <Link to="files">Testy</Link>
                </div>
            </div>
            <Outlet />
            {/*<button onClick={() => editCourse(course)}>Edit course</button>
            <button onClick={() => deleteCourse(course)}>Delete course</button>*/}
        </>
    )
}