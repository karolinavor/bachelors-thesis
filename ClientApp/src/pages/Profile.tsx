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
                    <div><b>Username</b></div>
                    <div className="mb-1">{userState?.username}</div>
                    <div><b>Email</b></div>
                    <div className="mb-1">{userState?.email}</div>
                    <div><b>Role</b></div>
                    <div>{userState?.isAdmin ? "Admin" : "User"}</div>
                </div>
            </section>
        </>
    )
}