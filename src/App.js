import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from './pages/CartPage';
import CheackOut from './pages/cheackOut';
import ProductDetailsPage from './pages/productDetailPage';
import Protected from './features/auth/component/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemByUserIdAsync, selectCart } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected> <Home></Home> </Protected>
  },
  {
    path: "/login",
    element:<LoginPage></LoginPage>
  },
  {
    path: "/signup",
    element:<SignupPage></SignupPage>
  },
  {
    path: "/cart",
    element:<Protected><CartPage></CartPage></Protected>
  },
  {
    path: "/cheackOut",
     element:<Protected><CheackOut></CheackOut></Protected>
  },
  {
    path: "/product-details/:id",
     element:<Protected><ProductDetailsPage></ProductDetailsPage></Protected>
  }
  
]);

function App() {
  const user=useSelector(selectLoggedInUser)
  const item=useSelector(selectCart)
  const dispatch=useDispatch();
 console.log(user);
  useEffect(()=>{
    if(user){
    dispatch(fetchItemByUserIdAsync(user.id)) 
    }
    console.log("success");

  },[dispatch,item.length,user])
  return (
    <div className="App">
    
    <RouterProvider router={router} />
      
    </div>
  );
}

export default App;
