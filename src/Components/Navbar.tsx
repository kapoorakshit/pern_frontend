import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';

function Navbar() {
    const [openLinks, setOpenLinks] = useState(false);
    const navigate = useNavigate();

    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
    };

    const Logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="navbar">
            <div className="leftSide">
                <span style={{ color: "white" }}>Task Management System</span>
            </div>
            <div className="rightSide">
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                    <button style={{ color: 'white', fontSize: "18px", marginLeft: "15px" }}>
                        Sign Up
                    </button>
                </Link>
                <button onClick={Logout} style={{ color: 'white', fontSize: "18px", marginLeft: "15px" }}>
                Login
                </button>
            </div>
        </div>
    );
}

export default Navbar;
