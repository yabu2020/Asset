import React from "react";
import { Link } from "react-router-dom";

function Home({ cUSer }) {
  return (
    <div>
      welcome {cUSer.name}
      <Link to="/login">Sign Out</Link>
    </div>
  );
}

export default Home;
