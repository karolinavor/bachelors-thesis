import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { RoutesList } from '../router/Router';

export default function Sidebar() {

    type Course = {
        name: string,
        short: string
        _id: string
    };

    const [courses, setCourses] = useState<Array<Course>>([]);

    /*
    useEffect(() => {
        axios.get(`http://localhost:3001/api/courses/all`)
        .then(res => {
            const courses = res.data;
            setCourses(courses);
        })
    }, [])
    */

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
                                    <NavLink to={RoutesList.course.url}>
                                        {course.short} - {course.name}
                                    </NavLink>
                                </li>
                            )
                        }
                    */}
                    <li>
                        <NavLink className="Link" to={RoutesList.course.url}>
                            XTEST
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="Link" to={RoutesList.course.url}>
                            XKBIO
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="Link" to={RoutesList.course.url}>
                            XKCHEM
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="Link" to={RoutesList.course.url}>
                            XKBIO
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="Link" to={RoutesList.course.url}>
                            XKCHEM
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="Link" to={RoutesList.course.url}>
                            XKBIO
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="Link" to={RoutesList.course.url}>
                            XKCHEM
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="Link" to={RoutesList.course.url}>
                            XKINF
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="Link" to={RoutesList.course.url}>
                            MKJAVA
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}