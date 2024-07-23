import React from "react";
import { Link } from "react-router-dom";

function Home({ cUSer }) {
  return (
    <div>
     <h1>welcome ,{cUSer.name}!</h1> 
      <Link to="/Login">Sign Out</Link>
    </div>
  );
}

export default Home;
