import React from "react";
import { Link } from "react-router-dom";
import { CommentType } from "../types/types";
import { getLocalDate, getLocalTime } from "../utils/getTime";

type CommentTypeExtended = {
  comment: CommentType
}

export default function Comment({ comment }: CommentTypeExtended) {
  return (
    <div className="Comment">
      <span className="Comment-picture"></span>
      <div>
        <Link className="Comment-heading" to={"/user/" + comment.author}>{comment.author}</Link>
        <div>{getLocalTime(comment.dateAdded)} {getLocalDate(comment.dateAdded)}</div>
        {/*<Link to={(subject.type === "File" ? "file/" : "course/") + subject.url}>{subject.name}</Link>*/}
      </div>
      <p className="Comment-content">{comment.commentText}</p>
    </div>
  )
}