import React, { useEffect, useState } from 'react'
import { getLocalTimeWithSeconds, getLocalDate } from '../utils/getTime';
import { LogType } from '../types/types';

export default function Log() {

    const [logs, setLogs] = useState<LogType[]>();

    async function getlog() {
        const response = await fetch('/api/log');
        const data = await response.json();
        setLogs(data)
    }

    useEffect(() => {
        getlog()
    }, [])

    function getEventType(event) {
        switch (event) {
            case 0: return "New course was added";
            case 1: return "Course was edited";
            case 2: return "Course was deleted";
            case 3: return "New file was added";
            case 4: return "File was deleted";
            case 5: return "News was added";
            case 6: return "News was edited";
            case 7: return "News was deleted";
            case 8: return "New comment was added";
            case 9: return "Comment was deleted";
        }
    }

    return (
        <>
            <section>
                <h1>Log</h1>
                <div className="Table">
                    {logs?.map((log, index) => {
                        return (
                            <div className="Table-row" key={index}>
                                <div>{getLocalTimeWithSeconds(log.dateAdded)} {getLocalDate(log.dateAdded)}</div>
                                <div>{getEventType(log.event)} by user {log.userId}</div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    )
}