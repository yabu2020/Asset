import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaUserAlt, FaCommentAlt, FaEye } from "react-icons/fa";

function Sidebar({ children }) {
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
            path: "/resetpassword",
            name: "ResetPassword",
            icon: <FaCommentAlt />
        },
        {
            path: "/Viewasset",
            name: "View Asset",
            icon: <FaEye />
        },
    ];

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 bottom-0 bg-gray-800 text-white transition-all duration-500 ease-in-out ${isOpen ? 'w-56' : 'w-24'} flex flex-col z-20`}>
                <div className="flex items-center p-4 border-b border-gray-700">
                    <h1 className={`text-2xl ml-2 ${isOpen ? 'block' : 'hidden'} text-green-400`}>Admin Page</h1>
                    <div className={`ml-auto text-2xl cursor-pointer p-4 ${isOpen ? 'ml-16' : 'ml-0'} hover:bg-gray-700 rounded-full transition-colors duration-200`} onClick={toggle}>
                        <FaBars />
                    </div>
                </div>
                <div className="flex-grow overflow-y-auto">
                    {menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="flex items-center text-white text-lg py-2 px-4 hover:bg-sky-300 hover:text-black transition-all duration-300 ease-in-out">
                            <div className="text-2xl">{item.icon}</div>
                            <div className={`ml-4 ${isOpen ? 'block' : 'hidden'}`}>{item.name}</div>
                        </NavLink>
                    ))}
                </div>
            </div>
            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}

export default Sidebar;
