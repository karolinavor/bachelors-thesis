import React from "react";
import { getLocalDate, getLocalTime } from "../utils/getTime";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { modalOpen } from "../store/reducers/modalSlice";
import { NewsType } from "../types/types";

type NewProps = {
    news: NewsType
}

export default function News({ news }: NewProps) {

    let dispatch: AppDispatch = useDispatch();

    const userState = useSelector((state: RootState) => state.user)

    async function openEditNewsModal() {
        dispatch(modalOpen({
            type: `editNews`,
            data: {
                newsID: news.newsID
            }
        }))
    }

    async function openDeleteNewsModal() {
        dispatch(modalOpen({
            type: `deleteNews`,
            data: {
                newsID: news.newsID
            }
        }))
    }
    
    return (
        <div className="New">
             {userState?.user?.isAdmin &&
                <div className="Button-row mb-0">
                    <button className="Button mb-0" onClick={() => openEditNewsModal()}>
                        Edit news
                    </button>
                    <button className="Button mb-0" onClick={() => openDeleteNewsModal()}>
                        Delete news
                    </button>
                </div>
            }
            <div className="New-date">
                {getLocalTime(news.dateAdded)} {getLocalDate(news.dateAdded)}
            </div>
            <p>
                {news.content}
            </p>
        </div>
    )
}