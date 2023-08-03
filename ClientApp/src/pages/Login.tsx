import React from 'react';

export default function Login() {
    return (
        <div className="LoginPage">
            <section>
                <h1 className='Login-heading'>
                    Web application for advanced file sharing in a university environment
                </h1>
                <a href="/api/login" className="Button">Login</a>
            </section>
        </div>
    )
}