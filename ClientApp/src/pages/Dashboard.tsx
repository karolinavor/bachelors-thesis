import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import News from '../components/News';
import Comment from '../components/Comment';
import { CommentType, CourseType, FileType, NewsType } from '../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { modalOpen } from '../store/reducers/modalSlice';
import { AppDispatch, RootState } from '../store/store';
import addIcon from "../assets/add.svg"
import { fetchLatestNews } from '../store/reducers/newsSlice';

export default function Dashboard() {

    const dispatch: AppDispatch = useDispatch()
    const [latestComments, setLatestComments] = useState<CommentType[]>([]);
    const [latestCourses, setLatestCourses] = useState<CourseType[]>([]);
    const [latestFiles, setLatestFiles] = useState<FileType[]>([]);

    const newsState = useSelector((state: RootState) => state.news)

    const [error, setError] = useState(null);

    useEffect(() => {
        getNewsData()
        getLatestComments()
        getLatestCourses()
        getLatestFiles()
    }, [])

    useEffect(() => {
        if (error) throw new Error();
        setError(false);
    }, [error])

    async function getNewsData() {
        let responseCourse = await dispatch(fetchLatestNews())
        if (responseCourse.meta.requestStatus === "rejected") {
            setError(true)
        }
    }

    async function getLatestComments() {
        const response = await fetch('/api/comments/latest');
        if (response.status === 200) {
            const data = await response.json();
            setLatestComments(data)
        }
    }

    async function getLatestCourses() {
        const response = await fetch('/api/courses/latest');
        if (response.status === 200) {
            const data = await response.json();
            setLatestCourses(data)
        }
    }

    async function getLatestFiles() {
        const response = await fetch('/api/files/latest');
        if (response.status === 200) {
            const data = await response.json();
            setLatestFiles(data)
        }
    }

    function openAddNewsModal() {
        dispatch(modalOpen({
            type: `addNews`
        }))
    }

    return (
        <section>
            <h1>
                Dashboard
            </h1>
            <div className="Homepage-grid">
                <div>
                    <h2>News</h2>
                    <div className="Button-row">
                        <button className="Button" onClick={() => openAddNewsModal()}>
                            <img src={addIcon} alt="Add icon" />
                            Add news
                        </button>
                    </div>
                    {newsState?.news?.map((newsItem: NewsType, index) =>
                        (index < 3 ?
                        <News
                            news={newsItem}
                            key={index}
                        /> : null)
                    )}
                    {newsState?.news.length > 0 ?
                        <Link className="Button" to={"/news/"}>Show more</Link>
                        : <div>No news.</div>
                    }
                </div>
                {latestComments.length > 0 &&
                    <div>
                        <h2>Latest comments</h2>
                        <div className="Comments">
                            {latestComments?.map((comment: CommentType, index) =>
                                <Comment
                                    key={index}
                                    comment={comment}
                                    showCommentCategory={true}
                                    limitLines={true}
                                />
                            )}
                        </div>
                    </div>
                }
                {latestCourses.length > 0 &&
                    <div>
                        <h2>Latest courses</h2>
                        {latestCourses?.map((course: CourseType, index) =>
                            <div key={index}>
                                <Link className="Link" to={"/course/" + course.courseID}>{course.short} - {course.title}</Link>
                            </div>
                        )}
                    </div>
                }
                {latestFiles.length > 0 &&
                    <div>
                        <h2>Latest files</h2>
                        {latestFiles?.map((file: FileType, index) =>
                            <div key={index}>
                                <Link className="Link" to={`/course/${file.courseID}/file/` + file.courseFileID}>{file.name}.{file.filetype}</Link>
                            </div>
                        )}
                    </div>
                }
            </div>
        </section>
    )
}