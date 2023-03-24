import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import homeIcon from "../assets/home.svg"
import userIcon from "../assets/user.svg"
import settingsIcon from "../assets/settings.svg"
import logoutIcon from "../assets/logout.svg"
import { RoutesList } from "../router/Router";

export default function Header(props) {

    const navigate = useNavigate();

    const [user, setUser] = useState<string | null>(null)

    function logOutUser() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <header>
            <div>
                <NavLink className="Link" to={RoutesList.dashboard.url}>
                    <img src={homeIcon} alt="home" width="32" height="32" />
                </NavLink>
            </div>
            <div className="flex align-center">
                {user ?
                    <>
                        <NavLink className="Link" to={RoutesList.profile.url}>
                            <img src={userIcon} alt="user" width="28" height="28" />
                            {user}
                        </NavLink>
                        <NavLink className="Link" to={RoutesList.settings.url}>
                            <img src={settingsIcon} alt="settings" width="28" height="28" />
                            Settings
                        </NavLink>
                        <button className="Link" onClick={() => logOutUser()} >
                            <img src={logoutIcon} alt="logout" width="28" height="28" />
                            Logout
                        </button>
                    </>
                    :
                    <NavLink className="Link" to={RoutesList.login.url}>
                        Login
                    </NavLink>
                }
            </div>
        </header>
    )
}