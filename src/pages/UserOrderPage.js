
import  React from "react";
import UserOrder from "../features/user/component/userOrder";
import Navbar from "../features/navbar.js/Navbar";

export default function UserOrderPage(){
    return(
      <div>
        <Navbar>
          <h1 className="mx-auto text-xl ">My Orders</h1>
         <UserOrder></UserOrder>
         </Navbar>
      </div>
    )
} 