import React, { useEffect, useState } from "react";

export default function HeaderNotifications() {

    //const notificationsState = useSelector((state: RootState) => state.notifications)

    return (
        <div className="Header-notifications-wrapper">
            <div className="Header-notifications-list">
                <div>New file in <a className="Link" href="/">KMI - Informatika</a> course.</div>
                <div>New file in <a className="Link" href="/">KMI - Informatika</a> course.</div>
                <div>New comment in <a className="Link" href="/">Test soubor</a> file.</div>
            </div>
        </div>
    )
}