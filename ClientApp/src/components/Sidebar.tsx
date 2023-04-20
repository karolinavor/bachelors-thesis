import React, { useState, useEffect } from 'react';
import { Link, NavLink, Router } from "react-router-dom";
import { CourseType } from '../types/types';
import { RoutesList } from '../router/Router';

export default function Sidebar() {
    const [courses, setCourses] = useState<CourseType[]>([]);

    async function getCourses() {
        const response = await fetch('/api/course/list');
        const data = await response.json();
        setCourses(data)
    }

    useEffect(() => {
        getCourses()
    }, [])

    return (
        <aside>
            <h2>Courses</h2>
            <Link className="Button" to={RoutesList.courseAdd.url}>Add course</Link>
            <nav>
                <ul>
                    {courses?.map(course =>
                        <li key={course.id}>
                            <NavLink className="Link" to={"/course/" + course.id}>
                                {course.short} - {course.title}
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </aside>
    )
}