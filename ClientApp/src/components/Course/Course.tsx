import React, { useEffect, useState } from 'react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import { RoutesList } from '../../router/Router';
import Comment from "../Comment"
import { CourseType, FileType } from "../../types/types"

export default function Course() {

    const { id } = useParams();
    const location = useLocation();

    const [course, setCourse] = useState<CourseType>();

    async function getCourse() {
        const response = await fetch('/api/course');
        const data = await response.json();
        setCourse(data)
    }

    useEffect(() => {
        getCourse()
    }, [])

    {/*
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
            {!location.pathname.includes("/file/") &&
                <>
                    <h1>
                        {course?.short} - {course?.title}
                    </h1>
                    <div className="flex">
                        <div className='w-100'>
                            <div className="mb-1 flex">
                                Souborovy system
                            </div>
                            {course?.files?.map((file: FileType) => 
                                <div>
                                    <Link to={"file/"+file.id}>{file.name}</Link>
                                </div>
                            )}
                        </div>
                        <div className='w-100'>
                            <h2 className='mt-0'>Latest file comments</h2>
                            <Comment
                                user="Joe Doe"
                                content="Ahoj, nevite nekdo jak vypadal test?"
                                course={{
                                    short: "KMI",
                                    url: "users/root"
                                }}
                            />
                            <Comment
                                user="Joe Doe"
                                content="Ahoj, nevite nekdo jak vypadal test?"
                                course={{
                                    short: "KMI",
                                    url: "users/root"
                                }}
                            />
                            <Comment
                                user="Joe Doe"
                                content="Ahoj, nevite nekdo jak vypadal test?"
                                course={{
                                    short: "KMI",
                                    url: "users/root"
                                }}
                            />
                        </div>
                    </div>
                    <div className='w-100'>
                        <h2 className='mt-0'>Latest course comments</h2>
                        <Comment
                            user="Joe Doe"
                            content="Ahoj, nevite nekdo jak vypadal test?"
                            course={{
                                short: "KMI",
                                url: "users/root"
                            }}
                        />
                        <Comment
                            user="Joe Doe"
                            content="Ahoj, nevite nekdo jak vypadal test?"
                            course={{
                                short: "KMI",
                                url: "users/root"
                            }}
                        />
                        <Comment
                            user="Joe Doe"
                            content="Ahoj, nevite nekdo jak vypadal test?"
                            course={{
                                short: "KMI",
                                url: "users/root"
                            }}
                        />
                    </div>
                </>
            }
            <Outlet />
            {/*<button onClick={() => editCourse(course)}>Edit course</button>
            <button onClick={() => deleteCourse(course)}>Delete course</button>*/}
        </>
    )
}