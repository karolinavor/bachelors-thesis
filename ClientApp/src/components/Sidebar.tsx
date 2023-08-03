import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { RootState, useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import { modalOpen } from '../store/reducers/modalSlice';
import { fetchCourses } from '../store/reducers/coursesSlice';
import addIcon from "../assets/add.svg"

export default function Sidebar() {    
    const dispatch = useAppDispatch()
    const coursesState = useSelector((state: RootState) => state.courses)
    const userState = useSelector((state: RootState) => state.user)

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
            {userState.isAdmin &&
                <button className="Button" onClick={() => openAddNewCourseModal()}>
                    <img src={addIcon} alt="Add icon" />
                    Add course
                </button>
            }
            <nav>
                <ul>
                    {coursesState?.courses?.map(course =>
                        <li key={course.courseID}>
                            <NavLink className="Link" to={"/course/" + course.courseID}>
                                {course.short} - {course.title}
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </aside>
    )
}