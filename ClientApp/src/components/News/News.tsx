import React from "react";

type NewProps = {
    date: Date,
    content: string
}

export default function News({ date, content }: NewProps) {
  
    let formattedDate = new Date(date);
    
    return (
        <div className="New">
        <div className="New-date">
            {formattedDate.toLocaleDateString().replaceAll("/", ".")}
        </div>
        <p>
            {content}
        </p>
        </div>
    )
}