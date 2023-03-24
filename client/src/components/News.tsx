import React from "react";

type NewProps = {
  date: string,
  content: string
}

export default function News({date, content}: NewProps) {
    return (
      <div className="New">
        <div className="New-date">
            {date}
        </div>
        <p>
          {content}
        </p>
      </div>
    )
}