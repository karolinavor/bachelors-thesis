import React, { useEffect, useState } from 'react'
import { UserType } from '../types/types';

export default function Log() {

    const [user, setUser] = useState<UserType>();

    async function getUser() {
        const response = await fetch('/api/user');
        const data = await response.json();
        setUser(data)
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <>
            <section>
                <h1>Profile TODO</h1>
                <h2>Profile Information</h2>
                <div>
                    <div>Username</div>
                    <div>{user?.name}</div>
                    <div>Email</div>
                    <div>{user?.email}</div>
                </div>
            </section>
            <section>
                <h2>My files</h2>
                <div>xxx</div>
                <div>xxx</div>
                <div>xxx</div>
            </section>
        </>
    )
}