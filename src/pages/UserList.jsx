import React, { useEffect, useState } from 'react'
import { MetaData } from '../components/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../components/Loader'
import { UsersAdminTable } from '../components/UsersAdminTable'
import { BiMenuAltLeft } from 'react-icons/bi'
import { Sidebar } from '../components/Sidebar'
import {getAllUsers} from '../actions/userAction'



export const UserList = () => {

    const dispatch = useDispatch()
    const { allUsers, loading } = useSelector(state => state.user)
    const [sideTog, setSideTog] = useState(false)

    useEffect(()=>{
        dispatch(getAllUsers()) ;
    },[])


    return (
        <>

            <MetaData title="All Users" />
            <div className='min-h-screen pt-14'>
                <span onClick={() => setSideTog(!sideTog)} className='cursor-pointer z-20 fixed '>
                    <BiMenuAltLeft size={44} />
                </span>
                <Sidebar sideTog={sideTog} />
                {
                    loading || allUsers.length === 0 ? <Loader /> :

                        <>
                            <div className='text-center py-4 text-2xl font-medium'>
                                <p>All Users</p>
                            </div>
                            <UsersAdminTable users={allUsers} />

                        </>

                }

            </div>



        </>
    )
}
