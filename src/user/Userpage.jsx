import React from "react";
import { Link } from "react-router-dom";

function Userpage({ cUSer }) {
  return (
    <div>
      welcome User {cUSer.name}
      <p>
      <Link to="/">Sign Out</Link>
      </p>
    </div>
  );
}

export default Userpage;