import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import News from '../components/News';
import Comment from '../components/Comment';
import { CommentType, CourseType, FileType, NewsType } from '../types/types';
import { useDispatch } from 'react-redux';
import { modalOpen } from '../store/reducers/modalSlice';
import { AppDispatch } from '../store/store';

export default function Dashboard() {

    const dispatch: AppDispatch = useDispatch()
    const [news, setNews] = useState<NewsType[]>([]);
    const [latestComments, setLatestComments] = useState<CommentType[]>([]);
    const [latestCourses, setLatestCourses] = useState<CourseType[]>([]);
    const [latestFiles, setLatestFiles] = useState<FileType[]>([]);

    useEffect(() => {
        getNews()
        getLatestComments()
        getLatestCourses()
        getLatestFiles()
    }, [])

    async function getNews() {
        const response = await fetch('/api/news');
        const data = await response.json();
        setNews(data)
    }

    async function getLatestComments() {
        const response = await fetch('/api/comments/latest');
        const data = await response.json();
        setLatestComments(data)
    }

    async function getLatestCourses() {
        const response = await fetch('/api/courses/latest');
        const data = await response.json();
        setLatestCourses(data)
    }

    async function getLatestFiles() {
        const response = await fetch('/api/files/latest');
        const data = await response.json();
        setLatestFiles(data)
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
                    <button className="Button" onClick={() => openAddNewsModal()}>Add news</button>
                    {news?.map((newsItem: NewsType, index) =>
                        <News
                            date={newsItem.dateAdded}
                            content={newsItem.content}
                            key={index}
                        />
                    )}
                    {news.length > 0 ?
                        <Link className="Link" to={"/news/"}>Show more</Link>
                        : <div>No news. <Link className="Link" to={"/news/"}>Create some.</Link></div>
                    }
                </div>
                {latestComments.length > 0 &&
                    <div>
                        <h2>Latest comments</h2>
                        {latestComments?.map((comment: CommentType, index) =>
                            <Comment
                                comment={comment}
                                showCommentCategory={true}
                            />
                        )}
                    </div>
                }
                {latestCourses.length > 0 &&
                    <div>
                        <h2>Latest courses</h2>
                        {latestCourses?.map((course: CourseType, index) =>
                            <div key={index}>
                                <Link className="Link" to={"/course/" + course.id}>{course.short} - {course.title}</Link>
                            </div>
                        )}
                    </div>
                }
                {latestFiles.length > 0 &&
                    <div>
                        <h2>Latest files</h2>
                        {latestFiles?.map((file: FileType, index) =>
                            <div key={index}>
                                <Link className="Link" to={`/course/${file.courseId}/file/` + file.id}>{file.name}.{file.filetype}</Link>
                            </div>
                        )}
                    </div>
                }
            </div>
        </section>
    )
}