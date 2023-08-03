import React, { useEffect, useState } from 'react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import { CommentType, FileType } from "../types/types"
import Comment from './Comment';
import { modalOpen } from '../store/reducers/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import bellIcon from "../assets/bell.svg"
import bellTicked from "../assets/bell-ticked.svg"
import deleteIcon from "../assets/delete.svg"
import editIcon from "../assets/edit.svg"
import uploadIcon from "../assets/upload.svg"
import likeBlueIcon from "../assets/like-blue.svg"
import dislikeBlueIcon from "../assets/dislike-blue.svg"
import { toastNotificationAdd } from '../store/reducers/toastNotificationsSlice';
import { fetchCourse, fetchCourseComments, fetchCourseFiles } from '../store/reducers/courseSlice';

export default function Course() {

    const { courseID } = useParams();
    const location = useLocation();
    let dispatch: AppDispatch = useDispatch();

    const courseState = useSelector((state: RootState) => state.course)
    const userState = useSelector((state: RootState) => state.user)

    const [error, setError] = useState(null);

    useEffect(() => {
        getCourseData()
    }, [])

    useEffect(() => {
        getCourseData()
    }, [courseID])

    useEffect(() => {
        if (error) throw new Error();
        setError(false);
    }, [error])

    async function getCourseData() {
        let responseCourse = await dispatch(fetchCourse(parseInt(courseID)))
        if (responseCourse.meta.requestStatus === "rejected") {
            setError(true)
        }

        let responseFiles = await dispatch(fetchCourseFiles(parseInt(courseID)))
        if (responseFiles.meta.requestStatus === "rejected") {
            setError(true)
        }

        let responseComments = await dispatch(fetchCourseComments(parseInt(courseID)))
        if (responseComments.meta.requestStatus === "rejected") {
            setError(true)
        }
    }

    async function openEditCourseModal() {
        dispatch(modalOpen({
            type: `editCourse`,
            data: {
                courseID: courseState.courseID
            }
        }))
    }

    async function openDeleteCourseModal() {
        dispatch(modalOpen({
            type: `deleteCourse`,
            data: {
                courseID: courseState.courseID
            }
        }))
    }

    function openUploadFileModal() {
        dispatch(modalOpen({
            type: `uploadFile`,
            data: {
                courseID: courseState.courseID
            }
        }))
    }

    async function toggleNotifications() {
        const formData = {
            courseID: courseID
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
					notificationID: Date.now(),
					title: "Course notifications turned off.",
					customDuration: 5000,
				})
            );
            dispatch(fetchCourse(parseInt(courseID)))
        } else if (response.status === 201) {
            dispatch(
				toastNotificationAdd({
					notificationID: Date.now(),
					title: "Course notifications turned on.",
					customDuration: 5000,
				})
            );
            dispatch(fetchCourse(parseInt(courseID)))
        } else {
            dispatch(
				toastNotificationAdd({
					notificationID: Date.now(),
					title: "Error occured.",
					customDuration: 5000,
				})
			);
        }
    }

    async function addNewComment(e:React.ChangeEvent<any>) {
        e.preventDefault();

        const form = e.target;
    
        const formData = {
            commentText: form[0].value,
        }

        const response = await fetch(`/api/course/${courseID}/comments/add`, {
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
                  notificationID: Date.now(),
                  title: "New comment added.",
                  customDuration: 5000,
                })
            );
            dispatch(fetchCourseComments(parseInt(courseID)))
        } else {
            dispatch(
                toastNotificationAdd({
                  notificationID: Date.now(),
                  title: "Cannot send comment.",
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
                    <h1>{courseState?.short} - {courseState?.title}</h1>
                    <div className="Button-row">
                            {userState.isAdmin &&
                            <>
                                <button className="Button" onClick={() => openEditCourseModal()}>
                                    <img src={editIcon} alt="Edit icon" />
                                    Edit
                                </button>
                                <button className="Button" onClick={() => openDeleteCourseModal()}>
                                    <img src={deleteIcon} alt="Delete icon" />
                                    Delete
                                </button>
                            </>
                            }
                            <button className="Button" onClick={() => openUploadFileModal()}>
                                <img src={uploadIcon} alt="Upload icon" />
                                Upload file
                            </button>
                            <button className="Button" onClick={() => toggleNotifications()}>
                                {courseState?.notificationSet ?
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
                                {courseState?.files?.length > 0 ? courseState?.files?.map((file: FileType, index) => 
                                    <Link className="Table-row" key={index} to={"file/" + file.courseFileID}>
                                        <div>{file.name}.{file.filetype}</div>
                                        <div className="flex gap-5">
                                            <div className="flex align-center gap-25">
                                                <img src={likeBlueIcon} alt="Like icon" className="me-1" /> {file.likes ?? 0}</div>
                                            <div className="flex align-center gap-25">
                                                <img src={dislikeBlueIcon} alt="Dislike icon" /> {file.likes ?? 0}
                                            </div>
                                        </div>
                                    </Link>
                                ) : 
                                <div className="Table-row">No files</div>}
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
                                    {courseState?.comments?.map((comment: CommentType, index) => 
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