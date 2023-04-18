import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { CourseType } from '../types/types';

export default function Sidebar() {
    const [courses, setCourses] = useState<Array<CourseType>>([]);

    async function getCourses() {
        const response = await fetch('/api/courselist');
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
                    {courses?.map(course =>
                        <li key={course.id}>
                            <NavLink to={"course/" + course.id}>
                                {course.short} - {course.title}
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </aside>
    )
}