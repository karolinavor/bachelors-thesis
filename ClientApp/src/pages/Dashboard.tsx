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
import { fetchDashboardComments, fetchDashboardCourses, fetchDashboardFiles } from '../store/reducers/dashboardSlice';

export default function Dashboard() {

    const dispatch: AppDispatch = useDispatch()

    const userState = useSelector((state: RootState) => state.user)
    const dashboardState = useSelector((state: RootState) => state.dashboard)
    const newsState = useSelector((state: RootState) => state.news)

    const [error, setError] = useState(null);

    useEffect(() => {
        getDashboardData()
    }, [])

    useEffect(() => {
        if (error) throw new Error();
        setError(false);
    }, [error])

    async function getDashboardData() {
        let responseNews = await dispatch(fetchLatestNews())
        if (responseNews.meta.requestStatus === "rejected") {
            setError(true)
        }

        let responseComments = await dispatch(fetchDashboardComments())
        if (responseComments.meta.requestStatus === "rejected") {
            setError(true)
        }

        let responseFiles = await dispatch(fetchDashboardFiles())
        if (responseFiles.meta.requestStatus === "rejected") {
            setError(true)
        }

        let responseCourses = await dispatch(fetchDashboardCourses())
        if (responseCourses.meta.requestStatus === "rejected") {
            setError(true)
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
                    {userState?.user?.isAdmin &&
                        <div className="Button-row">
                            <button className="Button" onClick={() => openAddNewsModal()}>
                                <img src={addIcon} alt="Add icon" />
                                Add news
                            </button>
                        </div>
                    }
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
                {dashboardState?.comments?.length > 0 &&
                    <div>
                        <h2>Latest comments</h2>
                        <div className="Comments">
                            {dashboardState?.comments?.map((comment: CommentType, index) =>
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
                {dashboardState.courses.length > 0 &&
                    <div>
                        <h2>Latest courses</h2>
                        <ul>
                            {dashboardState?.courses?.map((course: CourseType, index) =>
                                <li key={index}>
                                    <Link className="Link" to={"/course/" + course.courseID}>{course.short} - {course.title}</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                }
                {dashboardState?.files?.length > 0 &&
                    <div>
                        <h2>Latest files</h2>
                        <ul>
                            {dashboardState?.files?.map((file: FileType, index) =>
                                <li key={index}>
                                    <Link className="Link" to={`/course/${file.courseID}/file/` + file.courseFileID}>{file.name}.{file.filetype}</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                }
            </div>
        </section>
    )
}