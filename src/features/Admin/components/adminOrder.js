import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrderAsync, selectOrders, updateOrderAsync } from "../../order/orderSlice"
import { ITEM_PER_PAGE } from "../../../app/constant";
import { useEffect, useState } from "react";
import Pagination from "../../../common/Pagination";

export default function AdminOrder(){
  const [page,setPage]=useState(1)
  const [editableID,setEditableId]=useState(-1)
  const dispatch=useDispatch();
  const orders=useSelector(selectOrders)

useEffect(()=>{
  const pagination={_page:page,_limit:ITEM_PER_PAGE}
  dispatch(fetchAllOrderAsync(pagination))
},[dispatch,page])



const handleShow=(e)=>{
  console.log("show");


}
const handleEdit=(e,order)=>{
  e.preventDefault()
  setEditableId(order.id)
  console.log(order);
}
const editHandler=(e,order)=>{
   console.log(e.target.value);
   const orders={...order,status:e.target.value}
   console.log(orders);
   dispatch(updateOrderAsync(orders))
   setEditableId(-1)
}
const handlePagination=(page)=>{
  setPage(page)
}


    return(
       <>
<>
  {/* component */}
  <div className="overflow-x-auto">
    <div className=" bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
      <div className="w-full lg:w-5/6">
        <div className="bg-white shadow-md rounded my-6">
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Order Number</th>
                <th className="py-3 px-6 text-left">Item</th>
                <th className="py-3 px-6 text-center">Total amount</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
     {orders.map((order)=>{
      return(

  <>
     <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">
                      <h6 x>{order.id}</h6>
                    </div>
                  </div>
                </td>
                
               {order.items.map(item=> <td className=" block py-3 px-6 text-left">
                  <div className=" flex  items-center">
                    <div className="mr-2">
                      <img
                        className="w-6 h-6 rounded-full"
                        src={item.thumbnail}
                      />
                    </div>
                    <span>{item.title}- {item.quantity}-{item.price}</span>
                  </div>
                </td>)}
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                  {order.totalAmount}
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                {order.id ===editableID ?(
                  <select onChange={(e)=>editHandler(e,order)}>
                  <option value="pending"> Pending</option>
                  <option value="dispatch">Dispatch</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                  </select>
                 ) :(
                  <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                  {order.status}
                </span>
                 )}
                  
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" onClick={(e)=>{handleShow(e)}}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" onClick={(e)=>{handleEdit(e,order)}}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </div>
                    
                  </div>
                </td>
              </tr>
    </>
  )

})             }
       
            </tbody>
          </table>
          <Pagination page={page} setPage={setPage} handlePagination={handlePagination} totalItem={11}></Pagination>

        </div>
      </div>
    </div>
  </div>
</>

</>

    )
}