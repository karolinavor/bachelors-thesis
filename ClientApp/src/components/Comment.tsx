import React from "react";
import { Link } from "react-router-dom";

type CommentProps = {
  user: string,
  subject: {
    type: "Course" | "File",
    name: string,
    url: number
  },
  content: string
}

export default function Comment({user, subject, content}: CommentProps) {
    return (
      <div className="Comment">
        <span className="Comment-picture"></span>
        <div>
          <Link className="Comment-heading" to={"/user/test"}>{user}</Link>
          <span> in </span>
          <Link to={(subject.type === "File" ? "file/" : "course/") + subject.url}>{subject.name}</Link>
        </div>
        <p className="Comment-content">{content}</p>
      </div>
    )
}