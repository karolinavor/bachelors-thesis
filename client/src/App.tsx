import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './index.css'

function App() {

    const navigate = useNavigate();

    const [username, setUsername] = useState<String>(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/users/isUserAuth`, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => {
            if (res.data.isLoggedIn) {
                setUsername(res.data.username);
                navigate('/');
            }
        })
    }, [])
    

    return (
        <div className="page">
            <Navbar username={username} />
            <Outlet />
            <Footer />
        </div>
    )
}

export default App