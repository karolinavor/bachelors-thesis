import React, { useEffect } from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export default function HeaderNotifications() {
    const notificationsState = useSelector((state: RootState) => state.notifications)
    const courseState = useSelector((state: RootState) => state.courses)

    useEffect(() => {
        sendReadNotifications()
    }, [])

    async function sendReadNotifications() {
        await fetch('/api/notifications/set/read');
    }

    function getNotification(notif, index) {
        switch (notif.event) {
            case 3: 
                return <div className={!notif.read ? "unread" : "read"} key={index}>
                    <span>New file in <a className="Link" href={`/course/${notif.courseID}`}>{courseState.courses.find((c) => c.courseID === notif.courseID).title}</a> course.</span>
                </div>
            case 8: 
                return (notif.courseFileID > 0 ?
                <div className={!notif.read ? "unread" : "read"} key={index}>
                        <span>New file comment in <a className="Link" href={`/course/${notif.courseID}/file/${notif.courseFileID}`}>{courseState.courses.find((c) => c.courseID === notif.courseID)?.title}</a>.</span>
                </div> :
                <div className={!notif.read ? "unread" : "read"} key={index}>
                    <span>New comment in course <a className="Link" href={`/course/${notif.courseID}`}>{courseState.courses.find((c) => c.courseID === notif.courseID).title}</a>.</span>
                </div>)
        }
    }

    return (
        <div className="Header-notifications-wrapper">
            <div className="Header-notifications-list">
                {notificationsState?.notifications?.map((notif, index) => getNotification(notif, index)
                )}
            </div>
        </div>
    )
}