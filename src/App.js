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
import PageNotFound from './pages/404';
import OrderSuccess from './pages/orderSuccessPAge';
import UserOrderPage from './pages/UserOrderPage.js';
import UserProfilePage from './pages/UserProfilePage.js';
import { fetchLoggedinUSerAsync } from './features/user/userSlice.js';
import Logout from './features/auth/component/logOut.js';
import ForgotPassword from './features/auth/component/forgotPassword.js';
import ProtectedAdmin from './features/auth/component/ProtectedAdmin.js';
import AdminHome from './pages/AdminHome.js';
import AdminProductDetailsPage from './pages/AdminPtoductDetailsPage.js';
import AdminProductFormPage from './pages/AdminProductFormPage.js';
import AdminOrderPage from './pages/AdminOrderPage.js';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected> <Home></Home> </Protected>
  },
  {
    path: "/admin",
    element: <ProtectedAdmin> <AdminHome></AdminHome> </ProtectedAdmin>
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
  },
  {
    path: "/admin/product-details",
     element:<ProtectedAdmin><AdminProductDetailsPage></AdminProductDetailsPage></ProtectedAdmin>
  },
  {
    path: "/admin/product-form",
     element:<ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>
  },
  {
    path: "/admin/orders",
     element:<ProtectedAdmin><AdminOrderPage></AdminOrderPage></ProtectedAdmin>
  },
  {
    path: "/admin/product-form/edit/:id",
     element:<ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>
  },
  {
    path: "/order-success/:id",
     element:<OrderSuccess></OrderSuccess>
  },
  {
    path: "/orders",
    element:<UserOrderPage></UserOrderPage>
  },
  {
    path: "/profile",
    element:<UserProfilePage></UserProfilePage>
  },
  {
    path: "/logOut",
    element:<Logout></Logout>
  },
  {
    path: "/forgotPassword",
    element:<ForgotPassword></ForgotPassword>
  },
  {
    path: "*",
    element:<PageNotFound></PageNotFound>
  },

  
]);

function App() {
  const user=useSelector(selectLoggedInUser)
  const item=useSelector(selectCart)
  const dispatch=useDispatch();
 console.log(user);
  useEffect(()=>{
    if(user){
    dispatch(fetchItemByUserIdAsync(user.id)) 
    dispatch(fetchLoggedinUSerAsync(user.id))
    }

  },[dispatch,item.length,user])
  return (
    <div className="App">
    
    <RouterProvider router={router} />
      
    </div>
  );
}

export default App;
