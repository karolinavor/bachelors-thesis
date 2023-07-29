import React, { useEffect, useState } from 'react'
import { NewsType } from '../types/types';
import News from '../components/News';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { modalOpen } from '../store/reducers/modalSlice';
import addIcon from "../assets/add.svg"

export default function NewsPage() {

    let dispatch: AppDispatch = useDispatch();
    const [news, setNews] = useState<NewsType[]>([]);
    
    useEffect(() => {
        getNews()
    }, [])

    async function getNews() {
        const response = await fetch('/api/news/all');
        const data = await response.json();
        setNews(data)
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
                <div className="Button-row">
                    <button className="Button" onClick={() => openAddNewsModal()}>
                        <img src={addIcon} alt="Add icon" />
                        Add news
                    </button>
                </div>
                {news?.map((newsItem: NewsType, index) =>
                    <News
                        news={newsItem}
                        key={index}
                    />
                )}
            </section>
        </>
    )
}