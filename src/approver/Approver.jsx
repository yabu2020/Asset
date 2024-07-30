import React from "react";
import { Link } from "react-router-dom";

function Approver({ cUSer }) {
  return (
    <div>
      welcome AssetApprover {cUSer.name}
      <p>
      <Link to="/">Sign Out</Link>
      </p>
    </div>
  );
}

export default Approver;
