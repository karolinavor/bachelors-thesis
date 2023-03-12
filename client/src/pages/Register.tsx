import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {

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
        <section>
            <h1>
                Registrace
            </h1>
            <form onSubmit={event => handleRegister(event)} className="text-center flex-column">
                <div className="warning">{warning}</div>
                <label htmlFor="username">Uživatelské jméno</label>
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
                <label htmlFor="password">Heslo</label>
                <input
                    id="password"
                    type="password"
                    required
                ></input>
                <button type="submit">Registrovat se</button>
            </form>

            <button>SSO</button>
        </section>
    )
}