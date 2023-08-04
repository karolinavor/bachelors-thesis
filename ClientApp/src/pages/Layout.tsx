import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { fetchUser } from '../store/reducers/userSlice';
import { UserType } from '../types/types';

export default function Layout() {

    let navigate = useNavigate()
    let dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        getUserData()
    }, [])

    async function getUserData() {
        let userState = (await dispatch(fetchUser())).payload
        if (!userState?.user?.email) {
            navigate("/")
        }
    }

    return (
        <div className="Page">
            <Header />
            <div className="container">
                <Sidebar />
                <main>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    )
}