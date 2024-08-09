// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { FaBars, FaUserAlt, FaCommentAlt, FaEye } from "react-icons/fa";

// function Sidebar({ children }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const toggle = () => setIsOpen(!isOpen);

//     const menuItem = [
//         {
//             path: "/users",
//             name: "List Of Users",
//             icon: <FaUserAlt />
//         },
//         {
//             path: "/adduser",
//             name: "Create User",
//             icon: <FaUserAlt />
//         },
//         {
//             path: "/resetpassword",
//             name: "ResetPassword",
//             icon: <FaCommentAlt />
//         },
//         {
//             path: "/Viewasset",
//             name: "View Asset",
//             icon: <FaEye />
//         },
//         {
//             path: "/",
//             name: "Sign Out",
//         },
//     ];

//     return (
//         <div className="flex">
//             {/* Sidebar */}
//             <div className={`fixed top-0 left-0 bottom-0 bg-gray-800 text-white transition-all duration-500 ease-in-out ${isOpen ? 'w-56' : 'w-24'} flex flex-col z-20`}>
//                 <div className="flex items-center p-4 border-b border-gray-700">
//                     <h1 className={`text-2xl ml-2 ${isOpen ? 'block' : 'hidden'} text-green-400`}>Admin Page</h1>
//                     <div className={`ml-auto text-2xl cursor-pointer p-4 ${isOpen ? 'ml-16' : 'ml-0'} hover:bg-gray-700 rounded-full transition-colors duration-200`} onClick={toggle}>
//                         <FaBars />
//                     </div>
//                 </div>
//                 <div className="flex-grow overflow-y-auto">
//                     {menuItem.map((item, index) => (
//                         <NavLink to={item.path} key={index} className="flex items-center text-white text-lg py-2 px-4 hover:bg-sky-300 hover:text-black transition-all duration-300 ease-in-out">
//                             <div className="text-2xl">{item.icon}</div>
//                             <div className={`ml-4 ${isOpen ? 'block' : 'hidden'}`}>{item.name}</div>
//                         </NavLink>
//                     ))}
//                 </div>
//             </div>
//             {/* Main Content */}
//             <main className="flex-1">
//                 {children}
//             </main>
//         </div>
//     );
// }

// export default Sidebar;
// return (

//       <div className="flex h-screen">
//       <div className={`fixed top-0 left-0 bottom-0  bg-gray-300  transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} bg-green-3500 text-white flex flex-col shadow-lg border-r border-gray-700`}>
//       <div className="flex items-center p-4 ">
//       <h1 className={`${isOpen ? 'block' : 'hidden'} text-xl font-bold ml-2 text-green-400`}>Admin page</h1>
//       <div className="ml-auto text-2xl cursor-pointer pr-4 hover:bg-green-300 rounded-full p-1 transition-colors duration-200" onClick={toggle}>
//                         <FaBars />
//                     </div>
//           </div>
//           {menuItem.map((item, index) => (
//             <NavLink to={item.path} key={index} className="link flex items-center py-2 px-4 hover:bg-green-400 transition-colors">
//               <div className="icon text-xl mb-4 mr-2">{item.icon}</div>
//               <div className={`link_text mb-4 ml-2 text-white text-xl mr-2  ${isOpen ? 'block' : 'hidden'}`}>{item.name}</div>
//             </NavLink>
//           ))}
//         </div>
//         <main className="flex-1 p-4">{children}</main>
//       </div>
    
//   );
// }

// export default Sidebar;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useParams, Link , useLocation} from 'react-router-dom';
import { FaBars, FaUserAlt, FaCommentAlt, FaEye } from "react-icons/fa";

function Sidebar({ children }) {
    const [isOpen, setIsOpen] = useState(true); // Start with the sidebar open
    const { userId } = useParams();
    const toggle = () => setIsOpen(!isOpen);
    const [assignedAssets, setAssignedAssets] = useState([]);
    const [message, setMessage] = useState('');
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Initially set to true, assuming the user is authenticated


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
            name: "Reset Password",
            icon: <FaCommentAlt />
        },
        {
            path: "/",
            name: "Sign Out",
        },
    ];
    useEffect(() => {
        if (userId) {
          fetchAssignedAssets(userId);
        }
      }, [userId]);
    
      const fetchAssignedAssets = (userId) => {
        axios
          .get(`http://localhost:3001/assigned-assets/${userId}`)
          .then((response) => setAssignedAssets(response.data))
          .catch((error) => setMessage(`Error: ${error.message}`));
      };

    return (
        <>
        {isAuthenticated && location.pathname !== '/' && (
        <div className="flex ">
            <div className={`fixed top-0 left-0 bottom-0 bg-gray-300 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} text-white flex flex-col shadow-lg border-r border-gray-700`}>
                <div className="flex items-center p-4">
                    <h1 className={`${isOpen ? 'block' : 'hidden'} text-xl font-bold ml-2 text-green-400`}>Admin Page</h1>
                    <div className="ml-auto text-2xl cursor-pointer pr-4 hover:bg-green-300 rounded-full p-1 transition-colors duration-200" onClick={toggle}>
                        <FaBars />
                    </div>
                </div>
                <div className="flex-1">
                    {menuItem.map((item, index) => (
                        <NavLink
                            to={item.path}
                            key={index}
                            className="flex items-center py-2 px-4 hover:bg-green-400 transition-colors duration-200"
                            //activeClassName="bg-green-400" // Optional: highlight the active menu item
                        >
                            <div className="text-xl mb-4 mr-2">{item.icon}</div>
                            <div className={`text-white text-xl ml-2 ${isOpen ? 'block' : 'hidden'}`}>{item.name}</div>
                        </NavLink>
                    ))}
                </div>
            </div>
           
            {assignedAssets.length > 0 && (
    <main>
        {children}
        <div className="flex">
            <div className="p-6 mb-0 mt-2 ml-80 rounded shadow" style={{ maxWidth: '1000px', maxHeight: '800px' }}>
            <h2 className="text-3xl mt-4 font-bold text-gray-800 mb-6">Your Assigned Assets</h2>
            {message && <p className="text-red-600 text-lg mb-4">{message}</p>}

            <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-3 px-4 text-left text-gray-700">Asset Name</th>
                        <th className="py-3 px-4 text-left text-gray-700">Asset SerialNo</th>
                        <th className="py-3 px-4 text-left text-gray-700">Date Assigned</th>
                    </tr>
                </thead>
                <tbody>
                    {assignedAssets.map((assignment, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 text-gray-700">{assignment.asset?.name || 'N/A'}</td>
                            <td className="py-3 px-4 text-gray-700">{assignment.asset?.serialno || 'N/A'}</td>
                            <td className="py-3 px-4 text-gray-700">{new Date(assignment.dateAssigned).toLocaleDateString() || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
        </div>
    </main>
)}

     
    
    </div>
           )}
    </>
    
    );
}

export default Sidebar;



