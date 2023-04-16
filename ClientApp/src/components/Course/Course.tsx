import React, { useState } from 'react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import { RoutesList } from '../../router/Router';
import Comment from "../Comment"

export default function Course() {

    const { id } = useParams();
    const location = useLocation();

    type Course = {
        name: string,
        short: string
        _id: string
    };

    const [course, setCourse] = useState<Course>();

    {/*
    useEffect(() => {
        console.log(id);
        axios.get(`http://localhost:3001/api/courses/` + id)
        .then(res => {
            const courses = res.data;
            setCourse(courses);
        })
    }, [])

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
                        KMI - Informacni technologie
                    </h1>
                    <div className="flex">
                        <div className='w-100'>
                            <div className="mb-1 flex">
                                Souborovy system
                            </div>
                            <Link to={RoutesList.file.url}>Soubor</Link>
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