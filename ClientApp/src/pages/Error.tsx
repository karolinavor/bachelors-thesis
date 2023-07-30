import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';
import { useRouteError } from 'react-router-dom';

type ErrorType = {
    statusText: string
}

export default function Error() {
    const error = useRouteError() as ErrorType;
    
    return (
        <div className="ErrorPage">
            <Header />
            <main>
                <h1>Error</h1>
                <h2>404 Not Found</h2>
            </main>
            <Footer />
        </div>
    );
}