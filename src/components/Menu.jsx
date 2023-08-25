import { Menu, Button, Text } from '@mantine/core';
import { RiLogoutCircleRLine } from 'react-icons/ri'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoginFalse } from '../slices/UserSlice'
import { BsCartCheck } from 'react-icons/bs'
import { FaRegUserCircle } from 'react-icons/fa'
import { LuLayoutDashboard } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { removeAllWhenLogout } from '../actions/cartAction'
import { getAllProductsForAdmin } from '../actions/productAction'
import { getAllOrders } from '../actions/orderAction'
import { getAllUsers } from '../actions/userAction'


export const MenuB = () => {

    const { me } = useSelector((state) => state.user)

    
    const dispatch = useDispatch()

    const navigate = useNavigate();
    const logOut = () => {
        toast.success("Logout Successful !");
        localStorage.removeItem('token')
        dispatch(removeAllWhenLogout())
        dispatch(setIsLoginFalse())
        navigate('/')
    }




    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <div className='cursor-pointer'>
                    {me !== null ? <img src={me.avtar[0].url} alt="/images/avatar.png" className='h-8 w-8 rounded-full' /> :
                        <img src="/images/avatar.png" className='h-8 w-8 rounded-full' />
                    }
                </div>
            </Menu.Target>  

            

            <Menu.Dropdown>




                <Link to="/account"> <Menu.Item icon={<FaRegUserCircle />} > 
                    My account
                </Menu.Item></Link>
                {me && me.role === "admin" ? (
                    <Link onClick={()=>{
                        dispatch(getAllProductsForAdmin())
                        dispatch(getAllOrders())
                        dispatch(getAllUsers())
                    }} to="/dashboard">
                        <Menu.Item icon={<LuLayoutDashboard />}>Dashboard</Menu.Item>
                    </Link>
                ) : null}

                <Link to="/orders"> <Menu.Item icon={<BsCartCheck />} >My orders</Menu.Item> </Link>

                <Menu.Divider />

                <Menu.Item color="red " onClick={() => logOut()} icon={<RiLogoutCircleRLine />} className='font-semibold' >Log out</Menu.Item>

            </Menu.Dropdown>
        </Menu>
    );
}