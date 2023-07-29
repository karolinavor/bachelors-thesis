import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();

    function loginUser() {
        navigate("/")
    }

    return (
        <div className="LoginPage">
            <section>
                <h1 className='Login-heading'>
                    Web application for advanced file sharing in a university environment
                </h1>
                <button onClick={() => loginUser()} className="Button">Login</button>
            </section>
        </div>
    )
}