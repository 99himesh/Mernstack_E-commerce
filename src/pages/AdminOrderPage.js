import React from "react"
import Navbar from "../features/navbar.js/Navbar"
import AdminOrder from "../features/Admin/components/adminOrder"
export default function AdminOrderPage(){
    return(
        <>
        <Navbar>
             <AdminOrder/>
        </Navbar>
        
        </>
    )
}