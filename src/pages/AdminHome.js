
import React from "react"
import Navbar from "../features/navbar.js/Navbar"
import AdminProductList from "../features/Admin/components/AdminProductList"
export default function AdminHome(){
    return(
        <>
        <Navbar>
             <AdminProductList/>
        </Navbar>
        
        </>
    )
}