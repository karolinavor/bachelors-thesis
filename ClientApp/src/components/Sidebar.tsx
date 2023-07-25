import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { CourseType } from '../types/types';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
import { modalOpen } from '../store/reducers/modalSlice';

export default function Sidebar() {
    const [courses, setCourses] = useState<CourseType[]>([]);
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        getCourses()
    }, [])

    async function getCourses() {
        const response = await fetch('/api/courses', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"
        });
        const data = await response.json();
        setCourses(data)
    }
    
    function openAddNewCourseModal() {
        dispatch(modalOpen({
            type: `addCourse`
        }))
    }

    // TODO get items when new added
    
    return (
        <aside>
            <h2>Courses</h2>
            <button className="Button" onClick={() => openAddNewCourseModal()}>Add course</button>
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