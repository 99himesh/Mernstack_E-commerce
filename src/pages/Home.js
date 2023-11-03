
import React from "react"
import ProductList from "../features/productList/ProductList"
import Navbar from "../features/navbar.js/Navbar"
export default function Home(){
    return(
        <>
        <Navbar>
             <ProductList/>
        </Navbar>
        
        </>
    )
}