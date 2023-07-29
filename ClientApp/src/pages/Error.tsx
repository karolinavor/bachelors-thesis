import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';

export default function Error() {
    return (
        <div className="ErrorPage">
            <Header />
            <main>
                <h1>Error</h1>
                <h2>404 Not found</h2>
            </main>
            <Footer />
        </div>
    );
}