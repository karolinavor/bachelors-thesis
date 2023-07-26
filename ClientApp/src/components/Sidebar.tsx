import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { modalOpen } from '../store/reducers/modalSlice';
import { fetchCourses } from '../store/reducers/coursesSlice';

export default function Sidebar() {    
    const dispatch: AppDispatch = useDispatch()
    const coursesState = useSelector((state: RootState) => state.courses)

    useEffect(() => {
        dispatch(fetchCourses())
    }, [])
    
    function openAddNewCourseModal() {
        dispatch(modalOpen({
            type: `addCourse`
        }))
    }
    
    return (
        <aside>
            <h2>Courses</h2>
            <button className="Button" onClick={() => openAddNewCourseModal()}>Add course</button>
            <nav>
                <ul>
                    {coursesState?.courses?.map(course =>
                        <li key={course.courseId}>
                            <NavLink className="Link" to={"/course/" + course.courseId}>
                                {course.short} - {course.title}
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </aside>
    )
}