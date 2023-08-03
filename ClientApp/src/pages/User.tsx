import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserType } from '../types/types';

export default function User() {

    const { userID } = useParams();

    const [user, setUser] = useState<UserType>()

    useEffect(() => {
        fetchUser()
    }, [])
    
    async function fetchUser() {
        let response = await fetch(`/api/user/${userID}/get`)
        if (response.status === 200) {
            const data = await response.json();
            setUser(data)
        }
    }

    return (
        <>
            <section>
                <h1>User {user?.userID}</h1>
                <div>
                    <div>Username</div>
                    <div>{user?.username}</div>
                    <div>Email</div>
                    <div>{user?.email}</div>
                </div>
            </section>
        </>
    )
}