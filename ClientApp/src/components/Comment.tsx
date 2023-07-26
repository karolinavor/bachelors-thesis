import React from "react";
import { Link } from "react-router-dom";
import { CommentType } from "../types/types";
import { getLocalDate, getLocalTime } from "../utils/getTime";
import userIcon from "../assets/user.svg"

type CommentTypeExtended = {
  comment: CommentType,
  showCommentCategory?: boolean
}


export default function Comment({ comment, showCommentCategory }: CommentTypeExtended) {
  return (
    <div className="Comment">
      <span className="Comment-picture">
        <img src={userIcon} alt="user" width="28" height="28" />
      </span>
      <div>
        <Link className="Link Comment-heading" to={"/user/" + comment.author}>{comment.author}</Link>
        {showCommentCategory &&
          <>
          <span> in {comment.fileId > 0 ? "file " : "course "}</span>
            <Link className="Link" to={"/" + (comment.fileId > 0 ? `course/${comment.courseId}/file/${comment.fileId}` : `course/${comment.courseId}`)}>{comment.categoryName}</Link>
          </>
        }
        <div>{getLocalTime(comment.dateAdded)} {getLocalDate(comment.dateAdded)}</div>
      </div>
      <p className="Comment-content">{comment.commentText}</p>
    </div>
  )
}