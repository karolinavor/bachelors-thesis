import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchUser } from '../store/reducers/userSlice';
import { UserType } from '../types/types';

export default function Layout() {

    let navigate = useNavigate()
    let dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        getUserData()
    }, [])

    async function getUserData() {
        let user:UserType = (await dispatch(fetchUser())).payload
        if (!user.email) {
            navigate("/")
        }
    }

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