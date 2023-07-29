import React, { useEffect, useState } from 'react'
import { NewsType } from '../types/types';
import News from '../components/News';

export default function NewsPage() {

    const [news, setNews] = useState<NewsType[]>([]);
    
    async function getNews() {
        const response = await fetch('/api/news/all');
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