import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../index.css';

function Login() {

    const navigate = useNavigate();

    const [warning, setWarning] = useState("");

    const handleLogin = (e:React.ChangeEvent<any>) => {
        e.preventDefault();

        const form = e.target;
        const user = {
            username: form[0].value,
            password: form[1].value
        }

        try {
            axios.post(`http://localhost:3001/api/users/login`, {
                headers: {
                    "Content-type": "application/json"
                },
                body: user
            })
            .then(res => {
                if (res.data.token) {
                    localStorage.setItem("token", res.data.token);
                    navigate('/');
                } else {
                    setWarning(res.data.message);
                }          
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main>
            <section>
                <h1>
                    Login
                </h1>
            </section>
            <section>
                <form onSubmit={event => handleLogin(event)} className="text-center flex-column">
                    <div className="warning">{warning}</div>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" required></input>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" required></input>
                    <button type="submit">Login</button>
                </form>
            </section>
        </main>
    )
}

export default Login