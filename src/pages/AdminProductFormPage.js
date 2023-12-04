
import React from "react"
import Navbar from "../features/navbar.js/Navbar"
import AdminProductForm from "../features/Admin/components/adminProductForm"
export default function AdminProductFormPage(){
    return(
        <>
        <Navbar>
             <AdminProductForm/>
        </Navbar>
        
        </>
    )
}