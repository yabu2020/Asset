import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./UsersList.css";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [userEditData, setUserEditData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((response) => setUsers(response.data))
      .catch((err) => console.log("Error fetching users", err));
  }, []);

  const handleEditClick = (user) => {
    setEditingUserId(user._id); // Make sure to use _id for MongoDB documents
    setUserEditData({ ...user });
  };

  const handleSaveClick = () => {
    axios
      .put(`http://localhost:3001/users/${editingUserId}`, userEditData)
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === editingUserId ? response.data : user
          )
        );
        setEditingUserId(null);
        setUserEditData({});
      })
      .catch((err) => console.log("Error updating user", err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserEditData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/users/${id}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        alert("User deleted successfully!");
      })
      .catch((err) => console.log("Error deleting user", err));
  };

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  List of Users
                </h3>
              </div>
              <div className="flex-grow self-end text-right">
                <Link to="/adduser">
                  <button className="bg-sky-500 w-28 h-11 justify-around hover:text-white items-center hover:bg-sky-700">
                    New User
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Id</th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Name</th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Role</th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Email</th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Department</th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">{user.id}</td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                      {editingUserId === user._id ? (
                        <input
                          type="text"
                          name="name"
                          value={userEditData.name || ''}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {editingUserId === user._id ? (
                        <input
                          type="text"
                          name="role"
                          value={userEditData.role || ''}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        user.role
                      )}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {editingUserId === user._id ? (
                        <input
                          type="text"
                          name="email"
                          value={userEditData.email || ''}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {editingUserId === user._id ? (
                        <input
                          type="text"
                          name="department"
                          value={userEditData.department || ''}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        user.department
                      )}
                    </td>
                    <td className="border-t-0 flex justify-around px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {editingUserId === user._id ? (
                        <button onClick={handleSaveClick} className="text-green-500 hover:text-green-700">
                          Save
                        </button>
                      ) : (
                        <FaEdit className="hover:text-blue-700 hover:cursor-pointer" onClick={() => handleEditClick(user)} />
                      )}
                      <FaTrash className="hover:text-red-500 hover:cursor-pointer" onClick={() => handleDelete(user._id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UsersList;
