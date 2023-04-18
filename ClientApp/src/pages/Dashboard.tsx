import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import News from '../components/News';
import Comment from '../components/Comment';
import { RoutesList } from '../router/Router';
import { NewsType } from '../types/types';

export default function Dashboard() {

    const [news, setNews] = useState<Array<NewsType>>([]);

    async function getNews() {
        const response = await fetch('/api/news');
        const data = await response.json();
        setNews(data)
    }

    useEffect(() => {
        getNews()
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
                    <Comment
                        user="Joe Doe"
                        content="Ahoj, nevite nekdo jak vypadal test?"
                        course={{
                            short: "KMI",
                            url: "users/root"
                        }}
                    />
                    <Comment
                        user="Joe Doe"
                        content="Ahoj, nevite nekdo jak vypadal test?"
                        course={{
                            short: "KMI",
                            url: "users/root"
                        }}
                    />
                    <Comment
                        user="Joe Doe"
                        content="Ahoj, nevite nekdo jak vypadal test?"
                        course={{
                            short: "KMI",
                            url: "users/root"
                        }}
                    />
                </div>
                <div>
                    <h2>Latest courses</h2>
                    <div>
                        <Link className="Link" to={RoutesList.course.url}>XKMI - Matematicka informatika</Link>
                    </div>
                    <div>
                        <Link className="Link" to={RoutesList.course.url}>XBP2 - Matematicka informatika</Link>
                    </div>
                    <div>
                        <Link className="Link" to={RoutesList.course.url}>XBP1 - Matematicka informatika</Link>
                    </div>
                </div>
                <div>
                    <h2>Latest files</h2>
                    <div>
                        <Link className="Link" to={RoutesList.course.url + RoutesList.file.url}>XBP2 - Pololetni test</Link>
                    </div>
                    <div>
                        <Link className="Link" to={RoutesList.course.url + RoutesList.file.url}>XBP2 - Pololetni test</Link>
                    </div>
                    <div>
                        <Link className="Link" to={RoutesList.course.url + RoutesList.file.url}>XBP1 - Pololetni test</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}