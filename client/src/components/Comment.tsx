import React from "react";
import { Link } from "react-router-dom";

type CommentProps = {
  user: string,
  course: {
    short: string,
    url: string
  },
  content: string
}

export default function Comment({user, course, content}: CommentProps) {
    return (
      <div className="Comment">
        <span className="Comment-picture"></span>
        <div>
          <Link className="Comment-heading" to="user/root">{user}</Link>
          <span> v predmetu </span>
          <Link to={course.url}>{course.short}</Link>
        </div>
        <p className="Comment-content">{content}</p>
      </div>
    )
}