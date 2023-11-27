import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { deleteCartAsync, selectCart, updateCartAsync } from '../features/cart/cartSlice';
import { selectLoggedInUser, updateUserAsync } from '../features/auth/authSlice';
import { useForm } from "react-hook-form"
import { createOrderAsync, selectCurrentOrder } from "../features/order/orderSlice";






export default function CheackOut(){  
  const [open, setOpen] = useState(true)
  const {register,handleSubmit,reset,watch,formState: { errors } } = useForm()


  const handleDelete=(e,id)=>{
    dispatch(deleteCartAsync(id))
  }
  const handleQuantity=(e,item)=>{
    dispatch(updateCartAsync({...item,quantity:+e.target.value}))

  }
  const dispatch = useDispatch();
  const user=useSelector(selectLoggedInUser)
  const items=useSelector(selectCart)
  const totalAmount=items.reduce((amount,item)=>item.price*item.quantity+amount,0)
  const totalQuantity=items.reduce((total,item)=>item.quantity+total,0)
  const [selectedAddress,setSelectedAdress]=useState(null);
  const [paymentMethod,setPaymentMethod]=useState("cash")
  const currentOrder=useSelector(selectCurrentOrder)
  const handleaddress=(e)=>{
    setSelectedAdress(user.addresses[e.target.value])     
  }

  const handlePayment=(e)=>{
    setPaymentMethod(e.target.value)
  }
  
  const handleOrder=()=>{
    console.log(selectedAddress,paymentMethod);
    if(selectedAddress && paymentMethod) {
      const order={items,totalAmount,totalQuantity,user,paymentMethod,selectedAddress,status:"pending"}
      dispatch(createOrderAsync(order))
      
    }else{
      alert("select address and payment method")
    }
   
  }
 
    return(
        <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`}></Navigate>}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 bg-gray-500 mt-5 py-5">
         <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            <div className="lg:col-span-3 bg-white px-5 py-5">
            <form noValidate className="space-y-6" onSubmit={handleSubmit((data)=>{
                               console.log(data);
                               dispatch(updateUserAsync({...user,addresses:[...user.addresses,data]}))
                               reset()
                               })}>
        <div className="space-y-12 text-start">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Full name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  {...register("name",{required: "full name is required"})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email",{ required: "email is required" })}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  {...register("phone",{ required: "phone is required" })}
                  type="tel"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  {...register("country",{ required: "country is required" })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("street",{ required: "street is required" })}
                  id="street"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("city",{ required: "city is required" })}
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("state",{ required: "state is required" })}
                  id="region"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("pincode",{ required: "pincode is required" })}
                  id="pincode"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">

        <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Reset 
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add address
        </button>
      </div>



          <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Choose from Existing address</p>
          

          <ul role="list" className="divide-y divide-gray-100 ">
      {user.addresses.map((address,index) => (
        <li key={index} className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 ">
          <div className="flex min-w-0 gap-x-4 ">
                  <input
                    onChange={handleaddress}
                    value={index}
                    id="address"
                    name="address"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
         
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.city}</p>

            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">Phone {address.phone}</p>
            <p className="text-sm leading-6 text-gray-900">{address.state}</p>
          </div>
        </li>
      ))}
    </ul>
          <div className="mt-10 space-y-10">
          
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900"> Payment method</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="cash"
                    value="cash"
                    name="payments"
                    onChange={handlePayment}
                    checked={paymentMethod==="cash"}
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                    cash
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="card"
                    value="card"
                    name="payments"
                    onChange={handlePayment}
                    checked={paymentMethod==="card"}
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                   card payments
                  </label>
                </div>
            
              </div>
            </fieldset>
          </div>
        </div>
      </div>

    
    </form>
    </div>
    <div className="lg:col-span-2">
        {/* //cart */}
        <div className="mx-auto   max-w-5xl bg-white    first-letter: py-6 sm:px-6 lg:px-8">
        <div className="flow-root">
          <h2 className="mt-10 text-start text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Cart
          </h2>
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {items && items.map((product) => (
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
            <div
              onClick={handleOrder}
              className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Order now
            </div>
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
    </div>
    </div>
  
        
        </>
    )
}