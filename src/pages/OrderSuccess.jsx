import React from 'react'
import {Link} from 'react-router-dom'
import {BsFillCheckCircleFill} from 'react-icons/bs'
import { MetaData } from '../components/MetaData'

export const OrderSuccess = () => {
  return (
    <>

            <div className='min-h-screen pt-14'>
                <MetaData title="Order Successful" />
                <div className='flex items-center md:px-0 px-4 flex-col pt-20 gap-3'>
                  <BsFillCheckCircleFill className="text-blue-700" size={86} />
                <p className='md:text-4xl text-2xl text-center '>Your <span className='text-green-700'>order</span> has been placed successfully</p>
                <Link to="/orders" className='hover:bg-gray-600 font-medium px-8 py-1 text-white bg-gray-700' >View Orders</Link>
                </div>
            </div>

    </>
  )
}
