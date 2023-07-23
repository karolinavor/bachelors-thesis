import React, { useEffect, useState } from 'react';
import { useParams, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { CommentType, CourseType, FileType } from "../../types/types"
import Comment from '../Comment';
import { modalOpen } from '../../store/reducers/modalSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';

export default function Course() {

    const { courseId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    let dispatch: AppDispatch = useDispatch();

    const [course, setCourse] = useState<CourseType>();
    const [files, setFiles] = useState<FileType[]>();
    const [courseComments, setCourseComments] = useState<CommentType[]>();
    const [filesComments, setFilesComments] = useState<CommentType[]>();

    async function getCourse() {
        const response = await fetch(`/api/course/${courseId}`);
        const data = await response.json();
        if (!data) {
            navigate("/");
        }
        setCourse(data)
    }

    async function getFiles() {
        const response = await fetch(`/api/course/${courseId}/files`);
        const data = await response.json();
        if (!data) {
            navigate("/");
        }
        setFiles(data)
    }

    async function getCourseComments() {
        const response = await fetch(`/api/course/${courseId}/comments`);
        const data = await response.json();
        setCourseComments(data)
    }

    useEffect(() => {
        getCourse()
        getCourseComments()
        getFiles()
    }, [])

    async function deleteCourse() {
        const response = await fetch(`/api/course/${courseId}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "DELETE"
        });
        if (response.status === 200) {
            navigate("/");
        }
    }

    function showUploadModal() {
        dispatch(modalOpen({
            type: `uploadFile`,
            data: {
                courseId: parseInt(courseId)
            }
        }))
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
                        <button className="Button" onClick={() => deleteCourse()}>Delete course</button>
                        <button className="Button" onClick={() => showUploadModal()}>Upload file</button> {/* TODO modal */}
                    </section>
                    <div className='Course-layout'>
                        <section>
                            <h2 className="mb-1 flex">
                                File system
                            </h2>
                            {files?.map((file: FileType, index) => 
                                <div key={index}>
                                    <Link className="Link" to={"file/" + file.id}>{file.name}.{file.filetype}</Link>
                                </div>
                            )}
                        </section>
                        <div>
                            <section>
                                <h2 className='mt-0'>Latest file comments TODO</h2>
                                {filesComments?.map((comment: CommentType, index) => 
                                    <Comment
                                        key={index}
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
                            <section>
                                <h2 className='mt-0'>Latest course comments</h2>
                                {courseComments?.map((comment: CommentType, index) => 
                                    <Comment
                                        key={index}
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
                        </div>
                    </div>
                </>
            }
            <Outlet />
        </>
    )
}