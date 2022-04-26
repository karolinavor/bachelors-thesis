import React from 'react'
import { Link, Outlet } from "react-router-dom"

import '../index.css'

function Navbar() {

    return (
        <nav>
            <Link to="/">Main Page</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/account">Account</Link>
        </nav>
    )
}

export default Navbar