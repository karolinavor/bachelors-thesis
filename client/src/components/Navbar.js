import React from 'react'
import { NavLink, Outlet } from "react-router-dom"

import '../index.css'

function Navbar() {

    return (
        <nav>
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} >Main Page</NavLink>
            <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""} >Login</NavLink>
            <NavLink to="/register" className={({ isActive }) => isActive ? "active" : ""} >Register</NavLink>
            <NavLink to="/account" className={({ isActive }) => isActive ? "active" : ""} >Account</NavLink>
        </nav>
    )
}

export default Navbar