import React from "react";
import { Link } from "react-router-dom";
import { CommentType } from "../types/types";
import { getLocalDate, getLocalTime } from "../utils/getTime";
import userIcon from "../assets/user.svg"
import { modalOpen } from "../store/reducers/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import deleteIcon from "../assets/delete.svg"
import likeIcon from '../assets/like.svg'
import dislikeIcon from '../assets/dislike.svg'
import { toastNotificationAdd } from "../store/reducers/toastNotificationsSlice";
import { fetchFileComments } from "../store/reducers/fileSlice";
import { fetchCourseComments } from "../store/reducers/courseSlice";
import { fetchDashboardComments } from "../store/reducers/dashboardSlice";
import { fetchUser } from "../store/reducers/userSlice";

type CommentTypeExtended = {
  comment: CommentType,
  showCommentCategory?: boolean,
  limitLines?: boolean
}

export default function Comment({ comment, showCommentCategory, limitLines }: CommentTypeExtended) {

  let dispatch: AppDispatch = useDispatch();

  const userState = useSelector((state: RootState) => state.user)

  async function openDeleteCommentModal() {
    dispatch(modalOpen({
        type: `deleteComment`,
        data: {
          commentID: comment.commentID,
          courseFileID: comment.courseFileID,
          courseID: comment.courseID
        }
    }))
  }

  async function addReaction(reaction) {
    const formData = {
      commentID: comment.commentID
    }
    
    const url = (reaction === "Like" ? `/api/like/add` : `/api/dislike/add`)
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(formData)
    });

    if (response.status === 201 || response.status === 200) {
      dispatch(
        toastNotificationAdd({
          notificationID: Date.now(),
          title: "Reaction added.",
          customDuration: 5000,
        })
      );
      if (window.location.pathname.includes("file/")) {
        await dispatch(fetchFileComments({id: comment.courseFileID, showItems: 5}))
      } else if (window.location.pathname.includes("course/")) {
        await dispatch(fetchCourseComments({id: comment.courseID, showItems: 5}))
      } else if (window.location.pathname.includes("dashboard")) {
        await dispatch(fetchDashboardComments())
      } else if (window.location.pathname.includes("profile")) {
        await dispatch(fetchUser())
      }
    } else {
      dispatch(
        toastNotificationAdd({
          notificationID: Date.now(),
          title: "Error occured.",
          customDuration: 5000,
        })
      );
    }
  }

  return (
    <div className="Comment">
      <span className="Comment-picture">
        <img src={userIcon} alt="user" width="28" height="28" />
      </span>
      <div className="Comment-heading">
        <Link className="Link" to={"/user/" + comment.userID}>{comment.username}</Link>
        {showCommentCategory &&
          <>
          <span> in {comment.courseFileID > 0 ? "file " : "course "}</span>
            <Link className="Link" to={"/" + (comment.courseFileID > 0 ? `course/${comment.courseID}/file/${comment.courseFileID}` : `course/${comment.courseID}`)}>{comment.categoryName}</Link>
          </>
        }
        <div className="Comment-time">{getLocalTime(comment.dateAdded)} {getLocalDate(comment.dateAdded)}</div>
      </div>
      <div className={"Comment-content" + (limitLines ? " Comment-content--limited" : "")}>
        <p>{comment.commentText}</p>
      </div>
      <div className="Button-row mb-0 mt-1">
        {(userState?.user?.isAdmin || userState?.user?.userID === comment.userID) &&
          <button className="Button" onClick={() => openDeleteCommentModal()}>
            <img src={deleteIcon} alt="Delete icon" width="16" height="16" />
          </button>
        }
        <button className={"Button" + (comment.reacted === 1 ? " active" : "")} onClick={() => addReaction("Like")}>
          <img src={likeIcon} alt="Like icon" /> {comment.likes}
        </button>
        <button className={"Button" + (comment.reacted === 2 ? " active" : "")} onClick={() => addReaction("Dislike")}>
          <img src={dislikeIcon} alt="Dislike icon" /> {comment.dislikes}
        </button>
      </div>
    </div>
  )
}