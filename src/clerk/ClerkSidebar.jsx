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



function ClerkSidebar({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const menuItem = [
        {
            path: "/assets",
            name: "List Of Asset",
            icon: <FaCommentAlt />
        },
        {
            path: "/registerasset",
            name: "Register Asset",
            icon: <FaUserPlus />
        },
        {
            path: "/assettouser",
            name: "Asset To User",
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
    ];

    return (
        <div className="flex h-screen">
            <div className={`fixed top-0 left-0 bottom-0 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white flex flex-col shadow-lg border-r border-gray-700`}>
                <div className="flex items-center p-4 border-b border-gray-700">
                    <h1 className={`${isOpen ? 'block' : 'hidden'} text-xl font-semibold ml-2 text-green-400`}>Property Clerk</h1>
                    <div className="ml-auto text-2xl cursor-pointer pr-4 hover:bg-gray-700 rounded-full p-1 transition-colors duration-200" onClick={toggle}>
                        <FaBars />
                    </div>
                </div>
                <div className="mt-2 flex flex-col flex-grow">
                    {
                        menuItem.map((item, index) => (
                            <NavLink
                                to={item.path}
                                key={index}
                                className="flex items-center text-white text-base py-3 px-6 hover:bg-gray-700 hover:text-green-400 transition-colors duration-200"
                                activeClassName="bg-gray-600 text-green-400"
                            >
                                <div className="text-xl">{item.icon}</div>
                                <div className={`${isOpen ? 'block' : 'hidden'} ml-4 font-medium`}>{item.name}</div>
                            </NavLink>
                        ))
                    }
                </div>
            </div>
            <main className={`flex-grow ml-${isOpen ? '64' : '20'} p-6 transition-all duration-300`}>
                {children}
            </main>
        </div>
    );
}

export default ClerkSidebar;
