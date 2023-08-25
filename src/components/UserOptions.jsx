
import {RiLogoutCircleRLine} from 'react-icons/ri'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoginFalse } from '../slices/UserSlice'
import {BsCartCheck} from 'react-icons/bs'
import {FaRegUserCircle} from 'react-icons/fa'
import {LuLayoutDashboard} from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { removeAllWhenLogout } from '../actions/cartAction'

export const UserOptions = () => {

    const {me} = useSelector((state) => state.user)

    const [menu, setMenu] = useState(false) ;
    const dispatch = useDispatch()

    const navigate = useNavigate() ;
    const logOut = () => {
        toast.success("Logout Successful !");
        localStorage.removeItem('token')
        dispatch(removeAllWhenLogout())
        dispatch(setIsLoginFalse())
        navigate('/')
   }

   



    return (
        <>

            <div className='flex flex-col justify-start items-start  '>

                        <div onClick={()=>setMenu(!menu)} className='cursor-pointer  '>
                        {me !== null ?   <img src={me.avtar[0].url} alt="/images/avatar.png" className='h-8 w-8 rounded-full'  /> : 
                        <img src="/images/avatar.png" className='h-8 w-8 rounded-full'  /> 
                        }                        
                        <div>
                            {menu? <>
                                <div className='absolute z-20  flex md:flex-col flex-row justify-center rounded-xl rounded-t-none items-center  pt-2  md:right-12 right-2  text-gray-700 gap-5 mt-3 '>
                                
                                {/*  Dashboard   */}
                               { me.role === "admin" ?
                                <Link to="/dashboard" className='bg-white border hover:bg-gray-300 p-2 rounded-full shadow-md shadow-gray-700 '><LuLayoutDashboard className=' cursor-pointer  ' size={28} /> </Link> : null }                               

                                {/*  Orders   */}
                                <Link to="/orders" className='bg-white border hover:bg-gray-300 p-2 rounded-full shadow-md shadow-gray-700 '><BsCartCheck  className='cursor-pointer ' size={28} /></Link>

                                {/*  Profile   */}
                                <Link to="/account" className='bg-white border hover:bg-gray-300 p-2 rounded-full shadow-md shadow-gray-700 '><FaRegUserCircle className=' cursor-pointer ' size={28}  /></Link>

                                {/*  Logout   */}
                                <div onClick={()=>logOut()}  className='bg-white border hover:bg-gray-300 p-2 rounded-full shadow-md shadow-gray-700 '><RiLogoutCircleRLine  className=' cursor-pointer   ' size={28} /></div>
                                
                                

                                </div>
                            </> : null}
                        </div>
                        </div>

                
            </div>

        </>
    )
}
