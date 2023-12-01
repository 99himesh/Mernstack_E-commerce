import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCartAsync, fetchItemByUserIdAsync, selectCart, updateCartAsync } from './cartSlice';

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link, Navigate } from 'react-router-dom';
import { selectUserInfo } from '../user/userSlice';

export default function Cart() {
  const [open, setOpen] = useState(true)
  const dispatch = useDispatch();
  const user=useSelector(selectUserInfo)
  const items=useSelector(selectCart)
  const totalAmount=items.reduce((amount,item)=>item.price*item.quantity+amount,0)
  const totalQuantity=items.reduce((total,item)=>item.quantity+total,0)
  const handleQuantity=(e,item)=>{
    dispatch(updateCartAsync({...item,quantity:+e.target.value}))

  }
  const handleDelete=(e,id)=>{
    dispatch(deleteCartAsync(id))
  }

  return (
    <div className='bg-gray-400 py-12'>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      <div className="mx-auto   max-w-5xl bg-white   mx-24 first-letter: py-6 sm:px-6 lg:px-8">
        <div className="flow-root">
          <h2 className="mt-10 text-start text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Cart
          </h2>
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            { items.length>0 && items.map((product) => (
              <li key={product.id} className="flex py-6">
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
                        Qty
                      </label>

                      <select className='ms-5' onChange={(e)=>handleQuantity(e,product)} value={product.quantity}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </p>
                    <div className="flex">
                      <button
                      onClick={(e)=>handleDelete(e,product.id)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between  my-2 text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalAmount}</p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Total items in cart</p>
            <p>{totalQuantity} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6">
            <Link
             to="/cheackOut"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
