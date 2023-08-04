import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { RootState, useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import { modalOpen } from '../store/reducers/modalSlice';
import { fetchCourses } from '../store/reducers/coursesSlice';
import addIcon from "../assets/add.svg"
import closeIcon from "../assets/close.svg"

export default function Sidebar() {    
    const dispatch = useAppDispatch()
    const coursesState = useSelector((state: RootState) => state.courses)
    const userState = useSelector((state: RootState) => state.user)

    const [filter, setFilter] = useState("")

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
            {userState?.user?.isAdmin &&
                <button className="Button mb-1" onClick={() => openAddNewCourseModal()}>
                    <img src={addIcon} alt="Add icon" />
                    Add course
                </button>
            }
            <div className="SearchInput">
                <input
                    type="text"
                    value={filter}
                    onChange={event => setFilter(event.target.value.toLowerCase())}
                    placeholder='Filter courses..'
                />
                <button onClick={() => setFilter("")}>
                    <img src={closeIcon} alt="Close icon" width="16" height="16" />
                </button>
            </div>
            <nav>
                <ul>
                    {coursesState?.courses?.filter(f => f.short.toLowerCase().includes(filter) || f.title.toLowerCase().includes(filter) || filter === '').map((course) => {
                        return (
                            <li key={course.courseID}>
                                <NavLink className="Link" to={"/course/" + course.courseID}>
                                    {course.short} - {course.title}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </aside>
    )
}