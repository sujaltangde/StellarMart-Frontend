import React, { useState } from 'react'
import { LuLayoutDashboard } from 'react-icons/lu'
import { FaRegListAlt, FaRegComments } from 'react-icons/fa'
import { PiUsersThreeLight } from 'react-icons/pi'
import { HiTemplate } from 'react-icons/hi'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllProductsForAdmin } from '../actions/productAction'
import { getAllOrders } from '../actions/orderAction'
import { getAllUsers } from '../actions/userAction'



export const Sidebar = ({ sideTog }) => {

    const dispatch = useDispatch()

    const [togTree, setTogTree] = useState(false)

    return (
        <>
            <div className={` ${sideTog ? "flex" : "hidden"} flex-col z-10 fixed border-gray-400 min-h-screen px-12 bg-white shadow-xl shadow-gray-600`}>
                <div className='flex justify-center items-center py-6 pt-12 '>
                    <img src={"/favicon.png"} alt="" />
                    <span className='text-xl font-bold'>StellarMart</span>
                </div>
                <div className='flex flex-col gap-10'>
                    <div className="flex items-center gap-2">
                        <Link onClick={()=>{
                            dispatch(getAllProductsForAdmin())
                            dispatch(getAllOrders())
                            dispatch(getAllUsers())
                        }} to="/dashboard">  <div className='flex items-center gap-2 cursor-pointer'>
                            <LuLayoutDashboard />
                            <span className='text-lg font-medium'>Dashboard</span>
                        </div>
                        </Link>
                    </div>
                    <div className="flex gap-1 flex-col">
                        <div className=' items-center gap-2 flex '>
                            <div className='flex items-center  gap-2 cursor-pointer' onClick={() => setTogTree(!togTree)}>
                                {
                                    togTree ? <MdOutlineKeyboardArrowDown size={23} /> :
                                        <MdOutlineKeyboardArrowRight size={23} />
                                }
                                <span className='text-lg font-medium' >Products</span>
                            </div>


                        </div>
                        <div className={`px-8 pt-1 gap-3 flex-col ${togTree ? "flex" : "hidden"} `}>
                            <Link onClick={() => {
                                dispatch(getAllProductsForAdmin())
                            }} to="/admin/products">

                                <div className='flex items-center pt-1 gap-2'>
                                    <HiTemplate />
                                    <span className='font-medium'>All</span>
                                </div>
                            </Link>

                            <Link>
                                <div className='flex items-center gap-2'>
                                <Link to="/admin/newProduct">
                                <div className='flex items-center pt-1 gap-2'>
                                    <AiOutlinePlus />
                                    <span className='font-medium'>Create</span>
                                    </div>
                                    </Link>
                                </div>
                            </Link>

                        </div>


                    </div>
                    <div className="flex items-center gap-2">
                        <Link onClick={()=>{
                            dispatch(getAllOrders())
                        }} to="/admin/orders">
                        <div className='flex items-center gap-2 cursor-pointer'>
                            <FaRegListAlt />
                            <span className='text-lg font-medium'>Orders</span>
                        </div>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link to="/admin/users">
                        <div className='flex items-center gap-2 cursor-pointer'>
                            <PiUsersThreeLight size={20} />
                            <span className='text-lg font-medium'>Users</span>
                        </div>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link to="/admin/reviews">
                        <div className='flex items-center gap-2 cursor-pointer'>
                            <FaRegComments />
                            <span className='text-lg font-medium'>Reviews</span>
                        </div>
                        </Link>
                    </div>

                </div>
            </div>

        </>
    )
}
