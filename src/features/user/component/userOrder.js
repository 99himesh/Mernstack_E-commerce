import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchLoggedinUSerOrderAsync, selectUserOrder } from '../userSlice';
import { selectLoggedInUser } from '../../auth/authSlice';

export default function UserOrder() {
  const dispatch = useDispatch();
  const user=useSelector(selectLoggedInUser)
  const orders=useSelector(selectUserOrder)
  useEffect(()=>{
    dispatch(fetchLoggedinUSerOrderAsync(user?.id))
  },[dispatch])
 

  return (
  <div>
    {orders.length===0 && <p>Order Not Found</p>}
    {orders?.map((order)=>{
      return(
        <>
        <div >
          <div>

          <div className="mx-auto   max-w-5xl bg-white   mx-24 first-letter: py-6 sm:px-6 lg:px-8">
        <div className="flow-root">
          <h2 className="mt-5 text-start text-2xl font-bold leading-9 tracking-tight text-gray-900">
           Order Number #{order.id}
          </h2>
          <h5 className="mt-5 text-start text-2xl font-bold leading-9 tracking-tight text-gray-900">
           Order Status #{order.status}
          </h5>
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            { order.items?.map((product) => (
              <li key={product?.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a >{product.title}</a>
                      </h3>
                      <p className="ml-4">${product.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">
                      <label htmlFor="quantity" className="inline text-sm font-medium leading-6 text-gray-900">
                        Qty:{product.quantity}
                      </label>

                  
                    </p>
                    
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between  my-2 text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${order.totalAmount}</p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Total items in cart</p>
            <p>{order.totalQuantity} items</p>
          </div>
    
        
        </div>
      </div>
          </div>
        </div>
          

        <ul role="list" className="divide-y divide-gray-100 ">
        <li  className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 ">
          <div className="flex min-w-0 gap-x-4 ">
             
         
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{order.selectedAddress.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.street}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.city}</p>

            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">Phone {order.selectedAddress.phone}</p>
            <p className="text-sm leading-6 text-gray-900">{order.selectedAddress.state}</p>
          </div>
        </li>
    </ul>
          
          
        </>
      )
    })}

    
  </div>
  );
}
