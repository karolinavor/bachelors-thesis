import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import homeIcon from "../assets/home.svg"
import userIcon from "../assets/user.svg"
import settingsIcon from "../assets/settings.svg"
import logoutIcon from "../assets/logout.svg"
import menuIcon from "../assets/menu.svg"
import { RoutesList } from "../router/Router";
import { UserType } from "../types/types";

export default function Header(props) {

    const navigate = useNavigate();
    const [user, setUser] = useState<UserType>();

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
        <header className="Header">
            <div>
                <NavLink className="Link" to={RoutesList.dashboard.url}>
                    <img src={homeIcon} alt="home" width="32" height="32" />
                </NavLink>
            </div>
            <div className="Header-menu flex align-center">
                <NavLink className="Link" to="/user/test">
                    <img src={userIcon} alt="user" width="28" height="28" />
                    <span className="Button-text">{user?.name}</span>
                </NavLink>
                <NavLink className="Link" to={RoutesList.settings.url}>
                    <img src={settingsIcon} alt="settings" width="28" height="28" />
                    <span className="Button-text">Settings</span>
                </NavLink>
                <button className="Link" onClick={() => logOutUser()} >
                    <img src={logoutIcon} alt="logout" width="28" height="28" />
                    <span className="Button-text">Logout</span>
                </button>
                <button className="Link Header-hamburger" onClick={() => {}} >
                    <img src={menuIcon} alt="logout" width="28" height="28" />
                </button>
            </div>
        </header>
    )
}