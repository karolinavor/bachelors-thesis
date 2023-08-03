import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import userWhiteIcon from "../../assets/user-white.svg"
import logoutIcon from "../../assets/logout.svg"
import menuIcon from "../../assets/menu.svg"
import bellIcon from "../../assets/bell.svg"
import logoIcon from "../../assets/logo.svg"
import { RoutesList } from "../../router/Router";
import { UserType } from "../../types/types";
import HeaderNotifications from "./HeaderNotifications";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../../store/reducers/notificationsSlice";
import { AppDispatch, RootState } from "../../store/store";

export default function Header() {

    let dispatch: AppDispatch = useDispatch();
    const [user, setUser] = useState<UserType>();
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState(false);

    const notificationsState = useSelector((state: RootState) => state.notifications)
    
    useEffect(() => {
        getNotificationsData()
        getUser()
    }, [])

    useEffect(() => {
        notificationsState?.notifications?.map((notif, index) => {
            if (!notif.read) {
                setUnreadNotifications(true)
            }
        })
    }, [notificationsState])

    async function getNotificationsData() {
        await dispatch(fetchNotifications())
    }

    async function getUser() {
        const response = await fetch('/api/user');
        const data = await response.json();
        setUser(data)
    }

    return (
        <header className={"Header" + (hamburgerOpen ? " Header-hamburger--open" : "") + (notificationsOpen ? " Header-notifications--open" : "")}>
            <div className="Header-logo">
                <Link className="Link" to={RoutesList.dashboard.url}>
                    <img src={logoIcon} alt="Logo icon" width="30" height="30" />
                </Link>
            </div>
            <div className="Header-menu">
                <NavLink className="Link" to="/user/test">
                    <img src={userWhiteIcon} alt="user" width="21" height="21" />
                    <span className="Button-text">{user?.name}</span>
                </NavLink>
                <button className="Header-notifications Link" onClick={() => setNotificationsOpen(!notificationsOpen)}>
                    <div className={`Header-bell flex ${unreadNotifications ? 'Header-bell--unread' : 'Header-bell'}`}>
                        <img src={bellIcon} alt="bell icon" width="21" height="21" />
                    </div>
                    <span className="Button-text">Notifications</span>
                    {notificationsOpen && <HeaderNotifications />}
                </button>
                <a className="Link" href="/signout-callback-oidc">
                    <img src={logoutIcon} alt="logout" width="21" height="21" />
                    <span className="Button-text">Logout</span>
                </a>
                <button className="Header-hamburger Link" onClick={() => setHamburgerOpen(!hamburgerOpen)} >
                    <img src={menuIcon} alt="Menu icon" width="21" height="21" />
                </button>
            </div>
        </header>
    )
}