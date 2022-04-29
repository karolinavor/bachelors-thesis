import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../index.css';

function Register() {

    const navigate = useNavigate();

    const [warning, setWarning] = useState("");

    const handleRegister = (e:React.ChangeEvent<any>) => {
        e.preventDefault();

        const form = e.target;
        const user = {
            username: form[0].value,
            email: form[1].value,
            password: form[2].value
        }

        try {
            axios.post(`http://localhost:3001/api/users/register`, {
                headers: {
                    "Content-type": "application/json"
                },
                body: user
            })
            .then(res => {
                if (res.data.registered) {
                    navigate('/login');
                } else {
                    setWarning(res.data.message);
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/api/users/isUserAuth`, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.data.isLoggedIn ? navigate('/') : null)
    }, [])

    return (
        <main>
            <section>
                <h1>
                    Register
                </h1>
            </section>
            <section>
                <form onSubmit={event => handleRegister(event)} className="text-center flex-column">
                    <div className="warning">{warning}</div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        required
                    ></input>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        required
                    ></input>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        required
                    ></input>
                    <button type="submit">Register</button>
                </form>
            </section>
        </main>
    )
}

export default Register