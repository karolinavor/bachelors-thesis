import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";

export default function Sidebar() {

    type Course = {
        title: string,
        short: string
        id: string
    };

    const [courses, setCourses] = useState<Array<Course>>([]);

    async function getCourses() {
        const response = await fetch('/courselist');
        const data = await response.json();
        setCourses(data)
    }

    useEffect(() => {
        getCourses()
    }, [])

    return (
        <aside>
            <h2>Courses</h2>
            <nav>
                <ul>
                    {
                    courses.map(course =>
                        <li key={course.id}>
                            <NavLink to={"course/" + course.short.toLowerCase()}>
                                {course.short} - {course.title}
                            </NavLink>
                        </li>
                    )
                    }
                </ul>
            </nav>
        </aside>
    )
}