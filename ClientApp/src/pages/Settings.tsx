import React, { useState } from 'react';

export default function Settings() {

    const handleSettingsSave = (e:React.ChangeEvent<any>) => {
        e.preventDefault();

        const form = e.target;
        const formData = {
            username: form[0].value,
            password: form[1].value
        }

        console.log(formData)
    }

    return (
        <>
            <section>
                <h1>Settings TODO</h1>
                <form onSubmit={event => handleSettingsSave(event)}>
                    <div>
                        <label htmlFor="picture">Profilový obrázek</label>
                        <input id="picture" type="file" required></input>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" required></input>
                    </div>
                    <div>
                        <label htmlFor="newPassword">New password</label>
                        <input id="newPassword" type="password" required></input>
                    </div>
                    <button className="Button" type="submit">Save</button>
                </form>
            </section>
            <section>
                <h2>Notification settings</h2>
                <div>TODO</div>
            </section>
            <section>
                <h2>Courses settings</h2>
                <div>Checkboxes with courses TODO</div>
            </section>
        </>
    )
}