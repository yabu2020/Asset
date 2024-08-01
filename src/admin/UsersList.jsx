import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UsersList.css'; // Import your CSS for styling
import { Link } from "react-router-dom";

function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch user list on component mount
        axios.get("http://localhost:3001/users")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((err) => console.log("Error fetching users", err));
    }, []);

    return (
        <div className="users-list">
            <h2>Users</h2>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.email}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
}

export default UsersList;
