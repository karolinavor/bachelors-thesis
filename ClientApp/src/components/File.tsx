import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CommentType } from '../types/types';
import { getLocalDate, getLocalTime } from '../utils/getTime';
import { modalOpen } from '../store/reducers/modalSlice';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment';
import bellIcon from "../assets/bell.svg"
import downloadIcon from "../assets/download.svg"
import deleteIcon from "../assets/delete.svg"
import bellTicked from "../assets/bell-ticked.svg"
import leftIcon from "../assets/left.svg"
import likeIcon from "../assets/like.svg"
import dislikeIcon from "../assets/dislike.svg"
import { toastNotificationAdd } from '../store/reducers/toastNotificationsSlice';
import { fetchFile, fetchFileComments } from '../store/reducers/fileSlice';

export default function File() {

    const { courseFileID } = useParams();
    let dispatch: AppDispatch = useDispatch();

    const fileState = useSelector((state: RootState) => state.file)

    const [error, setError] = useState(null);

    useEffect(() => {
        getFileData()
    }, [])

    useEffect(() => {
        getFileData()
    }, [courseFileID])

    useEffect(() => {
        if (error) throw new Error();
    }, [error])

    async function getFileData() {
        let responseFile = await dispatch(fetchFile(parseInt(courseFileID)))
        if (responseFile.meta.requestStatus === "rejected") {
            setError(true)
        }

        let responseComments = await dispatch(fetchFileComments(parseInt(courseFileID)))
        if (responseComments.meta.requestStatus === "rejected") {
            setError(true)
        }
    }

    async function downloadFile() {
        const response = await fetch(`/api/file/${courseFileID}/download`, {
            method: "GET",
        }).then((response) => {
            if (response.status === 200) {
                return response.blob();
            } else {
                return null
            }
        });
        if (response) {
            const element = document.createElement("a");
            const newFile = new Blob([response], {type: 'text/plain'});
            element.href = URL.createObjectURL(newFile);
            element.download = `${fileState.name}.${fileState.filetype}`;
            document.body.appendChild(element);
            element.click();
            dispatch(fetchFile(parseInt(courseFileID)))
        }
    }

    async function addNewComment(e:React.ChangeEvent<any>) {
        e.preventDefault();

        const form = e.target;
    
        const formData = {
            commentText: form[0].value,
        }

        const response = await fetch(`/api/file/${courseFileID}/comments/add`, {
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
            dispatch(fetchFileComments(parseInt(courseFileID)))
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

    async function openDeleteFileModal() {
        dispatch(modalOpen({
            type: `deleteFile`,
            data: {
                courseFileID: parseInt(courseFileID),
                courseID: fileState.courseID
            }
        }))
    }

    async function toggleNotifications() {
        const formData = {
            courseFileID: courseFileID
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
					title: "File notifications turned off.",
					customDuration: 5000,
				})
            );
            dispatch(fetchFile(parseInt(courseFileID)))
        } else if (response.status === 201) {
            dispatch(
				toastNotificationAdd({
					notificationID: Date.now(),
					title: "File notifications turned on.",
					customDuration: 5000,
				})
            );
            dispatch(fetchFile(parseInt(courseFileID)))
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

    async function addReaction(reaction) {
        const formData = {
            courseFileID: parseInt(courseFileID)
        }
        
        const url = (reaction === "Like" ? `/api/like/add` : `/api/dislike/add`)
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(formData)
        });
    
        if (response.status === 201 || response.status === 200) {
          dispatch(
            toastNotificationAdd({
              notificationID: Date.now(),
              title: "Reaction added.",
              customDuration: 5000,
            })
          );
          dispatch(fetchFile(parseInt(courseFileID)))
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

    return (
        <>
            <div className="Button-row">
                <Link className="Button" to={window.location.href.split("file")[0]}>
                    <img src={leftIcon} alt="Left icon" />
                    Back to course
                </Link>
            </div>
            <section>
                <h1>{fileState?.name}.{fileState?.filetype}</h1>
                <div className="Button-row">
                    <button className="Button" onClick={() => downloadFile()}>
                        <img src={downloadIcon} alt="Download icon" />
                        Download
                    </button>
                    <button className="Button" onClick={() => openDeleteFileModal()}>
                        <img src={deleteIcon} alt="Delete icon" />
                        Delete
                    </button>
                    <button className="Button" onClick={() => toggleNotifications()}>
                        {fileState?.notificationSet ?
                            <img alt="bell icon" src={bellTicked} />
                            :<img alt="bell icon" src={bellIcon} />
                        }
                    </button>
                    <button className={"Button" + (fileState.reacted === 1 ? " active" : "")} onClick={() => addReaction("Like")}>
                        <img src={likeIcon} alt="Like icon" /> {fileState.likes}
                    </button>
                    <button className={"Button" + (fileState.reacted === 2 ? " active" : "")} onClick={() => addReaction("Dislike")}>
                        <img src={dislikeIcon} alt="Dislike icon" /> {fileState.dislikes}
                    </button>
                </div>
                <div className='File-metadata'>
                    <div>
                        <div><b>User</b></div>
                        <div>{fileState?.userID}</div>
                    </div>
                    <div>
                        <div><b>Date published</b></div>
                        <div>{getLocalTime(fileState?.dateAdded)} {getLocalDate(fileState?.dateAdded)}</div>
                    </div>
                    <div>
                        <div><b>Filetype</b></div>
                        <div>{fileState?.filetype}</div>
                    </div>
                    <div>
                        <div><b>Size</b></div>
                        <div>{fileState?.size} B</div>
                    </div>
                    <div>
                        <div><b>Number of downloads</b></div>
                        <div>{fileState?.numberOfDownloads}</div>
                    </div>
                </div>
            </section>
            <section>
                <h2>Comments</h2>
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
                    {fileState?.comments?.map((comment: CommentType, index) =>
                        <Comment
                            key={index}
                            comment={comment}
                        />
                    )}
                </div>
            </section>
        </>
    )
}