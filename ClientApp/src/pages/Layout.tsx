import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../store/reducers/coursesSlice';
import { AnyAction } from 'redux';
import { AppDispatch } from '../store/store';

export default function Layout() {

    const [username, setUsername] = useState<String>(null);

    useEffect(() => {
        /*
        axios.get(`http://localhost:3001/api/users/isUserAuth`, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => {
            if (res.data.isLoggedIn) {
                setUsername(res.data.username);
                navigate('/');
            } else {
                setUsername(null);
                navigate('login');
            }
        })
        */
    }, [])
    

    return (
        <div className="Page">
            <Header username={username} />
            <Sidebar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}