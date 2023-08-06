import React, { useEffect, useState } from 'react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import { CommentType, FileType } from "../types/types"
import Comment from '../components/Comment';
import { modalOpen } from '../store/reducers/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import bellIcon from "../assets/bell.svg"
import bellTicked from "../assets/bell-ticked.svg"
import deleteIcon from "../assets/delete.svg"
import editIcon from "../assets/edit.svg"
import uploadIcon from "../assets/upload.svg"
import likeBlackIcon from "../assets/like-black.svg"
import dislikeBlackIcon from "../assets/dislike-black.svg"
import { toastNotificationAdd } from '../store/reducers/toastNotificationsSlice';
import { FetchNumberOfFiles, fetchCourse, fetchCourseComments, fetchCourseFiles } from '../store/reducers/courseSlice';
import closeIcon from "../assets/close.svg"
import { courses } from '../store/reducers/coursesSlice';

export default function Course() {

    const { courseID } = useParams();
    const location = useLocation();
    let dispatch: AppDispatch = useDispatch();

    const courseState = useSelector((state: RootState) => state.course)
    const userState = useSelector((state: RootState) => state.user)

    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("")

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

        let responseComments = await dispatch(fetchCourseComments({id: parseInt(courseID), showItems: 5}))
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

    async function openDeleteFileModal(courseFileID: number) {
        dispatch(modalOpen({
            type: `deleteFile`,
            data: {
                courseFileID: courseFileID,
                courseID: parseInt(courseID),
                refresh: "course"
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
            dispatch(fetchCourseComments({id: parseInt(courseID), showItems: 5}))
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
                            {userState?.user?.isAdmin &&
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
                        <div className="SearchInput">
                            <input
                                type="text"
                                value={filter}
                                onChange={event => setFilter(event.target.value.toLowerCase())}
                                placeholder='Filter files..'
                            />
                            <button onClick={() => setFilter("")}>
                                <img src={closeIcon} alt="Close icon" width="16" height="16" />
                            </button>
                        </div>
                            <div className="Table">
                                {courseState?.files?.length > 0 ? courseState?.files?.filter((f, index) => (f.name.toLowerCase() + `.` + f.filetype).includes(filter) || filter === '').map((file: FileType, index) => 
                                    <div className="Table-row" key={index}>
                                        <Link to={"file/" + file.courseFileID}>
                                            <div className="flex align-center">{file.name}.{file.filetype}</div>
                                            <div className="flex gap-5">
                                                <div className="flex align-center gap-25">
                                                    <img src={likeBlackIcon} alt="Like icon" className="me-1" /> {file.likes ?? 0}</div>
                                                <div className="flex align-center gap-25">
                                                    <img src={dislikeBlackIcon} alt="Dislike icon" /> {file.dislikes ?? 0}
                                                </div>
                                                
                                            </div>
                                        </Link>
                                        {(file.userID === userState.user.userID || userState.user.isAdmin) &&
                                            <button className="Button ml-1" onClick={() => openDeleteFileModal(file.courseFileID)}>
                                                <img src={deleteIcon} alt="Delete icon" />
                                            </button>
                                        }
                                    </div>
                                ) : 
                                <div className="Table-row"><div className="flex align-center">No files</div></div>}
                            </div>
                        </section>
                        <div>
                            <section>
                                <h2 className='mt-0'>Course comments</h2>
                                <form onSubmit={event => addNewComment(event)} className="flex-column">
                                    <div>
                                        <label htmlFor="content">Comment - max. 400 characters</label>
                                        <textarea id="content" required maxLength={400}></textarea>
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
                                {(courseState.comments.length < courseState.numberOfComments && courseState.numberOfComments > 5) &&
                                    <button className="Button mt-1" onClick={() =>
                                        dispatch(fetchCourseComments({id: parseInt(courseID), showItems: courseState.comments.length + 5}))}>Show more comments
                                    </button>
                                }
                            </section>
                        </div>
                    </div>
                </>
            }
            <Outlet />
        </>
    )
}