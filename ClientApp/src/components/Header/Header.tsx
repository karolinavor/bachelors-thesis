import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import userWhiteIcon from "../../assets/user-white.svg"
import logoutIcon from "../../assets/logout.svg"
import menuIcon from "../../assets/menu.svg"
import bellIcon from "../../assets/bell.svg"
import logoIcon from "../../assets/logo.svg"
import { RoutesList } from "../../router/Router";
import HeaderNotifications from "./HeaderNotifications";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../../store/reducers/notificationsSlice";
import { AppDispatch, RootState } from "../../store/store";

export default function Header() {

    let dispatch: AppDispatch = useDispatch();
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState(false);

    const notificationsState = useSelector((state: RootState) => state.notifications)
    const userState = useSelector((state: RootState) => state.user)
    
    useEffect(() => {
        getNotificationsData()
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

    return (
        <header className={"Header" + (hamburgerOpen ? " Header-hamburger--open" : "") + (notificationsOpen ? " Header-notifications--open" : "")}>
            <div className="Header-logo">
                <Link className="Link" to={RoutesList.dashboard.url}>
                    <img src={logoIcon} alt="Logo icon" width="30" height="30" />
                </Link>
            </div>
            <div className="Header-menu">
                <NavLink className="Link" to="/profile">
                    <img src={userWhiteIcon} alt="user" width="21" height="21" />
                    <span className="Button-text">{userState?.username}</span>
                </NavLink>
                <button className="Header-notifications Link" onClick={() => setNotificationsOpen(!notificationsOpen)}>
                    <div className={`Header-bell flex ${unreadNotifications ? 'Header-bell--unread' : 'Header-bell'}`}>
                        <img src={bellIcon} alt="bell icon" width="21" height="21" />
                    </div>
                    <span className="Button-text">Notifications</span>
                    {notificationsOpen && <HeaderNotifications />}
                </button>
                <form method="POST" action="/api/logout">
                    <button className="Link" type="submit">
                        <img src={logoutIcon} alt="logout" width="21" height="21" />
                        <span className="Button-text">Logout</span>
                    </button>
                </form>
                <button className="Header-hamburger Link" onClick={() => setHamburgerOpen(!hamburgerOpen)} >
                    <img src={menuIcon} alt="Menu icon" width="21" height="21" />
                </button>
            </div>
        </header>
    )
}