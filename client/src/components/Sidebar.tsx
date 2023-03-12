import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';

export default function Sidebar() {

    type Course = {
        name: string,
        short: string
        _id: string
    };

    const [courses, setCourses] = useState<Array<Course>>([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/courses/all`)
        .then(res => {
            const courses = res.data;
            setCourses(courses);
        })
    }, [])

    return (
        <aside>
            <h2>Courses</h2>
            <nav>
                <ul>
                    {/*
                        {
                            courses
                            .map(course =>
                                <li key={course._id}>
                                    <NavLink to={"/courses/" + course._id}>
                                        {course.short} - {course.name}
                                    </NavLink>
                                </li>
                            )
                        }
                    */}
                    <li>
                        <NavLink className="Link" to={"/courses/xtest"}>
                            XTEST
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="Link" to={"/courses/xtest"}>
                            XKBIO
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="Link" to={"/courses/xtest"}>
                            XKCHEM
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="Link" to={"/courses/xtest"}>
                            XKBIO
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="Link" to={"/courses/xtest"}>
                            XKCHEM
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="Link" to={"/courses/xtest"}>
                            XKBIO
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="Link" to={"/courses/xtest"}>
                            XKCHEM
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="Link" to={"/courses/xtest"}>
                            XKINF
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="Link" to={"/courses/xtest"}>
                            MKJAVA
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}