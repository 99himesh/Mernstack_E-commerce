import  React from "react";
import ProductDetails from "../features/product/components/ProductDetails";
import Navbar from "../features/navbar.js/Navbar";
import AdminProductDetails from "../features/Admin/components/adminProductDetail.js";

export default function AdminProductDetailsPage(){
    return(
      <div>
        <Navbar>
         <AdminProductDetails></AdminProductDetails>
         </Navbar>
      </div>
    )
} 