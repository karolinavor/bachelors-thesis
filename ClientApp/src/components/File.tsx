import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FileType } from '../types/types';
import { getLocalDate, getLocalTime } from '../utils/getTime';

export default function File() {

    const navigate = useNavigate()
    const { fileId } = useParams();
    const [file, setFile] = useState<FileType>(null);

    useEffect(() => {
        getFile()
    }, [])

    async function getFile() {
        const response = await fetch(`/api/file/${fileId}/get`);
        const data = await response.json();
        setFile(data)
    }

    async function deleteFile() {
        const response = await fetch(`/api/file/${fileId}/delete`, {
            method: "DELETE",
        });
        if (response.status === 200) {
            goToCourse();
        }
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

    function goToCourse() {
        let url = window.location.href
        url = url.replace(/\/file\/[0-9]/gi, '')
        let urlParts = url.split("/")
        navigate("/" + urlParts[urlParts.length-2] + "/" + urlParts[urlParts.length-1])
    }

    return (
        <>
            <button className="Button" onClick={() => goToCourse()}>Back to course</button>
            <section>
                <h1>File Detail - {file?.name}</h1>
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
                        <button className="Button Button-large" onClick={() => downloadFile()}>
                            Download
                        </button>
                        <button className="Button Button-large" onClick={() => deleteFile()}>
                            Delete
                        </button>
                    </div>
                </div>
            </section>
            <section>
                <h2>Comments</h2>
                {/*
                {file?.comments?.map((comment: CommentType, index) =>
                    <Comment
                        key={index}
                        comment={comment}
                    />
                )}
                */}
            </section>
        </>
    )
}