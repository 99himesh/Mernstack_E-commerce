import { useDispatch, useSelector } from "react-redux"
import { selectUserInfo, updateUserAsync } from "../userSlice";
export default function UserProfile() {
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo)
   
    const handleRemove=(e,index)=>{
        const newUser={...user,addresses:[...user.addresses]}
        newUser.addresses.splice(index,1)
        dispatch(updateUserAsync(newUser))
        
    }
    return (
        <>
            <div >
                <div>
                    <h5 className="mt-5 text-start text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Name :{user.addresses.name}
                    </h5>
                    <h5 className="mt-5 text-start text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Email Address :{user.email}
                    </h5>

                </div>
                <p className="text-start pt-5">Your Adddressess:</p>
            </div>
            {user.addresses.map((address,index) => {
                return (
                    <>
                        <div className="mx-auto   max-w-5xl bg-white first-letter: py-6 sm:px-6 lg:px-8">

                            <ul role="list" className="divide-y divide-gray-100 ">
                                <li className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 ">
                                    <div className="flex min-w-0 gap-x-4 ">
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.city}</p>
                                        </div>
                                    </div>
                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                       <button
                                            onClick={(e) => handleRemove(e.index    )}
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </>
                )
            })}


        </>





    )
}