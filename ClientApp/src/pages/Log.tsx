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

    function getEventType(log) {
        switch (log.event) {
            case 0: return `New course ${log.courseID} was added`;
            case 1: return `Course ${log.courseID} was edited`;
            case 2: return `Course ${log.courseID} was deleted`;
            case 3: return `New file ${log.courseFileID} was added`;
            case 4: return `File ${log.courseFileID} was deleted`;
            case 5: return "News was added";
            case 6: return "News was edited";
            case 7: return "News was deleted";
            case 8: return `New comment ${log.commentID} was added`;
            case 9: return `Comment ${log.commentID} was deleted`;
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
                                <div>{getEventType(log)} by user {log.userID}</div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    )
}