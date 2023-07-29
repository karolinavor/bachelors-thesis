import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CommentType, FileType } from '../types/types';
import { getLocalDate, getLocalTime } from '../utils/getTime';
import { modalOpen } from '../store/reducers/modalSlice';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
import Comment from './Comment';
import bellIcon from "../assets/bell.svg"
import downloadIcon from "../assets/download.svg"
import deleteIcon from "../assets/delete.svg"
import bellTicked from "../assets/bell-ticked.svg"

export default function File() {

    const { fileId } = useParams();
    let dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [file, setFile] = useState<FileType>(null);
    const [fileComments, setFileComments] = useState<CommentType[]>();


    useEffect(() => {
        getFile()
        getFileComments()
    }, [])

    useEffect(() => {
        getFile()
        getFileComments()
    }, [fileId])

    async function getFile() {
        const response = await fetch(`/api/file/${fileId}/get`);
        if (!response.ok) {
            navigate(window.location.href.split("file")[0].split(window.location.host)[1]);
        }
        const data = await response.json();
        setFile(data)
    }

    async function getFileComments() {
        const response = await fetch(`/api/file/${fileId}/comments`);
        const data = await response.json();
        setFileComments(data)
    }

    async function downloadFile() {
        const response = await fetch(`/api/file/${fileId}/download`, {
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
            element.download = `${file.name}.${file.filetype}`;
            document.body.appendChild(element);
            element.click();
        }
    }

    async function addNewComment(e:React.ChangeEvent<any>) {
        e.preventDefault();

        const form = e.target;
    
        const formData = {
            commentText: form[0].value,
        }

        const response = await fetch(`/api/file/${fileId}/comments/add`, {
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

    async function openDeleteFileModal() {
        dispatch(modalOpen({
            type: `deleteFile`,
            data: {
                courseId: parseInt(fileId)
            }
        }))
    }

    async function toggleNotifications() {
        const formData = {
            fileId: fileId
        }

        await fetch(`/api/notifications/set`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(formData)
        });
    }

    return (
        <>
            <div className="Button-row">
                <Link className="Button" to={window.location.href.split("file")[0]}>Back to course</Link>
            </div>
            <section>
                <h1>{file?.name}.{file?.filetype}</h1>
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
                        {file?.notificationSet ?
                            <img alt="bell icon" src={bellTicked} />
                            :<img alt="bell icon" src={bellIcon} />
                        }
                    </button>
                </div>
                <div className='File-metadata'>
                    <div>
                        <div><b>User</b></div>
                        <div>{file?.userId}</div>
                    </div>
                    <div>
                        <div><b>Date published</b></div>
                        <div>{getLocalTime(file?.dateAdded)} {getLocalDate(file?.dateAdded)}</div>
                    </div>
                    <div>
                        <div><b>Filetype</b></div>
                        <div>{file?.filetype}</div>
                    </div>
                    <div>
                        <div><b>Size</b></div>
                        <div>{file?.size} B</div>
                    </div>
                    <div>
                        <div><b>Number of downloads</b></div>
                        <div>{file?.numberOfDownloads}</div>
                    </div>
                    {/*
                    <div className='flex'>
                        <div>
                            <div><b>Likes</b></div>
                            <div>{file?.likes}</div>
                        </div>
                        <div>
                            <div><b>Dislikes</b></div>
                            <div>{file?.dislikes}</div>
                        </div>                        
                    </div>
                    */}
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
                    {fileComments?.map((comment: CommentType, index) =>
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