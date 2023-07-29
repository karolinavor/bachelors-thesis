import React, { useEffect, useState } from 'react';
import { useParams, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { CommentType, CourseType, FileType } from "../types/types"
import Comment from './Comment';
import { modalOpen } from '../store/reducers/modalSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import bellIcon from "../assets/bell.svg"
import bellTicked from "../assets/bell-ticked.svg"
import deleteIcon from "../assets/delete.svg"
import editIcon from "../assets/edit.svg"
import uploadIcon from "../assets/upload.svg"
import { toastNotificationAdd } from '../store/reducers/toastNotificationsSlice';

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
        if (response.status !== 200) {
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
        }

        const response = await fetch(`/api/course/${courseId}/comments/add`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(formData)
        });

        if (response.status === 201) {
            form.reset()
            dispatch(
                toastNotificationAdd({
                  notificationId: Date.now(),
                  title: "New comment added.",
                  customDuration: 5000,
                })
            );
        } else {
            dispatch(
                toastNotificationAdd({
                  notificationId: Date.now(),
                  title: "Cannot send comment.",
                  customDuration: 5000,
                })
            );
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
            courseId: courseId
        }

        const response = await fetch(`/api/notifications/set`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(formData)
        });

        if (response.status === 200) {
            dispatch(
				toastNotificationAdd({
					notificationId: Date.now(),
					title: "Course notifications turned off.",
					customDuration: 5000,
				})
			);
        } else if (response.status === 201) {
            dispatch(
				toastNotificationAdd({
					notificationId: Date.now(),
					title: "Course notifications turned on.",
					customDuration: 5000,
				})
			);
        } else {
            dispatch(
				toastNotificationAdd({
					notificationId: Date.now(),
					title: "Error occured.",
					customDuration: 5000,
				})
			);
        }
    }

    return (
        <>
            {!location.pathname.includes("/file/") &&
                <>
                <section>
                    <h1>{course?.short} - {course?.title}</h1>
                        <div className="Button-row">
                            <button className="Button" onClick={() => openEditCourseModal()}>
                                <img src={editIcon} alt="Edit icon" />
                                Edit
                            </button>
                            <button className="Button" onClick={() => openDeleteCourseModal()}>
                                <img src={deleteIcon} alt="Delete icon" />
                                Delete
                            </button>
                            <button className="Button" onClick={() => openUploadFileModal()}>
                                <img src={uploadIcon} alt="Upload icon" />
                                Upload file
                            </button>
                            <button className="Button" onClick={() => toggleNotifications()}>
                                {course?.notificationSet ?
                                    <img alt="bell icon" src={bellTicked} />
                                    :<img alt="bell icon" src={bellIcon} />
                                }
                            </button>
                        </div>
                    </section>
                    <div className='Course-layout'>
                        <section>
                            <h2 className="mb-1 flex">
                                File system
                            </h2>
                            <div className="Table">
                                {files?.map((file: FileType, index) => 
                                    <Link className="Table-row" key={index} to={"file/" + file.courseFileId}>{file.name}.{file.filetype}</Link>
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
                                    <div className="Button-row">
                                        <button className="Button" type="submit">Send comment</button>
                                    </div>
                                </form>
                                <div className="Comments">
                                    {courseComments?.map((comment: CommentType, index) => 
                                        <Comment
                                            key={index}
                                            comment={comment}
                                        />
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>
                </>
            }
            <Outlet />
        </>
    )
}