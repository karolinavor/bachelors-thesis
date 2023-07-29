import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import userIcon from "../../assets/user.svg"
import logoutIcon from "../../assets/logout.svg"
import menuIcon from "../../assets/menu.svg"
import bellIcon from "../../assets/bell.svg"
import { RoutesList } from "../../router/Router";
import { UserType } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchNotifications } from "../../store/reducers/notificationsSlice";
import HeaderNotifications from "./HeaderNotifications";

export default function Header() {

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch()
    const [user, setUser] = useState<UserType>();
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

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
        <header className={"Header" + (hamburgerOpen ? " Header-hamburger--open" : "") + (notificationsOpen ? " Header-notifications--open" : "")}>
            <div>
                <Link className="Link" to={RoutesList.dashboard.url}>
                    UPFILE
                </Link>
            </div>
            <div className="Header-menu">
                <NavLink className="Link" to="/user/test">
                    <img src={userIcon} alt="user" width="20" height="20" />
                    <span className="Button-text">{user?.name}</span>
                </NavLink>
                <button className="Header-notifications Link" onClick={() => setNotificationsOpen(!notificationsOpen)}>
                    <div className="Header-bell flex">
                        <img src={bellIcon} alt="bell icon" width="20" height="20" />
                    </div>
                    <span className="Button-text">Notifications</span>
                    <HeaderNotifications />
                </button>
                <button className="Link" onClick={() => logOutUser()} >
                    <img src={logoutIcon} alt="logout" width="20" height="20" />
                    <span className="Button-text">Logout</span>
                </button>
                <button className="Header-hamburger Link" onClick={() => setHamburgerOpen(!hamburgerOpen)} >
                    <img src={menuIcon} alt="logout" width="20" height="20" />
                </button>
            </div>
        </header>
    )
}