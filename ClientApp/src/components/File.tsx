import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Comment from "./Comment"
import { CommentType, FileType } from '../types/types';

export default function File() {

    const navigate = useNavigate()
    const [file, setFile] = useState<FileType>(null);

    async function getFile() {
        const response = await fetch('/api/file');
        const data = await response.json();
        setFile(data)
    }

    useEffect(() => {
        getFile()
    }, [])

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
                <h1>File Detail</h1>
                <div className='flex justify-between'>
                    <div className='flex flex-column'>
                        <div>
                            <div><b>Author</b></div>
                            <div>{file?.author}</div>
                        </div>
                        <div>
                            <div><b>Date published</b></div>
                            <div>{file?.datePublished}</div>
                        </div>
                        <div>
                            <div><b>Filetype</b></div>
                            <div>{file?.filetype}</div>
                        </div>
                        <div>
                            <div><b>Size</b></div>
                            <div>{file?.size}</div>
                        </div>
                        <div>
                            <div><b>Number of downloads</b></div>
                            <div>{file?.numberOfDownloads}</div>
                        </div>
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
                        <a className="Button Button-large" href={file?.url} download>
                            Download
                        </a>
                    </div>
                    <div>
                        <img src={file?.thumbnail} alt="File thumbnail" width="300" height="300" />
                    </div>
                </div>
            </section>
            <section>
                <h2>Comments</h2>
                {file?.comments?.map((comment: CommentType) =>
                    <Comment
                        user={comment.user}
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
    )
}