import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { CommentType, FileType } from '../types/types';
import { Link } from 'react-router-dom';
import likeBlackIcon from "../assets/like-black.svg"
import dislikeBlackIcon from "../assets/dislike-black.svg"
import Comment from "../components/Comment"
import { fetchUser } from '../store/reducers/userSlice';
import deleteIcon from "../assets/delete.svg";
import {modalOpen} from "../store/reducers/modalSlice";

export default function Profile() {

    let dispatch: AppDispatch = useDispatch();
    const userState = useSelector((state: RootState) => state.user)

    useEffect(() => {
        getUserData()
    }, [])

    async function getUserData() {
        await dispatch(fetchUser())
    }

    async function openDeleteFileModal(courseFileID: number, courseID: number) {
        dispatch(modalOpen({
            type: `deleteFile`,
            data: {
                courseFileID: courseFileID,
                courseID: courseID,
                refresh: "profile"
            }
        }))
    }

    return (
        <>
            <section>
                <h1>Profile Information</h1>
                <div>
                    <div><b>Username</b></div>
                    <div className="mb-1">{userState?.user?.username}</div>
                    <div><b>Email</b></div>
                    <div className="mb-1">{userState?.user?.email}</div>
                    <div><b>Role</b></div>
                    <div>{userState?.user?.isAdmin ? "Admin" : "User"}</div>
                </div>
            </section>
            <section>
                <h2>User files</h2>
                <div className="Table">
                    {userState?.files?.length > 0 ? userState?.files?.map((file: FileType, index) => 
                        <div className="Table-row" key={index}>
                            <Link to={"/course/"+file.courseID+"/file/" + file.courseFileID}>
                                <div className="flex align-center">{file.name}.{file.filetype}</div>
                                <div className="flex gap-5">
                                    <div className="flex align-center gap-25">
                                        <img src={likeBlackIcon} alt="Like icon" className="me-1" /> {file.likes ?? 0}</div>
                                    <div className="flex align-center gap-25">
                                        <img src={dislikeBlackIcon} alt="Dislike icon" /> {file.dislikes ?? 0}
                                    </div>
                                </div>
                            </Link>
                            {file.userID === userState.user.userID &&
                                <button className="Button ml-1" onClick={() => openDeleteFileModal(file.courseFileID, file.courseID)}>
                                    <img src={deleteIcon} alt="Delete icon" />
                                </button>
                            }
                        </div>
                    ) : 
                    <div className="Table-row"><div className="flex align-center">No files</div></div>}
                </div>
            </section>
            <section>
                <h2>User comments</h2>
                <div className="Comments">
                    {userState?.comments?.map((comment: CommentType, index) => 
                        <Comment
                            key={index}
                            comment={comment}
                            showCommentCategory={true}
                            limitLines={true}
                        />
                    )}
                </div>
            </section>
        </>
    )
}