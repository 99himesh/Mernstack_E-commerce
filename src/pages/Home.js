
import React from "react"
import Navbar from "../features/navbar.js/Navbar"
import ProductList from "../features/product/components/ProductList"
export default function Home(){
    return(
        <>
        <Navbar>
             <ProductList/>
        </Navbar>
        
        </>
    )
}