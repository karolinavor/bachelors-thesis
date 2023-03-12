import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import home from "../assets/home.svg"
import user from "../assets/user.svg"
import settings from "../assets/settings.svg"
import logout from "../assets/logout.svg"

export default function Header(props) {

    const navigate = useNavigate();

    function logOutUser() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <header>
            <div>
                <NavLink className="Link" to="/"><img src={home} alt="home" width="32" height="32"/></NavLink>
            </div>
            <div className="flex align-center">
                {/*}
                {props.username
                    ?
                <>*/}
                <NavLink className="Link" to={"/user/root"}>
                    <img src={user} alt="user" width="28" height="28" />
                    xvorli01
                </NavLink>
                <NavLink className="Link" to="settings">
                    <img src={settings} alt="settings" width="28" height="28" />
                    Settings
                </NavLink>
                <button className="Link" onClick={() => logOutUser()} >
                    <img src={logout} alt="logout" width="28" height="28" />
                    Log out
                </button>
                {/*
                    </>
                    :
            <>*/}
                <NavLink className="Link" to="/login">
                    Log in
                </NavLink>
                <NavLink className="Link" to="/register">Register</NavLink>
                {/*</>
                }*/}
            </div>
        </header>
    )
}