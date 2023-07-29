import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CommentType } from "../types/types";
import { getLocalDate, getLocalTime } from "../utils/getTime";
import userIcon from "../assets/user.svg"
import { modalOpen } from "../store/reducers/modalSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import deleteIcon from "../assets/delete.svg"

type CommentTypeExtended = {
  comment: CommentType,
  showCommentCategory?: boolean
}

export default function Comment({ comment, showCommentCategory }: CommentTypeExtended) {

  let dispatch: AppDispatch = useDispatch();

  async function openDeleteCommentModal() {
    dispatch(modalOpen({
        type: `deleteComment`,
        data: {
          commentId: comment.commentId
        }
    }))
  }

  return (
    <div className="Comment">
      <span className="Comment-picture">
        <img src={userIcon} alt="user" width="28" height="28" />
      </span>
      <div>
        <Link className="Link Comment-heading" to={"/user/" + comment.userId}>{comment.userId}</Link>
        {showCommentCategory &&
          <>
          <span> in {comment.fileId > 0 ? "file " : "course "}</span>
            <Link className="Link" to={"/" + (comment.fileId > 0 ? `course/${comment.courseId}/file/${comment.fileId}` : `course/${comment.courseId}`)}>{comment.categoryName}</Link>
          </>
        }
        <div>{getLocalTime(comment.dateAdded)} {getLocalDate(comment.dateAdded)}</div>
      </div>
      <div className="Button-row mb-0">
        <button className="Button" onClick={() => openDeleteCommentModal()}>
          <img src={deleteIcon} alt="Delete icon" width="16" height="16" />
        </button>
      </div>
      <div className="Comment-content">
        <p>{comment.commentText}</p>
      </div>
    </div>
  )
}