
import  React from "react";
import Navbar from "../features/navbar.js/Navbar";
import UserProfile from "../features/user/component/userProfile";

export default function UserProfilePage(){
    return(
      <div>
        <Navbar>
          <h1 className="mx-auto text-xl  text-start mx-7">My Profile</h1>
         <UserProfile></UserProfile>
         </Navbar>
      </div>
    )
} 