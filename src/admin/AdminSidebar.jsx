import React, { useState } from 'react';
import "./AdminSidebar.css";
import { NavLink } from 'react-router-dom';
import {
    FaBars,
    FaUserAlt,
    FaCommentAlt,
    FaEye
} from "react-icons/fa";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const menuItem = [
        {
            path: "/users",
            name: "List Of Users",
            icon: <FaUserAlt />
        },
        {
            path: "/adduser",
            name: "Create User",
            icon: <FaUserAlt />
        },
        {
            path: "resetpassword",
            name: "ResetPassword",
            icon: <FaCommentAlt />
        },
        {
            path: "Viewasset",
            name: "View Asset",
            icon: <FaEye />
        },
        {
            path: "/",
            name: "Sign Out",
           
        }
    ];

    return (
        <div className="container">
            <div style={{ width: isOpen ? "300px" : "100px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Admin Page</h1>
                    <div style={{ marginLeft: isOpen ? "70px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
        </div>
    );
}

export default Sidebar;
