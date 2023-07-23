import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { NewsType } from '../types/types';
import { RoutesList } from '../router/Router';
import News from '../components/News/News';

export default function NewsPage() {

    const [news, setNews] = useState<NewsType[]>([]);
    
    async function getNews() {
        const response = await fetch('/api/news');
        const data = await response.json();
        setNews(data)
    }
    
    useEffect(() => {
        getNews()
    }, [])

    return (
        <>
            <section>
                <h1>News</h1>
                <Link className="Button" to={`/`+RoutesList.newsAdd.url}>Add news</Link>
                {news?.map((newsItem: NewsType, index) =>
                    <News
                        date={newsItem.dateAdded}
                        content={newsItem.content}
                        key={index}
                    />
                )}
            </section>
        </>
    )
}