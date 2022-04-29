import React, { useState } from 'react';
import axios from 'axios';

import '../index.css';
import { useEffect } from 'react';

function Homepage() {

    /*
    type User = {
        login: string,
        email: string
    };

    const [users, setUsers] = useState<Array<User>>([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/users/get`)
        .then(res => {
            const persons = res.data;
            setUsers(persons);
        })
    }, [])
    */

    return (
        <main>
            <section>
                <h1>
                    Bachelor Thesis
                </h1>
            </section>
            <section className="text-center">
                {/* 
                {
                    users
                    .map(user =>
                    <li key={user.login}>{user.login} {user.email}</li>
                    )
                }
                */}
            </section>
        </main>
    )
}

export default Homepage