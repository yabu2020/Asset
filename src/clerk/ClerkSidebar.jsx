import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    FaBars,
    FaUserPlus,
    FaEdit,
    FaCommentAlt,
    FaExchangeAlt,
    FaEye
} from "react-icons/fa";
import "./ClerkSidebar.css"; // Import unique styles for Clerk Sidebar

function ClerkSidebar({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const menuItem = [
        {
            path: "/assets",
            name: "List Of Asset",
            icon: < FaCommentAlt />
        },
        {
            path: "/registerasset",
            name: "Register Asset",
            icon: <FaUserPlus />
        },
        {
            path: "/updateinfo/:id",
            name: "Update Information",
            icon: <FaEdit />
        },
        {
            path: "/transferasset",
            name: "Transfer Asset",
            icon: <FaExchangeAlt />
        },
        {
            path: "/viewasset",
            name: "View Asset",
            icon: <FaEye />
        },
        {
            path:"/",
            name:"SignOut",
           },
    ];

    return (
        <div className="container">
            <div style={{ width: isOpen ? "300px" : "100px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Property Clerk</h1>
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
            <main>{children}</main>
        </div>
    );
}

export default ClerkSidebar;
