import  React from "react";
import ProductDetails from "../features/product/components/ProductDetails";
import Navbar from "../features/navbar.js/Navbar";

export default function ProductDetailsPage(){
    return(
      <div>
        <Navbar>
         <ProductDetails/>
         </Navbar>
      </div>
    )
} 