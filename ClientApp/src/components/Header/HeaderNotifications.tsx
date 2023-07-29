import React, { useEffect, useState } from "react";
import { NotificationType } from "../../types/types";

export default function HeaderNotifications() {

    const [notifications, setNotifications] = useState<NotificationType[]>();

    async function getNotifications() {
        const response = await fetch('/api/notifications/get');
        const data = await response.json();
        setNotifications(data)
    }

    useEffect(() => {
        getNotifications()
    }, [])

    return (
        <div className="Header-notifications-wrapper">
            <div className="Header-notifications-list">
                {notifications?.map((notif, index) => {
                    return <div key={index}>{notif.notificationId}</div>
                })}
                {/*
                <div>New file in <a className="Link" href="/">KMI - Informatika</a> course.</div>
                <div>New file in <a className="Link" href="/">KMI - Informatika</a> course.</div>
                <div>New comment in <a className="Link" href="/">Test soubor</a> file.</div>
                */}
            </div>
        </div>
    )
}