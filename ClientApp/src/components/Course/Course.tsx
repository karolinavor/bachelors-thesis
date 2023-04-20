import React, { useEffect, useState } from 'react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import { CommentType, CourseType, FileType } from "../../types/types"
import Comment from '../Comment';

export default function Course() {

    const { id } = useParams();
    const location = useLocation();

    const [course, setCourse] = useState<CourseType>();
    const [courseComments, setCourseComments] = useState<CommentType[]>();

    async function getCourse() {
        const response = await fetch('/api/course');
        const data = await response.json();
        setCourse(data)
    }

    async function getCourseComments() {
        const response = await fetch('/api/course/comments');
        const data = await response.json();
        setCourseComments(data)
    }

    useEffect(() => {
        getCourse()
        getCourseComments()
    }, [])

    function deleteCourse(course: CourseType) {
        // TODO
    }

    function uploadFile() {
        // TODO
    }

    return (
        <>
            {!location.pathname.includes("/file/") &&
                <>
                    <section>
                        <h1>
                            {course?.short} - {course?.title}
                        </h1>
                        <Link className="Button" to={"edit"}>Edit course</Link>
                        <button className="Button" onClick={() => deleteCourse(course)}>Delete course</button>
                        <button className="Button" onClick={() => uploadFile()}>Upload file</button> {/* TODO modal */}
                    </section>
                    <section>
                        <h2 className="mb-1 flex">
                            File system
                        </h2>
                        {course?.files?.map((file: FileType) => 
                            <div>
                                <Link className="Link" to={"file/" + file.id}>{file.name}.{file.filetype}</Link>
                            </div>
                        )}
                    </section>
                    <section>
                        <h2 className='mt-0'>Latest file comments TODO</h2>
                        <Comment
                            user="Joe Doe"
                            content="Ahoj, nevite nekdo jak vypadal test?"
                            subject={{
                                name: "Filename", //comment.typeName
                                type: "File", //comment.type
                                url: 1 //comment.id
                            }}
                        />
                        <Comment
                            user="Joe Doe"
                            content="Ahoj, nevite nekdo jak vypadal test?"
                            subject={{
                                name: "Filename",
                                type: "File",
                                url: 1
                            }}
                        />
                        <Comment
                            user="Joe Doe"
                            content="Ahoj, nevite nekdo jak vypadal test?"
                            subject={{
                                name: "Filename",
                                type: "File",
                                url: 1
                            }}
                        />
                    </section> 
                    <section>
                        <h2 className='mt-0'>Latest course comments</h2>
                        {courseComments?.map((comment: CommentType) => 
                            <Comment
                                user={comment.author}
                                content={comment.commentText}
                                subject={{
                                    name: comment.typeName,
                                    type: comment.type,
                                    url: comment.id
                                }}
                            />
                        )}
                    </section>
                    
                </>
            }
            <Outlet />
        </>
    )
}