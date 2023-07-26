import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CommentType, FileType } from '../types/types';
import { getLocalDate, getLocalTime } from '../utils/getTime';
import { modalOpen } from '../store/reducers/modalSlice';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
import Comment from './Comment';
import bellWhiteIcon from "../assets/bell-white.svg"

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
            author: "Karolina TODO"
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
            userId: 0,
            fileId: fileId
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
            <Link className="Button" to={window.location.href.split("file")[0]}>Back to course</Link>
            <section>
                <h1>File Detail - {file?.name}</h1>
                <div className="flex">
                    <button className="Button" onClick={() => downloadFile()}>
                        Download
                    </button>
                    <button className="Button" onClick={() => openDeleteFileModal()}>
                        Delete
                    </button>
                    <button className="Button" onClick={() => toggleNotifications()}>
                        <img alt="bell icon" src={bellWhiteIcon} />
                    </button>
                </div>
                <div className='flex justify-between'>
                    <div className='flex flex-column'>
                        <div>
                            <div><b>Author</b></div>
                            <div>{file?.author}</div>
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
                </div>
            </section>
            <section>
                <h2>Comments</h2>
                <form onSubmit={event => addNewComment(event)} className="flex-column">
                    <div>
                        <label htmlFor="content">Comment:</label>
                        <textarea id="content" required></textarea>
                    </div>
                    <button className="Button" type="submit">Send comment</button>
                </form>
                {fileComments?.map((comment: CommentType, index) =>
                    <Comment
                        key={index}
                        comment={comment}
                    />
                )}
            </section>
        </>
    )
}