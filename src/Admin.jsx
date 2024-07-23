import React from "react";
import axios from "axios";

function Admin() {
  const [role, setRole] = React.useState("");
  const [name, setName] = React.useState("");
  const [users, setUser] = React.useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/adduser", {
        role,
        name,
      })
      .then((result) => {
        console.log(result);
        setUser([...users, result]);
        navigate("/login");
      })

      .catch((err) => console.log(err));
    setName("");
  };
  console.log(users, "role");

  return (
    <div>
      <h1>welcom admin</h1>

      <form onSubmit={handleSubmit}>
        <p>create user</p>
        <input
          type="text"
          placeholder="Enter name"
          autoComplete="off"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <select onChange={(e) => setRole(e.target.value)}>
          <option value="user">user</option>
          <option value="Admin">Admin</option>
          <option value="Clerk">Clerk</option>
        </select>
        <button type="submit">addUser</button>
      </form>
      {users.map((user) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
          className="flex"
        >
          <p>{user.data.name}</p>
          <p>{user.data.role}</p>
          <p>edit </p>
          <p>reste </p>
        </div>
      ))}
    </div>
  );
}

export default Admin;
