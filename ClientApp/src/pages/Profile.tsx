import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function Profile() {

    const userState = useSelector((state: RootState) => state.user)

    return (
        <>
            <section>
                <h1>Profile Information</h1>
                <div>
                    <div>Username</div>
                    <div>{userState?.username}</div>
                    <div>Email</div>
                    <div>{userState?.email}</div>
                    <div>Profile</div>
                    <div>{userState?.isAdmin ? "Admin" : "User"}</div>
                </div>
            </section>
        </>
    )
}