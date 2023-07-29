import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

export default function Layout() {
    return (
        <div className="Page">
            <Header />
            <Sidebar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}