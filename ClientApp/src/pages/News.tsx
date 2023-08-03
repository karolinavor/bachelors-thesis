import React, { useEffect, useState } from 'react'
import { NewsType } from '../types/types';
import News from '../components/News';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { modalOpen } from '../store/reducers/modalSlice';
import addIcon from "../assets/add.svg"
import { fetchAllNews } from '../store/reducers/newsSlice';

export default function NewsPage() {

    let dispatch: AppDispatch = useDispatch();
    
    const newsState = useSelector((state: RootState) => state.news)
    const userState = useSelector((state: RootState) => state.user)

    const [error, setError] = useState(null);
    
    useEffect(() => {
        getAllNewsData()
    }, [])

    useEffect(() => {
        if (error) throw new Error();
        setError(false);
    }, [error])

    async function getAllNewsData() {
        let responseCourse = await dispatch(fetchAllNews())
        if (responseCourse.meta.requestStatus === "rejected") {
            setError(true)
        }
    }

    function openAddNewsModal() {
        dispatch(modalOpen({
            type: `addNews`
        }))
    }

    return (
        <>
            <section>
                <h1>News</h1>
                {userState.isAdmin &&
                    <div className="Button-row">
                        <button className="Button" onClick={() => openAddNewsModal()}>
                            <img src={addIcon} alt="Add icon" />
                            Add news
                        </button>
                    </div>
                }
                {newsState?.news?.map((newsItem: NewsType, index) =>
                    <News
                        news={newsItem}
                        key={index}
                    />
                )}
            </section>
        </>
    )
}