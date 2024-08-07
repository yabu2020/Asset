import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../Login";
import Reset from "../Reset";
import Userpage from "../user/Userpage";
import Approver from "../approver/Approver";
// import ViewAssets from "../approver/ViewAssets";
import ApproverSidebar from "../approver/ApproverSidebar";
import AdminSidebar from "../admin/AdminSidebar";
import Viewasset from '../admin/Viewasset';
import Resetpassword from "../admin/Resetpassword";
import Createuser from '../admin/Createuser';
import UsersList from '../admin/UsersList';
import ClerkSidebar from '../clerk/ClerkSidebar'; 
import RegisterAsset from '../clerk/RegisterAsset'; 
import AssetToUser from '../clerk/AssetToUser';
import ListAssets from '../clerk/ListAssets'; // Import the new component
import TransferAsset from "../clerk/TransferAsset";
import Category from '../clerk/Category';
import Security from '../user/Security';
function App() {
  const [cUSer, setCuser] = useState({});
  const [users, setUsers] = useState([]);
  
  const renderSidebar = () => {
    if (cUSer.role === 'Admin') {
      return <AdminSidebar />;
    } else if (cUSer.role === 'Clerk') {
      return <ClerkSidebar />;
    }
    return null;
  };

  return (
    <BrowserRouter>
      {renderSidebar()}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Login setCuser={setCuser} />} />  
          <Route path="/reset-password" element={<Reset />} />
          <Route path="/admin/:userId" element={<AdminSidebar cUSer={cUSer} />} />
          <Route path="/users" element={<UsersList users={users} />} />
          <Route path="/adduser" element={<Createuser setUsers={setUsers} />} />
          <Route path="/resetpassword" element={<Resetpassword />} />
          {/* <Route path="/Viewasset" element={<Viewasset />} /> */}
          <Route path="/clerk/:userId" element={<ClerkSidebar />} />
          <Route path="/registerasset" element={<RegisterAsset />} />
          <Route path="/assettouser" element={<AssetToUser />} />
          <Route path="/transferasset" element={<TransferAsset />} />
          <Route path="/assets" element={<ListAssets />} /> 
          <Route path="/category" element={<Category />} />
          <Route path="/userpage/:userId" element={<Userpage />} />
          <Route path="/security-question/:userId" element={<Security />} />
          <Route path="/approver/:userId" element={<ApproverSidebar />} />
          <Route path="/approver" element={<Approver />} />
          {/* <Route path="/view-asset" element={<ViewAssets />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;