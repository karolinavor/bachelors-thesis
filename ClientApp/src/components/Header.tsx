import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import userIcon from "../assets/user.svg"
import logoutIcon from "../assets/logout.svg"
import menuIcon from "../assets/menu.svg"
import bellIcon from "../assets/bell.svg"
import { RoutesList } from "../router/Router";
import { UserType } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchNotifications } from "../store/reducers/notificationsSlice";

export default function Header(props) {

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch()
    const [user, setUser] = useState<UserType>();
    const [headerOpen, setHeaderOpen] = useState(false);

    const notificationsState = useSelector((state: RootState) => state.notifications)

    useEffect(() => {
        dispatch(fetchNotifications())
    }, [])

    async function getUser() {
        const response = await fetch('/api/user');
        const data = await response.json();
        setUser(data)
    }

    useEffect(() => {
        getUser()
    }, [])

    function logOutUser() {
        navigate("/login");
    }

    return (
        <header className={"Header" + (headerOpen ? " Header-hamburger--open" : "")}>
            <div>
                <Link className="Link" to={RoutesList.dashboard.url}>
                    UPFILE
                </Link>
            </div>
            <div className="Header-menu flex align-center">
                <NavLink className="Link" to="/user/test">
                    <img src={userIcon} alt="user" width="28" height="28" />
                    <span className="Button-text">{user?.name}</span>
                </NavLink>
                <button className="">
                    <img src={bellIcon} alt="bell icon"/>
                </button>
                <button className="Link" onClick={() => logOutUser()} >
                    <img src={logoutIcon} alt="logout" width="28" height="28" />
                    <span className="Button-text">Logout</span>
                </button>
                <button className="Link Header-hamburger" onClick={() => setHeaderOpen(!headerOpen)} >
                    <img src={menuIcon} alt="logout" width="28" height="28" />
                </button>
            </div>
        </header>
    )
}