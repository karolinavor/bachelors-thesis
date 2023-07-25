import React from "react";
import { getLocalDate, getLocalTime } from "../utils/getTime";

type NewProps = {
    date: Date,
    content: string
}

export default function News({ date, content }: NewProps) {
    
    return (
        <div className="New">
        <div className="New-date">
            {getLocalTime(date)} {getLocalDate(date)}
        </div>
        <p>
            {content}
        </p>
        </div>
    )
}