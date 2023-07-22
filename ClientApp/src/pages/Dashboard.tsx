import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import News from '../components/News';
import Comment from '../components/Comment';
import { CommentType, CourseType, FileType, NewsType } from '../types/types';

export default function Dashboard() {

    const [news, setNews] = useState<NewsType[]>([]);
    const [latestComments, setLatestComments] = useState<CommentType[]>([]);
    const [latestCourses, setLatestCourses] = useState<CourseType[]>([]);
    const [latestFiles, setLatestFiles] = useState<FileType[]>([]);

    async function getNews() {
        const response = await fetch('/api/news');
        const data = await response.json();
        setNews(data)
    }

    async function getLatestComments() {
        const response = await fetch('/api/comment/latest');
        const data = await response.json();
        setLatestComments(data)
    }

    async function getLatestCourses() {
        const response = await fetch('/api/course/latest');
        const data = await response.json();
        setLatestCourses(data)
    }

    async function getLatestFiles() {
        const response = await fetch('/api/file/latest');
        const data = await response.json();
        setLatestFiles(data)
    }

    useEffect(() => {
        getNews()
        getLatestComments()
        getLatestCourses()
        getLatestFiles()
    }, [])

    return (
        <section>
            <h1>
                Dashboard
            </h1>
            <div className="Homepage-grid">
                <div>
                    <h2>News</h2>
                    {news?.map((newsItem: NewsType) =>
                        <News
                            date={newsItem.date}
                            content={newsItem.content}
                        />
                    )}
                </div>
                <div>
                    <h2>Latest comments</h2>
                    {latestComments?.map((comment: CommentType) => 
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
                </div>
                <div>
                    <h2>Latest courses</h2>
                    {latestCourses?.map((course: CourseType) =>
                        <div>
                            <Link className="Link" to={"/course/" + course.id}>XKMI - Matematicka informatika</Link>
                        </div>
                    )}
                </div>
                <div>
                    <h2>Latest files</h2>
                    {latestFiles?.map((file: FileType) =>
                        <div>
                            <Link className="Link" to={"/course/1/file/" + file.id}>XBP2 - Pololetni test</Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}