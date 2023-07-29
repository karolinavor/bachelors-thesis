import React, { useEffect, useState } from 'react';
import { useParams, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { CommentType, CourseType, FileType } from "../types/types"
import Comment from './Comment';
import { modalOpen } from '../store/reducers/modalSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import bellWhiteIcon from "../assets/bell-white.svg"

export default function Course() {

    const { courseId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    let dispatch: AppDispatch = useDispatch();

    const [course, setCourse] = useState<CourseType>();
    const [files, setFiles] = useState<FileType[]>();
    const [courseComments, setCourseComments] = useState<CommentType[]>();

    useEffect(() => {
        getCourse()
        getCourseComments()
        getFiles()
    }, [])

    useEffect(() => {
        getCourse()
        getCourseComments()
        getFiles()
    }, [courseId])

    async function getCourse() {
        const response = await fetch(`/api/course/${courseId}/get`);
        if (!response.ok) {
            navigate("/");
        }
        const data = await response.json();
        setCourse(data)
    }

    async function getFiles() {
        const response = await fetch(`/api/course/${courseId}/files`);
        const data = await response.json();
        setFiles(data)
    }

    async function getCourseComments() {
        const response = await fetch(`/api/course/${courseId}/comments`);
        const data = await response.json();
        setCourseComments(data)
    }

    async function addNewComment(e:React.ChangeEvent<any>) {
        e.preventDefault();

        const form = e.target;
    
        const formData = {
            commentText: form[0].value,
            author: "Karolina TODO"
        }

        const response = await fetch(`/api/course/${courseId}/comments/add`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        if (response.status === 201 && data) {
            form.reset()
        }
    }

    async function openEditCourseModal() {
        dispatch(modalOpen({
            type: `editCourse`,
            data: {
                courseId: course.courseId
            }
        }))
    }

    async function openDeleteCourseModal() {
        dispatch(modalOpen({
            type: `deleteCourse`,
            data: {
                courseId: course.courseId
            }
        }))
    }

    function openUploadFileModal() {
        dispatch(modalOpen({
            type: `uploadFile`,
            data: {
                courseId: course.courseId
            }
        }))
    }

    async function toggleNotifications() {
        const formData = {
            userId: 0,
            courseId: courseId
        }

        const response = await fetch(`/api/notifications/add`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        if (response.status === 201 && data) {
            // TODO toast notification 
        }
    }

    return (
        <>
            {!location.pathname.includes("/file/") &&
                <>
                    <section>
                    <h1>{course?.short} - {course?.title}</h1>
                        <div className="flex">
                            <button className="Button" onClick={() => openEditCourseModal()}>Edit course</button>
                            <button className="Button" onClick={() => openDeleteCourseModal()}>Delete course</button>
                            <button className="Button" onClick={() => openUploadFileModal()}>Upload file</button>
                            <button className="Button" onClick={() => toggleNotifications()}>
                                <img alt="bell icon" src={bellWhiteIcon} />
                            </button>
                        </div>
                    </section>
                    <div className='Course-layout'>
                        <section>
                            <h2 className="mb-1 flex">
                                File system
                            </h2>
                            <div className="FileTable">
                                {files?.map((file: FileType, index) => 
                                    <Link className="FileTable-row" key={index} to={"file/" + file.courseFileId}>{file.name}.{file.filetype}</Link>
                                )}
                            </div>
                        </section>
                        <div>
                            <section>
                                <h2 className='mt-0'>Course comments</h2>
                                <form onSubmit={event => addNewComment(event)} className="flex-column">
                                    <div>
                                        <label htmlFor="content">Comment:</label>
                                        <textarea id="content" required></textarea>
                                    </div>
                                    <button className="Button" type="submit">Send comment</button>
                                </form>
                                {courseComments?.map((comment: CommentType, index) => 
                                    <Comment
                                        key={index}
                                        comment={comment}
                                    />
                                )}
                            </section>
                        </div>
                    </div>
                </>
            }
            <Outlet />
        </>
    )
}