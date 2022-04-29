import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";

import '../../index.css'

function Navbar(props) {

    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <nav>
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Homepage</NavLink>
            {props.username
                ?
                <>
                    <NavLink to={"/user/" + props.username} className={({ isActive }) => isActive ? "active" : ""} >{props.username}</NavLink>
                    <button onClick={logout}>Log Out</button>
                </>
                :
                <>
                    <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""} >Sign In</NavLink>
                    <NavLink to="/register" className={({ isActive }) => isActive ? "active" : ""} >Sign Up</NavLink>
                </>
            }
        </nav>
    )
}

export default Navbar