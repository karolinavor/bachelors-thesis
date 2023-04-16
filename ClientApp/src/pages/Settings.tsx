import React, { useState } from 'react';

export default function Settings() {

    const [warning, setWarning] = useState("");

    const handleSettingsSave = (e:React.ChangeEvent<any>) => {
        e.preventDefault();

        const form = e.target;
        const user = {
            username: form[0].value,
            password: form[1].value
        }
    }

    return (
        <section>
            <h1>Nastavení</h1>
            <form onSubmit={event => handleSettingsSave(event)} className="flex flex-column">
                <div className="warning">{warning}</div>
                <label htmlFor="picture">Profilový obrázek</label>
                <input id="picture" type="file" required></input>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" required></input>
                <label htmlFor="newPassword">New password</label>
                <input id="newPassword" type="password" required></input>
                <button type="submit">Uložit</button>
            </form>
        </section>
    )
}